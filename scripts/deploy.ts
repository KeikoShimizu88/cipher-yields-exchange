import { ethers } from "hardhat";

async function main() {
  console.log("Deploying CipherYieldsExchange contract...");

  const CipherYieldsExchange = await ethers.getContractFactory("CipherYieldsExchange");
  const cipherYieldsExchange = await CipherYieldsExchange.deploy();

  await cipherYieldsExchange.waitForDeployment();

  const address = await cipherYieldsExchange.getAddress();
  console.log("CipherYieldsExchange deployed to:", address);

  // Verify contract on Etherscan (optional)
  if (process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    await cipherYieldsExchange.deploymentTransaction()?.wait(6);
    
    try {
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [],
      });
      console.log("Contract verified on Etherscan");
    } catch (error) {
      console.log("Verification failed:", error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
