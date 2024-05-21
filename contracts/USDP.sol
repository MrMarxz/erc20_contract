// contracts/FunToken.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDP is ERC20 {

    // Define the number of tokens that will be minted
    uint256 constant initialSupply = 1000000 * (10 ** 18);

    // Define the constructor
    constructor() ERC20("USDP", "USDP") {
        _mint(msg.sender, initialSupply);
    }
}
