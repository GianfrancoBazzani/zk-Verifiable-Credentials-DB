import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers"

const HARMONY_PRIVATE_KEY = "0d065b1a5dc3f5e336f20b51e7c0cca40bcffe17b64d9e01a0fa0a2188d1904a"; //Example Harmony Devnet privkey

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    harmonydevnet: {
      url: `https://api.s0.ps.hmny.io`,
      accounts: [`0x${HARMONY_PRIVATE_KEY}`]
    },
  }
};

export default config;
