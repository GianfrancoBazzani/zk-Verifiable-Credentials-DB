import React, { Component , useState} from 'react';
import styles from '../../styles/Home.module.css'
import {Contract, ethers, Signer} from 'ethers'
import {decrypt, encrypt} from '@metamask/eth-sig-util'
import { isGeneratorFunction } from 'util/types';
import {poseidon} from "circomlibjs"
import { throws } from 'assert';





/*functions to be transfered to user portal */
//download encypted data to contract. this function do not goes here, goes in subject portal
async function downloadEncryptedCredentialFromContract(index: number, contract: Contract | undefined){
    if(contract){
        const encCredential = await contract.saveCredential(index)
        return encCredential
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


export default class UserVerify extends Component <{

},{

}
> {
    
  render() {
    return(
        <div className={styles.issuerContainer}>
            <h1>User Verify</h1>
            
        </div> 
    )
  }

}

