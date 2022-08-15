import { JsonRpcBatchProvider } from "@ethersproject/providers";
import { ethers } from "hardhat";
import credentialsSchema from "../credentials-src/examplecredentialschema.json"; //Import custom credentials schema

async function main() {
  

  //credentials DB deployment
  const CredentialsDB = await ethers.getContractFactory("CredentialsDB")
  const schemaJsonString = JSON.stringify(credentialsSchema)
  const credentialsDB = await CredentialsDB.deploy(schemaJsonString)
  
  await credentialsDB.deployed();
  console.log("success credentialsDB.sol deployment")
  const owner = await credentialsDB.owner()
  const address = await credentialsDB.address
  const readCredentialsSchema = await credentialsDB.credentialsSchema()
  console.log("Owner: " + owner)
  console.log("Contract address:" + address)
  console.log("Credentials schema: ")
  console.log(JSON.parse(readCredentialsSchema))
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
