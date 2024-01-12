// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.1/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MainCharactersToken", "MCT") {
        _mint(msg.sender, 10000000 * 10 ** decimals());
    }
}
