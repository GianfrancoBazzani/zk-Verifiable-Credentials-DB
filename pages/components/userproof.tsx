import React, { Component , useState} from 'react';
import styles from '../../styles/Home.module.css'
import {Contract, ethers, Signer} from 'ethers'
import {decrypt, encrypt} from '@metamask/eth-sig-util'
import { isGeneratorFunction } from 'util/types';
import {poseidon} from "circomlibjs"
import { throws } from 'assert';
import {IncrementalMerkleTree} from "@zk-kit/incremental-merkle-tree"
import { copyFile } from 'fs/promises'
const groth16 = require("snarkjs").groth16;



/*functions to be transfered to user portal */
//download encypted data to contract. this function do not goes here, goes in subject portal
async function downloadEncryptedCredentialFromContract(index: number, contract: Contract | undefined){
    if(contract){
        const encCredential = await contract.viewArray(index)
        return encCredential
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
    /*Reproduce Merkle Tree that is in the contract and generatig the proof*/
    if(contract){
    const depth = await contract.TREE_DEPTH()
    const leavesArray = await contract.getLeavesArray()
    
    const tree = new IncrementalMerkleTree(poseidon , depth, BigInt(0), 2)
    leavesArray.forEach((element: ethers.BigNumber) => {
        tree.insert(element.toBigInt())      
    });

    const proof = tree.createProof(credentialNumber-1)

    return proof
    }
}
    /*
    signal input ClaimsVals[claimsN];
    signal input MerkleProofSiblings[depth];
    signal input MerkleProofPathIndices[depth];
    signal input MerkleProofRoot;
    signal input EthAddress;
    signal input DisclosureVector[claimsN];
    */
    async function generateZKProof(credentialJSON:{"claims":{ [x: string]: string; }}, claimsArray: [string] | undefined, merkleProof: any, disclosureVector: [number]){

        const ethAddress = credentialJSON.claims.ethAddress
        //claim values are type string, has to be converted to ascii bytes like(Address is not converted)
        let convertedArrayHex:string[]=[];
        if(claimsArray){
            for(let i in claimsArray){
                if(claimsArray[i] !== "ethAddress"){
                    convertedArrayHex.push(ascii_to_hex(credentialJSON.claims[claimsArray[i]]))
                } else {
                    convertedArrayHex.push(credentialJSON.claims[claimsArray[i]])
                }
            }
        }
        //convertig sobligs form [BigInt] to hexStirng
        var siblings = merkleProof.siblings.map((val: any) => {
            var value = ethers.BigNumber.from(val[0])
            return value.toHexString()
        })
        
        var root: any = ethers.BigNumber.from(merkleProof.root)
        root = root.toHexString()
        
        const inputs =  {
        "ClaimsVals": convertedArrayHex,
        "MerkleProofSiblings": siblings,
        "MerkleProofPathIndices": merkleProof.pathIndices,
        "MerkleProofRoot" : root,
        "EthAddress" : ethAddress,
        "DisclosureVector" : disclosureVector
        }
        
        const { proof, publicSignals } = await groth16.fullProve(
            inputs, 
            "zkVerifiableCredentialsDBCore.wasm",
            "circuit_final.zkey");
        
        //const proof = "a"
        //const publicSignals = "a"
        return {proof , publicSignals}
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
                            <div key={claimNames} className={styles.credNumberIn}>
                                <p>{claimNames}</p> <input type = "checkbox" onChange={(event  : React.ChangeEvent<HTMLInputElement>)=>{
                                   let newDisclosureVector = this.state.disclosureVector
                                   newDisclosureVector[index] = event.target.checked? 1:0
                                   this.setState((state) => ({disclosureVector: newDisclosureVector}))    
                                }}/>
                            </div>
                        )
                    })}
                <button onClick={async ()=>{
                    /*Proof generation */
                    const merkleProof = await generateMerkleProof(this.props.credentialsDB, this.state.credentialNumber)
                    const {proof , publicSignals} = await generateZKProof(this.state.credentialJSON, this.state.claimsArray, merkleProof , this.state.disclosureVector)
                    
                    console.log(this.state.credentialJSON)
                    console.log(proof)
                    console.log(publicSignals)

                }}>Generate proof</button>
                
            </div>:<div></div>}
        </div> 
    )
  }

}
