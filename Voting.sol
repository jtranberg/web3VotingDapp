// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    mapping(address => bool) public hasVoted;
    mapping(bytes32 => uint256) public votes;

    string[] public candidates = [
        "candidate1",
        "candidate2",
        "candidate3",
        "candidate4",
        "candidate5"
    ];

    event Voted(address indexed voter, bytes32 indexed candidate);

    function vote(bytes32 candidate) external {
        require(!hasVoted[msg.sender], "You have already voted");
        bool isValidCandidate = false;

        // Validate candidate
        for (uint256 i = 0; i < candidates.length; i++) {
            if (keccak256(abi.encodePacked(candidates[i])) == candidate) {
                isValidCandidate = true;
                break;
            }
        }

        require(isValidCandidate, "Invalid candidate");

        votes[candidate]++;
        hasVoted[msg.sender] = true;
        emit Voted(msg.sender, candidate);
    }

    function getVotes(bytes32 candidate) external view returns (uint256) {
        return votes[candidate];
    }
}
