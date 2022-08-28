import React, { Component , useState} from 'react';
import styles from '../../styles/Home.module.css'
import {Contract, ethers, Signer} from 'ethers'
import {decrypt, encrypt} from '@metamask/eth-sig-util'
import { isGeneratorFunction } from 'util/types';
import {poseidon} from "circomlibjs"
import { throws } from 'assert';
import  VERIFIER_ARTIFACT from "../../artifacts/contracts/zkVerifiableCredentialsDBCoreVerifier.sol/Verifier.json"
import UserProof from './userproof';
const groth16 = require("snarkjs").groth16;

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


async function verifyProof(proofPack: any, credentialsDB: Contract | undefined, signer: Signer | undefined){

    const calldata = await groth16.exportSolidityCallData(proofPack.proof, proofPack.publicSignals);
    
    const argv = calldata.replace(/[[\]"\s]/g, "").split(',');

    // Building R1CS vectors
    const a = [argv[0], argv[1]];
    const b = [[argv[2], argv[3]], [argv[4], argv[5]]];
    const c = [argv[6], argv[7]];

    // Computation result
    const Input = argv.slice(8);
    

    //connect account to verifier contract
    let verifier: Contract | undefined
    if(credentialsDB){
        const verifierAddress = credentialsDB.verifier()
        //get contract object
        const abi = new ethers.utils.Interface(VERIFIER_ARTIFACT.abi)
        verifier = new ethers.Contract(verifierAddress,abi,signer)

        // Sends the poof to verifier smart contract to evalate it
        const result = await verifier.verifyProof(a, b, c, Input)
        return {result , Input}
    }
}

export default class UserVerify extends Component <{
    credentialsDB: Contract | undefined,
    walletAddress: string,
    signer: Signer | undefined
},{
    proofPack: any,
    proofSuccess: boolean,
    claimsArray: [string] | undefined,
    credentialVals: any,
    disclosureVector: [number],
    credentialSubjectAddress: string,
    contractRoot: number
}
> {
    
  render() {
    return(
        <div className={styles.issuerContainer}>
            <h1>User Verify</h1>
            <h3>Input the proof below</h3>
            <textarea rows={15} cols={70} onChange={
                (event) => {
                    this.setState((state) => ({proofPack : JSON.parse(event.target.value)}))
            }}></textarea>
            <button className={styles.verifyButton} onClick={async () =>{
                

                const res = await verifyProof(this.state.proofPack,this.props.credentialsDB,this.props.signer)
                   
                //Get Claims in string char
                const claimsArray = await readSchemaClaims(this.props.credentialsDB)
                const ethAddressIndex = claimsArray.indexOf("ethAddress")
                var credentialVals: any = []

                for (var i = 0 ; i<claimsArray.length; i++){          
                        var hex = res?.Input[i].slice(2)
                        hex = hex.replace(/^0+/, '');
                
                    if(i !== ethAddressIndex){
                        var str: string = ""
                        for (var n = 0; n < hex.length; n += 2) {
                            str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
                        }
                        credentialVals.push(str)
                    } else{
                        credentialVals.push("0x" + hex)
                    }
                }
                
                //Get merkle root from res.Input
                const proofRoot = ethers.BigNumber.from(res?.Input[claimsArray.length])
                
                //Get merkle root from contract
                var contractRoot: any
                if(this.props.credentialsDB){
                    contractRoot = await this.props.credentialsDB.getMerkleRoot()
                }
                
                //Get Address from res.Input
                var credentialSubjectAddress = res?.Input[claimsArray.length + 1].slice(2)
                credentialSubjectAddress = credentialSubjectAddress.replace(/^0+/, '');
                credentialSubjectAddress = "0x" + credentialSubjectAddress

                //Get Disclosure vector from res.Input
                var disclosureVector: any =[]

                for (var i = (res?.Input.length - claimsArray.length); i<res?.Input.length; i++){      
                    var val = res?.Input[i]
                    if(val === "0x0000000000000000000000000000000000000000000000000000000000000001"){
                        disclosureVector.push(1)
                    } else {
                        disclosureVector.push(0)
                    }
                    var val = res?.Input[i].slice(2)                    
                }
                

                console.log(disclosureVector)

                if((true) && res && (res.result === true)){
                    this.setState((state) => ({
                        proofSuccess : true,
                        claimsArray: claimsArray,
                        credentialVals: credentialVals,
                        contractRoot: res?.Input[claimsArray.length],
                        credentialSubjectAddress: credentialSubjectAddress,
                        disclosureVector: disclosureVector
                    }))
                }

            }}>Verify Proof</button>

            {
                (this.state && this.state.proofSuccess && this.state.claimsArray)?<div>
                    <h3>Proof verification OK!</h3>
                    <h3>Contract Merkle root:</h3>
                    <h4>{this.state.contractRoot}</h4>
                    <h3>Credential walletAddress:</h3>
                    <h4>{this.state.credentialSubjectAddress}</h4>
                    <h3>Credential claims:</h3>
                    <ul>{
                        this.state.claimsArray.map((claimNames, index)=> {
                        return(
                            <li key={claimNames}>{claimNames} = {this.state.disclosureVector[index]?this.state.credentialVals[index]:`"Hidden"`}</li>
                            )
                        })}
                    </ul>           
                
                </div>:<div></div> 
            }

        </div> 
    )
  }

}

