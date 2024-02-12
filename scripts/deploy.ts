import { ethers } from "hardhat";

async function main() {

  const todo = await ethers.deployContract("MyTodo");

  await todo.waitForDeployment();

  console.log(
    `Todo contract successfully deployed at ${todo.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
