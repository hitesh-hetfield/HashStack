// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract B is AccessControl {

    bytes32 public constant ADMIN = keccak256("ADMIN_ROLE");
    bytes32 public constant SUPER_ADMIN = keccak256("SUPER_ADMIN_ROLE");

    address public superAdmin;

    constructor(address _superAdmin) {

        superAdmin = _superAdmin;

        _grantRole(SUPER_ADMIN, superAdmin);
        _setRoleAdmin(SUPER_ADMIN, SUPER_ADMIN);
        _setRoleAdmin(ADMIN, SUPER_ADMIN); 

    }

    modifier onlySuperAdmin() {
        require(hasRole(SUPER_ADMIN, msg.sender), "Caller is not the Super Admin");
        _;
    }

    modifier onlyAdmin() {
        require(hasRole(ADMIN, msg.sender), "Caller is not the Admin");
        _;
    }

    function addAdmin(address adminAddress) public onlySuperAdmin {
        require(adminAddress != address(0), "Invalid admin address");
        grantRole(ADMIN, adminAddress);
    }

    function removeAdmin(address adminAddress) public onlySuperAdmin {
        require(hasRole(ADMIN, adminAddress), "User is not an admin");
        revokeRole(ADMIN, adminAddress);
    }

    function transferAdminRole(address oldAdmin, address newAdmin) public onlySuperAdmin {
        revokeRole(ADMIN, oldAdmin);
        grantRole(ADMIN, newAdmin);
    }

    function renounceAdminRole() public onlyAdmin {
        renounceRole(ADMIN, msg.sender);
    }
}
