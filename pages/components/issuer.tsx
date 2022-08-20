import React, { Component , useState} from 'react';
import styles from '../../styles/Home.module.css'
import {Contract, ethers, Signer} from 'ethers'
import {decrypt, encrypt} from '@metamask/eth-sig-util'
import { isGeneratorFunction } from 'util/types';



//Read credentials counter
async function readCredentialsCounter(contract: Contract | undefined){
    if(contract){
        //get claims array from schema
        const credentialsCounter = await contract.credentialsCounter()
        return credentialsCounter
    }
}


//read claims array from contract
async function readSchemaClaims(contract: Contract | undefined){
    if(contract){
        //get claims array from schema
        const readCredentialsSchema = await contract.credentialsSchema()
        const readCredentialsSchemaJSON = JSON.parse(readCredentialsSchema)
        const claimsArray = readCredentialsSchemaJSON.schema_json.claims
        
        return claimsArray
    }
}

//get public key from MetaMask. this function do not goes here, goes in subject portal
async function getPubKeyFromMM(walletAddress: string){
    if(window.ethereum){
    const keyB64 = await window.ethereum.request!({
        method: 'eth_getEncryptionPublicKey',
        params: [walletAddress]
    }) as string;
    //if you want base 64 encoded
    return keyB64
    //if you want the decoded form bytes32 like
    //return ethers.utils.base64.decode(keyB64)
    }
}

//asymetric encrytion with MetaMask
function encryptWithMM(publicKey: string, credential: {"claims":{ [x: string]: string; }}) : string{
    const enc = encrypt({
        publicKey: publicKey,
        data: JSON.stringify(credential),
        version: 'x25519-xsalsa20-poly1305' 
    })

    return JSON.stringify(enc)
}

//upload encypted data to contract.
async function uploadEncryptedCredentialToContract(encCredential: string, contract: Contract | undefined){
    if(contract){
        const tx = await contract.saveCredential(encCredential)
        const txReceip = await tx.wait()
        if(txReceip.status !== 1){
            alert('error while uploading encrypted credential')
            return
        }
    }
    
}

//upload encypted data to contract.
async function downloadEncryptedCredentialFromContract(index: number, contract: Contract | undefined){
    if(contract){
        const encCredential = await contract.saveCredential(index)
        return encCredential
    }
    
}

//download data array from contract.  this function do not goes here, goes in subject portal

//find credential in array. this function do not goes here, goes in subject portal

//asymetric decrytion with MetaMask
async function decryptionWithMM(walletAddress: string, encCredential: string){
    if(window.ethereum){
        const dataHexLike = `0x${Buffer.from(encCredential,'utf-8').toString('hex')}`

        const decrypt = await window.ethereum.request!({
            method: 'eth_decrypt',
            params: [dataHexLike, walletAddress]
        });
        return decrypt
    }
}


