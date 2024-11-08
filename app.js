let web3;
let contract;
let userAddress = null;

const contractAddress = "0xYourActualContractAddressHere"; // Replace with your actual contract address
const abi = [
    {
        "inputs": [{ "name": "candidate", "type": "bytes32" }],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "name": "candidate", "type": "bytes32" }],
        "name": "getVotes",
        "outputs": [{ "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    }
];

// Initialize Web3
function initializeWeb3() {
    // Alert users when the app loads
    window.alert(
        "⚠️ Please Note: This DApp may take a moment to fully load.\n\n" +
        "🔗 Welcome to the Patriotic Voting DApp! 🇺🇸\n\n" +
        "📌 This DApp allows you to securely cast your vote for your favorite candidate on the blockchain.\n\n" +
        "🛠️ To get started:\n" +
        "1️⃣ Connect your MetaMask wallet by clicking the 'Connect Wallet' button.\n" +
        "2️⃣ Ensure the smart contract is deployed on the blockchain. Without deployment, voting will not work.\n" +
        "3️⃣ Select your preferred candidate and click 'Vote Now' to cast your vote.\n\n" +
        "⚠️ Note: Once you cast your vote, it is permanent and cannot be changed."
    );

    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        console.log("Web3 initialized");
    } else {
        alert("❌ MetaMask is not installed. Please install it to use this DApp.");
    }
}

// Function to connect the wallet
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length > 0) {
                userAddress = accounts[0];
                document.getElementById('walletAddress').textContent = `Connected: ${userAddress}`;
                
                contract = new web3.eth.Contract(abi, contractAddress);

                document.getElementById('connectButton').style.display = 'none';
                document.getElementById('disconnectButton').style.display = 'block';
                console.log("Wallet connected");
            }
        } catch (error) {
            console.error("MetaMask connection error:", error);
        }
    }
}


// Function to disconnect the wallet
function disconnectWallet() {
    userAddress = null;
    document.getElementById('walletAddress').textContent = '';
    document.getElementById('connectButton').style.display = 'block';
    document.getElementById('disconnectButton').style.display = 'none';
    console.log("Wallet disconnected");
}

// Function to cast a vote
async function vote() {
    const candidate = document.getElementById('candidate').value;
    const messageDiv = document.getElementById('message');

    // If wallet is not connected, prompt to connect
    if (!userAddress) {
        alert("Please connect your wallet first.");
        return;
    }

    if (!contract) {
        messageDiv.textContent = "❌ Contract not initialized.";
        return;
    }

    try {
        await contract.methods.vote(web3.utils.asciiToHex(candidate)).send({ from: userAddress });
        messageDiv.textContent = `✅ Thank you for voting for ${candidate}`;
    } catch (error) {
        console.error("Voting error:", error);
        messageDiv.textContent = `❌ ${error.message}`;
    }
}


window.initializeWeb3 = initializeWeb3;
window.connectWallet = connectWallet;
window.disconnectWallet = disconnectWallet;
window.vote = vote;
