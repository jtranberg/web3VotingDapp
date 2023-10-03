// Connect to Ethereum node using Web3.js
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); // Use your Ethereum node URL

// Replace with your contract address and ABI
const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "candidate",
				"type": "bytes32"
			}
		],
		"name": "Voted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "candidate",
				"type": "bytes32"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "votes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to vote
async function vote() {
    const candidate = document.getElementById("candidate").value;
    const accounts = await web3.eth.requestAccounts();

    try {
        await contract.methods.vote(web3.utils.asciiToHex(candidate)).send({ from: accounts[0] });
        alert("Vote successful!");
    } catch (error) {
        console.error(error);
        alert("Vote failed. Please try again.");
    }
}

// Event listener to execute vote() when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("candidate").addEventListener("change", vote);
});