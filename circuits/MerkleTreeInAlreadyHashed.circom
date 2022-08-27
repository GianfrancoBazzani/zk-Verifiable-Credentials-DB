pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";
include "../node_modules/circomlib/circuits/mux1.circom";

template CheckRoot(n) { // compute the root of a MerkleTree of n Levels 
    //  Example with n = 2;
    //
    //      H(H(H(l_1),H(l_2)),H(H(l_4),H(l_5))) ---> Merkle root
    //           /                      \
    //          /                        \
    //  H(H(l_1),H(l_2))          H(H(l_4),H(l_5))
    //     /    \                     /      \
    //    /      \                   /        \
    //  H(l_1)  H(l_2)             H(l_4)    H(l_5)
    //
    signal input inHash[2**n];
    signal output root;
    
    // components definition
    component posHash[(2**n)-1];
    
    for (var i = n-1; i >= 0 ; i--){
        var z = 2**(n)-1;
        for(var j = 2**(i+1)-2 ; j >= (2**i)-1 ; j--){
            posHash[j] = Poseidon(2);
            if(i == n-1){
                posHash[j].inputs[1] <== inHash[z];
                posHash[j].inputs[0] <== inHash[z-1];
                z=z-2;
            } else{
                posHash[j].inputs[1] <== posHash[j*2+2].out;
                posHash[j].inputs[0] <== posHash[j*2+1].out;
            }
            
        }
    }

    root <== posHash[0].out;
}

template MerkleTreeInclusionProof(n) {
    signal input leafHash;
    signal input path_elements[n];
    signal input path_index[n]; // path index are 0's and 1's indicating whether the current element is on the left or right
    signal output root; 

    component hash[n];
    component muxL[n];
    component muxR[n];


    for(var i = 0; i< n; i++){
        hash[i] = Poseidon(2);
        muxL[i] = Mux1();
        muxR[i] = Mux1();
        
        muxL[i].s <== path_index[i];
        muxR[i].s <== path_index[i];

        if(i == 0){muxL[i].c[0] <== leafHash;} else { muxL[i].c[0] <== hash[i-1].out;}      
        muxL[i].c[1] <== path_elements[i];

        muxR[i].c[0] <== path_elements[i];
        if(i == 0){muxR[i].c[1] <== leafHash;}else {muxR[i].c[1] <== hash[i-1].out;}

        hash[i].inputs[0] <== muxL[i].out;
        hash[i].inputs[1] <== muxR[i].out;
    }
    
    root <== hash[n-1].out;

}