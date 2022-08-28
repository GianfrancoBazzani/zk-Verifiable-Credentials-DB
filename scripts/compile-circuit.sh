#!/bin/bash

cd circuits

mkdir zkVerifiableCredentialsDBCore

if [ -f ./powersOfTau28_hez_final_19.ptau ]; then
    echo "powersOfTau28_hez_final_19.ptau already exists. Skipping."
else
    echo 'Downloading powersOfTau28_hez_final_19.ptau'
    wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_19.ptau
fi

echo "Compiling zkVerifiableCredentialsDBCore.circom..."

# compile circuit

circom zkVerifiableCredentialsDBCore.circom --r1cs --wasm --sym -o zkVerifiableCredentialsDBCore
snarkjs r1cs info zkVerifiableCredentialsDBCore/zkVerifiableCredentialsDBCore.r1cs

# Start a new zkey and make a contribution

snarkjs groth16 setup zkVerifiableCredentialsDBCore/zkVerifiableCredentialsDBCore.r1cs powersOfTau28_hez_final_19.ptau zkVerifiableCredentialsDBCore/circuit_0000.zkey
snarkjs zkey contribute zkVerifiableCredentialsDBCore/circuit_0000.zkey zkVerifiableCredentialsDBCore/circuit_final.zkey --name="1st Contributor Name" -v -e="random text"
snarkjs zkey export verificationkey zkVerifiableCredentialsDBCore/circuit_final.zkey zkVerifiableCredentialsDBCore/verification_key.json

# generate solidity contract
snarkjs zkey export solidityverifier zkVerifiableCredentialsDBCore/circuit_final.zkey ../contracts/zkVerifiableCredentialsDBCoreVerifier.sol

# copy output to public folder to be used by front end

cp zkVerifiableCredentialsDBCore/circuit_final.zkey ../public/circuit_final.zkey

cp zkVerifiableCredentialsDBCore/zkVerifiableCredentialsDBCore_js/zkVerifiableCredentialsDBCore.wasm ../public/zkVerifiableCredentialsDBCore.wasm

cd ..