import React, { Component , useState} from 'react';
import styles from '../../styles/Home.module.css'
import {Contract, ethers, Signer} from 'ethers'
import {decrypt, encrypt} from '@metamask/eth-sig-util'
import { isGeneratorFunction } from 'util/types';
import {poseidon} from "circomlibjs"
import { throws } from 'assert';



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
async function uploadEncryptedCredentialAndLeafToContract(encCredential: string, contract: Contract | undefined, leaf: string){
    if(contract){
        const tx = await contract.saveCredential(encCredential, leaf)
        const txReceip = await tx.wait()
        if(txReceip.status !== 1){
            alert('error while uploading credential')
            return
        }
    }
    
}

//convert ascii to hex
function ascii_to_hex(str: string)
  {
	var arr1 = ["0x"];
	for (var n = 0, l = str.length; n < l; n ++) 
     {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	 }
	return arr1.join('');
   }

//compute merkle leave from Credential
function computeLeave(credentialJSON:{"claims":{ [x: string]: string; }}, claimsArray: [string] | undefined){
    if(credentialJSON.claims.ethAddress){
        if(claimsArray){
            const ethAddress = credentialJSON.claims.ethAddress
            //claim values are type string, has to be converted to ascii bytes like(Address is not converted)
            let convertedArrayHex:string[]=[];

            for(let i in claimsArray){
                if(claimsArray[i] !== "ethAddress"){
                    convertedArrayHex.push(ascii_to_hex(credentialJSON.claims[claimsArray[i]]))
                } else {
                    convertedArrayHex.push(credentialJSON.claims[claimsArray[i]])
                }
            }
            
            //compute CredentialHash
            // @ts-ignore
            var hashDigest = poseidon([convertedArrayHex[0],convertedArrayHex[1]])
            if(claimsArray.length>2){
                for(let i=2 ; i<claimsArray.length; i++){
                   hashDigest = poseidon([hashDigest,convertedArrayHex[i]])
                }
            }
            //hash CredentialHash and ethAddress
            const leaf = poseidon([hashDigest,ethAddress])
            return leaf
        }
    } else {
        throw "ethAddress not found as atribute in credential JSON"
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
                            <h3>Check claims and set subject eth public key</h3> 
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
                                
                                //compute Merkle leave
                                const leaf = computeLeave(this.state.credentialJSON, this.state.claimsArray)
                                this.setState((state)=> ({step3flag: true}))

                                //Encrypted credential and leaf upload to contract
                                await uploadEncryptedCredentialAndLeafToContract(enc, this.props.credentialsDB, leaf)
                                

                                //CredentialIssued event catch
                                if(this.props.credentialsDB){
                                    this.props.credentialsDB.on("CredentialSavedInRegister",(credentialNo) => {
                                        if(credentialNo === (this.state.credentialsCounter + 1)){
                                            this.setState((state)=> ({step2flag: true}))
                                        }
                                    })
                                    this.props.credentialsDB.on("LeafInserted",(eventleaf,root) =>{
                                        if(eventleaf.toBigInt() === leaf){this.setState((state)=> ({step4flag: true}))}
                                    })                          
                                }

        
                                

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

