import { ethers } from "hardhat";

async function main() {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const unlockTime = currentTimestampInSeconds + 60;

    const lockedAmount = ethers.parseEther("0.001");

    const greeting = "Hello Base!";

    console.log(`Deploying BaseContract with greeting: ${greeting}`);

    const contract = await ethers.deployContract("BaseContract", [greeting]);

    await contract.waitForDeployment();

    console.log(
        `BaseContract deployed to ${await contract.getAddress()}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
