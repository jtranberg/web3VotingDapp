// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    mapping(address => bool) public hasVoted;
    mapping(bytes32 => uint256) public votes;

    event Voted(address indexed voter, bytes32 indexed candidate);

    function vote(bytes32 candidate) external {
        require(!hasVoted[msg.sender], "You have already voted");
        votes[candidate]++;
        hasVoted[msg.sender] = true;
        emit Voted(msg.sender, candidate);
    }
}