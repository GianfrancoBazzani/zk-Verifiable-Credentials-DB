import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
// @ts-ignore 
import {groth16} from 'snarkjs'
import { BigNumber } from "ethers";
/*
describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

    return { lock, unlockTime, lockedAmount, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

      expect(await lock.unlockTime()).to.equal(unlockTime);
    });

    it("Should set the right owner", async function () {
      const { lock, owner } = await loadFixture(deployOneYearLockFixture);

      expect(await lock.owner()).to.equal(owner.address);
    });

    it("Should receive and store the funds to lock", async function () {
      const { lock, lockedAmount } = await loadFixture(
        deployOneYearLockFixture
      );

      expect(await ethers.provider.getBalance(lock.address)).to.equal(
        lockedAmount
      );
    });

    it("Should fail if the unlockTime is not in the future", async function () {
      // We don't use the fixture here because we want a different deployment
      const latestTime = await time.latest();
      const Lock = await ethers.getContractFactory("Lock");
      await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
        "Unlock time should be in the future"
      );
    });
  });

  describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { lock } = await loadFixture(deployOneYearLockFixture);

        await expect(lock.withdraw()).to.be.revertedWith(
          "You can't withdraw yet"
        );
      });

      it("Should revert with the right error if called from another account", async function () {
        const { lock, unlockTime, otherAccount } = await loadFixture(
          deployOneYearLockFixture
        );

        // We can increase the time in Hardhat Network
        await time.increaseTo(unlockTime);

        // We use lock.connect() to send a transaction from another account
        await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
          "You aren't the owner"
        );
      });

      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        const { lock, unlockTime } = await loadFixture(
          deployOneYearLockFixture
        );

        // Transactions are sent using the first signer by default
        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).not.to.be.reverted;
      });
    });

    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { lock, unlockTime, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw())
          .to.emit(lock, "Withdrawal")
          .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
      });
    });

    describe("Transfers", function () {
      it("Should transfer the funds to the owner", async function () {
        const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).to.changeEtherBalances(
          [owner, lock],
          [lockedAmount, -lockedAmount]
        );
      });
    });
   });
});

    */
    ///ADITION
    describe("Circuit test", function () {
      it("circuit test", async function () {
    
        const inputsJSON = JSON.parse('{"ClaimsVals":["0x31","0x5eCcbe6393C63177EaDc5302202EB7bf48F57cBc","0x4769616e6672616e636f","0x313132393837353736393033323435"],"MerkleProofSiblings":["0x2ee5f20b9c1fc205b640062a879037f6411e7c045a6c336098247f845bd38e04","0x2098f5fb9e239eab3ceac3f27b81e481dc3124d55ffed523a839ee8446b64864","0x1069673dcdb12263df301a6ff584a7ec261a44cb9dc68df067a4774460b1f1e1","0x18f43331537ee2af2e3d758d50f72106467c6eea50371dd528d57eb2b856d238","0x07f9d837cb17b0d36320ffe93ba52345f1b728571a568265caac97559dbc952a","0x2b94cf5e8746b3f5c9631f4c5df32907a699c58c94b2ad4d7b5cec1639183f55","0x2dee93c5a666459646ea7d22cca9e1bcfed71e6951b953611d11dda32ea09d78","0x078295e5a22b84e982cf601eb639597b8b0515a88cb5ac7fa8a4aabe3c87349d","0x2fa5e5f18f6027a6501bec864564472a616b2e274a41211a444cbe3a99f3cc61","0x0e884376d0d8fd21ecb780389e941f66e45e7acce3e228ab3e2156a614fcd747","0x1b7201da72494f1e28717ad1a52eb469f95892f957713533de6175e5da190af2","0x1f8d8822725e36385200c0b201249819a6e6e1e4650808b5bebc6bface7d7636","0x2c5d82f66c914bafb9701589ba8cfcfb6162b0a12acf88a8d0879a0471b5f85a","0x14c54148a0940bb820957f5adf3fa1134ef5c4aaa113f4646458f270e0bfbfd0","0x190d33b12f986f961e10c0ee44d8b9af11be25588cad89d416118e4bf4ebe80c","0x22f98aa9ce704152ac17354914ad73ed1167ae6596af510aa5b3649325e06c92"],"MerkleProofPathIndices":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"MerkleProofRoot":"0x11e5f52c239a55ced01cf958274f0fbc61795f71baebd9f487a7155705ffea8e","EthAddress":"0x5eCcbe6393C63177EaDc5302202EB7bf48F57cBc","DisclosureVector":[1,1,1,1]}')
        const { proof, publicSignals } = await groth16.fullProve(
          inputsJSON, 
          "circuits/zkVerifiableCredentialsDBCore/zkVerifiableCredentialsDBCore_js/zkVerifiableCredentialsDBCore.wasm",
          "circuits/zkVerifiableCredentialsDBCore/circuit_final.zkey");
        
        //console.log(proof)
        const id = ethers.BigNumber.from(publicSignals[2])
    
    
        console.log(id.toHexString())
      });
    })


