//SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/access/IAccessControl.sol";

contract A is Initializable, UUPSUpgradeable, ReentrancyGuardUpgradeable {

    uint256 internal _setVariable; 
    address public owner;

    event valueSet(uint256 setValue);

    function initialize() public initializer {
        owner = msg.sender;

        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner of this contract");
        _;
    }

    /*  Setting Reentrancy against a view function is redundant,
        also not setting the onlyOwner modifer on this function, since people
        would be unable to view the value.
    */
    
    function getter() public view returns(uint256) {
        return _setVariable;
    }

    function setter(uint256 setValue) virtual nonReentrant onlyOwner public {
        _setVariable += setValue;
        emit valueSet(setValue);
    }

    // Required by UUPS
    function _authorizeUpgrade(address newImplementation) internal virtual override onlyOwner {}
}