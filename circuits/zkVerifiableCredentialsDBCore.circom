pragma circom 2.0.0;

include "./../node_modules/circomlib/circuits/poseidon.circom";
include "./../node_modules/circomlib/circuits/comparators.circom";
include "./MerkleTreeInAlreadyHashed.circom";
include "./../node_modules/circomlib/circuits/mux1.circom";

template zkVerifiableCredentialsDBCore(depth, claimsN){
    //n: numbers of cliams in the credential schema
    //Depth**2: numbers of leaves
    //Signals
    signal input ClaimsVals[claimsN];
    signal input MerkleProofSiblings[depth];
    signal input MerkleProofPathIndices[depth];
    signal input MerkleProofRoot;
    signal input EthAddress;
    signal input DisclosureVector[claimsN];
    signal output RevealedData[claimsN];

    //Hashing ClaimsVal to obtain CredentialHash (digest of posHash(claimsN-1))
    component posHash[claimsN];

    posHash[0] = Poseidon(2);
    posHash[0].inputs[0] <== ClaimsVals[0];
    posHash[0].inputs[1] <== ClaimsVals[1];

    for(var i=2; i<claimsN; i++){
        posHash[i-1] = Poseidon(2);
        posHash[i-1].inputs[0] <== posHash[i-2].out;
        posHash[i-1].inputs[1] <== ClaimsVals[i];
    }

    //Hashing EthAddress with CredentialHash to obtain the leaf
    posHash[claimsN-1] = Poseidon(2);
    posHash[claimsN-1].inputs[0] <== posHash[claimsN-2].out;
    posHash[claimsN-1].inputs[1] <== EthAddress;

    //Compute Merkle Root
    component  merkleProof = MerkleTreeInclusionProof(depth);
    merkleProof.leafHash <== posHash[claimsN-1].out;
    for(var i=0; i<depth; i++){
        merkleProof.path_elements[i] <== MerkleProofSiblings[i];
        merkleProof.path_index[i] <== MerkleProofPathIndices[i];
    }

    //Check Root equality 
    component ie = IsEqual();
    ie.in[0] <== merkleProof.root;
    ie.in[1] <== MerkleProofRoot;
    ie.out === 1;

    //Apply selective disclosure
    component mux[claimsN];
    for(var i=0; i<claimsN; i++){
        mux[i] = Mux1();
        mux[i].c[0] <== 0;
        mux[i].c[1] <== ClaimsVals[i];
        mux[i].s <== DisclosureVector[i];
        RevealedData[i] <== mux[i].out; 
    }

}

//set tree depth and credential claims number
component main {public [MerkleProofRoot,EthAddress]} = zkVerifiableCredentialsDBCore(16, 4);