// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "./A.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/access/IAccessControl.sol";

contract upgradeA is A {
    address public contractB;

    function initializeUpgrade(address _contractB) public onlyOwner {
        require(_contractB != address(0), "Invalid address for contract B");
        contractB = _contractB;
    }

    modifier onlyAdmin() {
        require(
            IAccessControl(contractB).hasRole(keccak256("ADMIN_ROLE"), msg.sender),
            "Caller is not an admin"
        );
        _;
    }

    // Overriding modifier
    function setter(uint256 setValue) public override nonReentrant onlyAdmin {
        _setVariable += setValue;
        emit valueSet(setValue); // Emit the same event as in Contract A
    }

    // Required by UUPS
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