export default class Issuer extends Component <{
    credentialsDB: Contract | undefined,
    walletAddress: string
},{
    claimsArray: [string] | undefined,
    credentialJSON:{"claims":{ [x: string]: string; }},
    credentialsCounter: number,
    enIssueModal: boolean,
    subjectEthPubKey: string,
    issuancePocInit: boolean,
    step1flag: boolean,
    step2flag: boolean,
    step3flag: boolean,
    step4flag: boolean,

}
> {
    
  render() {
    return(
        <div className={styles.issuerContainer}>
            <h1>Issuer Portal</h1>
            {/*ISSUER FORM*/}            
            {((this.state === null) || (this.state.claimsArray === undefined))? 
            <button onClick={async ()=>{
                /*READ CREDENTIALS SCHEMA FROM CONTRACT*/
                const claimsArray = await readSchemaClaims(this.props.credentialsDB)
                this.setState((state) => ({claimsArray: claimsArray}))
                const credentialsCounter = await readCredentialsCounter(this.props.credentialsDB)
                this.setState((state) => ({credentialsCounter: credentialsCounter}))
                }}>Read contract credential schema
            </button>:
            <div className={styles.issuerFormContainer}>
                <h3>Number of credentials isued:{this.state.credentialsCounter}</h3>
                <form className={styles.issuerForm} onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    /* ON FORM SUBMIT */
                    event.preventDefault();
                    this.setState((state) => ({enIssueModal: true}))
                }}>{
                        this.state.claimsArray.map((val, i )=>{
                            return(
                                <label  key={val} className={styles.formLabel}>
                                    <div>{val}:</div>
                                    <input name={val} onChange={
                                        (event  : React.ChangeEvent<HTMLInputElement>) => {
                                            /*ON FORM INPUT CHANGE*/
                                            const name = event.target.name
                                            const value = event.target.value
                                            if(this.state.credentialJSON === undefined){
                                               const newCredentialJSON = {claims: {[name]: value}}
                                               this.setState((state) => ({credentialJSON: newCredentialJSON}))
                                            } else {
                                                const newCredentialJSON = this.state.credentialJSON
                                                newCredentialJSON.claims[name]=value
                                                this.setState((state) => ({credentialJSON: newCredentialJSON}))
                                            }                      
                                        }
                                    }/>
                                </label>
                            )
                        })}
                        <button type="submit">Issue </button>        
                </form>

                {/*ISSUE SUBMISSION POP UP*/}
                {this.state.enIssueModal?
                    <div className={styles.modalBackground}>
                        <div className={styles.modalContainer}>
                            <h3>Check claims and set subject eth address</h3> 
                            <h4>Credential claims list</h4> 
                            {this.state.credentialJSON?<ul>{
                                this.state.claimsArray.map((claimNames)=> {
                                    return(
                                    <li key={claimNames}>{claimNames} = {this.state.credentialJSON.claims[claimNames]}</li>
                                    )
                                })}
                            </ul>:<div></div>}
        
                            <input placeholder='Enter subject ethereum public key, not address' onChange={
                                            (event  : React.ChangeEvent<HTMLInputElement>) => { 
                                            this.setState((state) => ({subjectEthPubKey: event.target.value}))
                                            }
                                        }/>
                            <button onClick={async ()=> {
                                {/*Credential issuance process*/}
                                this.setState((state)=> ({issuancePocInit: true}))
                                //credential encryption
                                const enc = encryptWithMM(this.state.subjectEthPubKey,this.state.credentialJSON)
                                this.setState((state)=> ({step1flag: true}))
                                
                                //credential upload
                                await uploadEncryptedCredentialToContract(enc, this.props.credentialsDB)
                                

                                //CredentialIssued event catch
                                if(this.props.credentialsDB){
                                this.props.credentialsDB.on("CredentialIssued",(credentialNo) => {
                                    console.log(`credential #${credentialNo} emited`)
                                    this.setState((state)=> ({step2flag: true})) 
                                })}

                                //
     
                                
                                
                                }}>Confirm credential issuance</button>
                        </div>
                        {this.state.issuancePocInit?<div>
                            <div className={styles.issueStep}>
                            <p>Encrypting credential with subject public key</p>
                            {this.state.step1flag?<p className={styles.check}>✅</p>:<div className={styles.loadingSpinner}></div>}
                            </div>
                            <div className={styles.issueStep}>
                            <p>Uploading encripted credential to smart contract</p>
                            {this.state.step2flag?<p className={styles.check}>✅</p>:<div className={styles.loadingSpinner}></div>}
                            </div>
                            <div className={styles.issueStep}>
                            <p>Computing Credentials Merkle Tree Leave</p>
                            {this.state.step3flag?<p className={styles.check}>✅</p>:<div className={styles.loadingSpinner}></div>}
                            </div>
                            <div className={styles.issueStep}>
                            <p>Uploading leave to smart contract and computing merkle root</p>
                            {this.state.step4flag?<p className={styles.check}>✅</p>:<div className={styles.loadingSpinner}></div>}
                            </div>
                        </div>:<div></div>}
                </div>:<div></div>}
            </div>}   

        </div> 
    )
  }

}

