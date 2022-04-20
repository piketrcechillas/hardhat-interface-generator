import { task } from "hardhat/config";
import abi2sols from "abi2sols";
import fs from "fs";

task("generate-interface", "Generate a new Solidity interface for a given file")
  .addPositionalParam("contract", "Solidity contract name")
  .setAction(async ({ contract }, hre) => {
    const artifact = await hre.artifacts.readArtifact(contract);

    const outputFile =
      hre.config.paths.root +
      "/" +
      artifact.sourceName.replace(/[^\/]+.sol/, `I${contract}.sol`);

    const solidity = abi2sols(JSON.stringify(artifact.abi)).replace(
      "GeneratedInterface",
      `I${contract}`
    );
    try {
      fs.writeFileSync(outputFile, solidity);
    } catch (err) {
      console.log(err);
    } finally {
      console.log(`Generated interface I${contract}`);
    }
  });
