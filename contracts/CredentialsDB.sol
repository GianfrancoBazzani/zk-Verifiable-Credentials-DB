// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";//to erase

import "@openzeppelin/contracts/access/Ownable.sol";

contract CredentialsDB is Ownable{
    //JSON credentials schema
    string public credentialsSchema;
    
    string[2**15] public credentialsRegister;
    uint32 public credentialsCounter;

    constructor(string memory schema){
        credentialsSchema=schema;
    }

    function saveCredential(string calldata data) public onlyOwner(){
        credentialsRegister[credentialsCounter] = data;
        credentialsCounter ++;
    }

    function viewArray(uint i) public view returns (string memory){
        return credentialsRegister[i];
    }

}