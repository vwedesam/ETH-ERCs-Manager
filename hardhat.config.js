/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    paths: {
        sources: "./src/solidity/contracts",
        tests: "./src/solidity/test",
        cache: "./src/solidity/cache",
        artifacts: "./src/solidity/artifacts",
    },
};
