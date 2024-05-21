const { ethers } = require("hardhat");

function logSeparator() {
    console.log('-'.repeat(50));
}

async function main() {
    logSeparator();

    console.log("Getting the USDP token contract...");
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const usdpToken = await ethers.getContractAt("USDP", contractAddress);
    logSeparator();

    // Get the contract name
    console.log("Getting the contract name...");
    const name = await usdpToken.name();
    console.log(`Contract name: ${name}`);
    logSeparator();

    // Get the symbol of the token
    console.log("Getting the contract symbol...");
    const symbol = await usdpToken.symbol();
    console.log(`Contract symbol: ${symbol}`);
    logSeparator();

    // Get the decimals of the contract
    console.log("Getting the decimals of the token...");
    const decimals = await usdpToken.decimals();
    console.log(`Contract decimals: ${decimals}`);
    logSeparator();

    // Get the total supply of the token
    console.log("Getting total supply of the token...");
    const totalSupply = await usdpToken.totalSupply();
    console.log(`Total supply: ${totalSupply} WEI`); // 1 WEI = 10^-18 ETH
    console.log(`Total supply (comma separated): ${ethers.utils.commify(totalSupply)}`);
    console.log(`Total supply (USDP): ${ethers.utils.formatUnits(totalSupply, decimals)}`);
    logSeparator();

    // Get the balance of the first default account
    console.log("Getting the balance of the first default account...");
    const signers = await ethers.getSigners();
    const ownerAddress = signers[0].address;
    let ownerBalance = await usdpToken.balanceOf(ownerAddress);
    console.log(`Balance of ${ownerAddress}: ${ethers.utils.formatUnits(ownerBalance, decimals)} ${symbol}`);
    logSeparator();

    // Transfer
    console.log("Initiating transfer...");
    const recipientAddress = signers[1].address;
    const transferAmount = 10000;
    const transferAmountFormatted = ethers.utils.parseUnits(transferAmount.toString(), decimals);

    console.log(`Transferring ${transferAmount} ${symbol} to ${recipientAddress}...`);
    await usdpToken.transfer(recipientAddress, transferAmountFormatted);
    console.log("Transfer done.");

    let recipientBalance = await usdpToken.balanceOf(recipientAddress);
    console.log(`Balance of ${recipientAddress}: ${ethers.utils.formatUnits(recipientBalance, decimals)} ${symbol}`);
    logSeparator();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });