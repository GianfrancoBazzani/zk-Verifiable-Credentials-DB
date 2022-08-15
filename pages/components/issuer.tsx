import React, { Component , useState} from 'react';
import styles from '../../styles/Home.module.css'
import {Contract, ethers, Signer} from 'ethers'



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

export default class Issuer extends Component <{
    credentialsDB: Contract | undefined,
},{
    claimsArray: [string] | undefined,
    credentialJSON:{"claims":{ [x: string]: string; }},
    credentialsCounter: number
}
> {

  render() { 
    return(
        <div className={styles.issuerContainer}>
            <h1>Issuer Portal</h1>
                        
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
                    console.log(this.state.credentialJSON)
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
                        <button type="submit">Submit </button>        
                </form>
            </div>}   

        </div> 
    )
  }

}

