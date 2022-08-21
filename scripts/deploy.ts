import { JsonRpcBatchProvider } from "@ethersproject/providers";
import { ethers } from "hardhat";
import credentialsSchema from "../credentials-src/examplecredentialschema.json"; //Import custom credentials schema
import {poseidon_gencontract as poseidonContract} from "circomlibjs"


async function main() {
  //merkle tree library
  const poseidonT3ABI = poseidonContract.generateABI(2)
  const poseidonT3Bytecode = poseidonContract.createCode(2)

  const [signer] = await ethers.getSigners()

  const PoseidonLibFactory = new ethers.ContractFactory(poseidonT3ABI,poseidonT3Bytecode,signer)
  const poseidonT3Lib = await PoseidonLibFactory.deploy()
  await poseidonT3Lib.deployed()

  console.log(`Poseidon hash lib deployed in address: ${poseidonT3Lib.address}`)

  const IncrementalBinaryTreeLibFactory = await ethers.getContractFactory("IncrementalBinaryTree", {
    libraries: {
        PoseidonT3: poseidonT3Lib.address
    }
  })
  const incrementalBinaryTreeLib = await IncrementalBinaryTreeLibFactory.deploy()
  await incrementalBinaryTreeLib.deployed()

  console.log(`Poseidon hash lib deployed in address: ${incrementalBinaryTreeLib.address}`)

  //credentials DB deployment
  const CredentialsDB = await ethers.getContractFactory("CredentialsDB", {
    libraries: {
      IncrementalBinaryTree: incrementalBinaryTreeLib.address
    }
  })
  const credentialsDB = await CredentialsDB.deploy()
  await credentialsDB.deployed();
  console.log("success credentialsDB.sol deployment")

  //Add contract address to JSON
  credentialsSchema["schema_json"]["schema_location"] = `${credentialsDB.address}:credentialsSchema`
  const schemaJsonString = JSON.stringify(credentialsSchema)
  const tx = await credentialsDB.setCredentialsSchema(schemaJsonString)

  //check contract variables
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
