import type { NextPage } from 'next'
import React from 'react'
import { useState} from 'react'
import Head from 'next/head'
import {Contract, ethers, Signer} from 'ethers'
import styles from '../styles/Home.module.css'
import {greet} from "../credentials-src/index.js"
import { Web3Provider } from '@ethersproject/providers'
import  CREDENTIAL_DB_ARTIFACT from "../artifacts/contracts/CredentialsDB.sol/CredentialsDB.json"
import { sign } from 'crypto'
import Issuer from './components/issuer'

const Home: NextPage = () => {
  //Contracts Constats
  const CREDENTIALS_DB_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

  //wallet connection
  const [walletAddress, setWalletAddress] = useState("")
  const [provider, setProvider] = useState<Web3Provider | undefined>(undefined)
  const [signer, setSigner] = useState<Signer | undefined>(undefined)
  const [credentialsDB, setCredentialsDB] = useState<Contract | undefined>(undefined)
  const [isIssuer, setIsIssuer] = useState(false);
  
  //Request account to MM
  async function requestAccount() {
    if(window.ethereum) {
      try {
        const accounts = await window.ethereum.request!({
          method: "eth_requestAccounts",
        })
        setWalletAddress(accounts[0])
      } catch(e) {
        console.log(e)
      }
    } else {
      console.log("metamask not found")
    }
  }
  
  //Connect account to app
  async function connectAccount(){
      if(typeof window.ethereum !== 'undefined'){
        await requestAccount()
        const provider = await new ethers.providers.Web3Provider(window.ethereum)
        await setProvider(provider)
        const signer = await provider.getSigner();
        await setSigner(signer)
        if(provider){
          //get contract object
          const abi = new ethers.utils.Interface(CREDENTIAL_DB_ARTIFACT.abi)
          const creDB = new ethers.Contract(CREDENTIALS_DB_ADDRESS,abi,signer)
          await setCredentialsDB(creDB)
          
          //check if is issuer wallet
          
          const owner = await creDB.owner()
          const sigAdd = await signer.getAddress()
          //console.log(owner)
          //console.log(sigAdd)
          
          if(owner == sigAdd){
            setIsIssuer(true);
          }
          
        }

      }   
  }



  return (
    <div className={styles.container}>
      <Head>
        <title>ZK Verifiable credentials App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
      <h3>ZK Verifiable credentials App</h3>
        <div>
        {(walletAddress == "")?
          <button  className={styles.conButton} onClick={() => connectAccount()}> <div>Connect Wallet</div></button> : 
          <div className={styles.conButtonAddress}>
            {walletAddress.slice(0,7) + "..." + walletAddress.slice(-4)}
          </div>
        }
        </div>
      </header>
      <main className={styles.main}>
          {isIssuer?<Issuer credentialsDB={credentialsDB}></Issuer>:<h1>ZK Credentials DB</h1>}
      </main>
    </div>
  )
}

export default Home
