import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("BaseContract", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployBaseContractFixture() {
        const greeting = "Hello Base!";

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const BaseContract = await ethers.getContractFactory("BaseContract");
        const baseContract = await BaseContract.deploy(greeting);

        return { baseContract, greeting, owner, otherAccount };
    }

    describe("Deployment", function () {
        it("Should set the right greeting", async function () {
            const { baseContract, greeting } = await loadFixture(deployBaseContractFixture);

            expect(await baseContract.getGreeting()).to.equal(greeting);
        });
    });

    describe("Set Greeting", function () {
        it("Should update the greeting", async function () {
            const { baseContract } = await loadFixture(deployBaseContractFixture);
            const newGreeting = "Hello World!";

            await baseContract.setGreeting(newGreeting);
            expect(await baseContract.getGreeting()).to.equal(newGreeting);
        });
    });
});
