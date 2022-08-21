// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";//to erase

import "@openzeppelin/contracts/access/Ownable.sol";
import "@zk-kit/incremental-merkle-tree.sol/IncrementalBinaryTree.sol";

contract CredentialsDB is Ownable{
    //Events
    event CredentialSavedInRegister(uint32 credentialNo);
    event LeafInserted(uint256 leaf, uint256 root);

    //JSON credentials schema
    string public credentialsSchema;
    bool public credentialsSchemaSet = false;
    
    //Merkle Tree
    using IncrementalBinaryTree for IncrementalTreeData;
    IncrementalTreeData public tree;
    uint256 private constant TREE_DEPTH=10;

    //Encrypted credentials register
    string[2**TREE_DEPTH] public credentialsRegister;
    uint32 public credentialsCounter=0;

    //constructor
    constructor(){
        tree.init(TREE_DEPTH,0);
    }


    //Encrypred credentials storage functions 
    function setCredentialsSchema(string memory schema) external onlyOwner{
        require(!credentialsSchemaSet,"Schema already set");
        credentialsSchema=schema;
        credentialsSchemaSet=true;
    }

    function saveCredential(string calldata data) external onlyOwner(){
        credentialsRegister[credentialsCounter] = data;
        credentialsCounter ++;

        emit CredentialSavedInRegister(credentialsCounter);
    }

    function viewArray(uint i) external view returns (string memory){
        return credentialsRegister[i];
    }

    //Merkle tree functions
    function insertLeaf(uint256 leaf) external {
        tree.insert(leaf);
        emit LeafInserted(leaf, tree.root);
    }




}