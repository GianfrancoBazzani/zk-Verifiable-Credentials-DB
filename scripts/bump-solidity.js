async function main(){
    const fs = require("fs");
    const solidityRegex = /pragma solidity \^\d+\.\d+\.\d+/

    let content = fs.readFileSync("./contracts/zkVerifiableCredentialsDBCoreVerifier.sol", { encoding: 'utf-8' });
    let bumped = content.replace(solidityRegex, 'pragma solidity ^0.8.9');

    fs.writeFileSync("./contracts/zkVerifiableCredentialsDBCoreVerifier.sol", bumped);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  




