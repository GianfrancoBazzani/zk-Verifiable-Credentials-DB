import React, { Component , useState} from 'react';
import styles from '../../styles/Home.module.css'
import {Contract, ethers, Signer} from 'ethers'
import {decrypt, encrypt} from '@metamask/eth-sig-util'
import { isGeneratorFunction } from 'util/types';
import {poseidon} from "circomlibjs"
import { throws } from 'assert';
import {IncrementalMerkleTree} from "@zk-kit/incremental-merkle-tree"


/*functions to be transfered to user portal */
//download encypted data to contract. this function do not goes here, goes in subject portal
async function downloadEncryptedCredentialFromContract(index: number, contract: Contract | undefined){
    if(contract){
        const encCredential = await contract.viewArray(index)
        return encCredential
    }
    
}

//asymetric decrytion with MetaMask this function do not goes here, goes in subject portal
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

async function generateMerkleProof(contract: Contract | undefined, credentialNumber: number){ 
    /*Reproduce On Chain tree*/
    console.log("hola")
}

export default class UserProof extends Component <{
    credentialsDB: Contract | undefined,
    walletAddress: string

},{
    credentialNumber: number,
    claimsArray: [string] | undefined,
    credentialJSON:{"claims":{ [x: string]: string; }}
    disclosureVector: [number]
}
> {
    
  render() {
    return(
        <div className={styles.issuerContainer}>
            <h1>Proover portal</h1>
            <h2>Recover your credential</h2>
            <div className={styles.credNumberIn}> <p>Input your credential # </p> <input onChange={
                (event  : React.ChangeEvent<HTMLInputElement>) => {
                    const val = Number.parseInt(event.target.value)
                    this.setState((state) => ({credentialNumber : val}))
                }}/></div>
            <button onClick={async ()=>{
                const claimsArray = await readSchemaClaims(this.props.credentialsDB)
                const enc = await downloadEncryptedCredentialFromContract(this.state.credentialNumber - 1,this.props.credentialsDB)
                const credential = await decryptionWithMM(this.props.walletAddress, enc)
                const credentialJSON = JSON.parse(credential)
                // @ts-ignore
                const disclosureVector =  claimsArray.map(x => 0)
            
                this.setState((state) => ({claimsArray : claimsArray, credentialJSON : credentialJSON, disclosureVector:disclosureVector}))
                }}>Recover</button>

            
            {this.state && (this.state.credentialJSON && this.state.claimsArray)?
            <div className={styles.issuerContainer}>
                <h3>Recovered credential</h3>
                <ul>{
                    this.state.claimsArray.map((claimNames)=> {
                        return(
                            <li key={claimNames}>{claimNames} = {this.state.credentialJSON.claims[claimNames]}</li>
                            )
                        })}
                    </ul>
                <h3>Selective disclosure selection</h3>
                    {this.state.claimsArray.map((claimNames, index) => {
                        return(
                            <div className={styles.credNumberIn}>
                                <p>{claimNames}</p> <input type = "checkbox" onChange={(event  : React.ChangeEvent<HTMLInputElement>)=>{
                                   let newDisclosureVector = this.state.disclosureVector
                                   newDisclosureVector[index] = event.target.checked? 1:0
                                   this.setState((state) => ({disclosureVector: newDisclosureVector}))    
                                }}/>
                            </div>
                        )
                    })}
                <button onClick={()=>{
                    /*Proof generation */
                    const merkleProof = generateMerkleProof(this.props.credentialsDB, this.state.credentialNumber)
                    
            
                }}>Generate proof</button>
                
            </div>:<div></div>}
        </div> 
    )
  }

}
