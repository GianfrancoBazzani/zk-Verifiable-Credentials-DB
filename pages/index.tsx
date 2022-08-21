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
import UserProof from './components/userproof'
import UserVerify from './components/userverify' 

const Home: NextPage = () => {
  //Contracts Constats
  const CREDENTIALS_DB_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"

  //wallet connection
  const [walletAddress, setWalletAddress] = useState("")
  const [walletPublicKey, setWalletPublicKey] = useState("")
  const [provider, setProvider] = useState<Web3Provider | undefined>(undefined)
  const [signer, setSigner] = useState<Signer | undefined>(undefined)
  const [credentialsDB, setCredentialsDB] = useState<Contract | undefined>(undefined)
  const [isIssuer, setIsIssuer] = useState(false);
  const [walletCon, setWalletCon] = useState(false);
  const [userSelection, setUserSelection] = useState("default");
  
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
            setIsIssuer(true)
          }
          setWalletCon(true)
        }

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
      {
        walletCon?
          <main className={styles.main}>
              {isIssuer?<Issuer walletAddress={walletAddress} credentialsDB={credentialsDB}></Issuer>:
              <div>
                {
                  {
                    'proove':<UserProof walletAddress={walletAddress} credentialsDB={credentialsDB}></UserProof>,
                    'verify':<h1>verify</h1>,
                    'getPubAdd':<div><h4>Your public key: {walletPublicKey}</h4></div>,
                    'default': 
                    <div  className={styles.main}>
                      <h1>What you want to do?</h1>
                      <div className={styles.userSelection}>
                        <button onClick={()=>{setUserSelection("proove")}}>Prove Your credential</button>
                        <button onClick={()=>{setUserSelection("verify")}}>Verify a proof</button>
                        <button onClick={async ()=>{
                          setUserSelection("getPubAdd")
                          const pubKey = await getPubKeyFromMM(walletAddress)
                          if(pubKey){setWalletPublicKey(pubKey)}
                          }}>Get your public address</button>         
                      </div>
                    </div>
                  } [userSelection]
                }
              </div>}
          </main>
        :
        <main className={styles.main}>
          <h1>Connect your wallet first</h1>
          <p>Your type of account will be automatically detected</p>
        </main>
      }
    </div>
  )
}

export default Home
