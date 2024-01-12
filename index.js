import Web3 from 'web3';
import axios from 'axios';
import { abi } from "./abi.js";

const providerUrl = "wss://eth-sepolia.g.alchemy.com/v2/2hh5OQadjmaLXTkU3AC_hl-igB6OJcFu"
const contractAddress = "0xdb803824be409cc8a3F4A005df77B570EC5a315f";
const webhookUrl = "https://your-dummy-fetch-url";

const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));
const contract = new web3.eth.Contract(abi, contractAddress);


contract.events.Transfer({
    fromBlock: 0
})
.on('data', async function(event) {
    console.log(`Received ${event.returnValues.value}`);
    // axios.post(webhookUrl, {
    //     email: event.returnValues.email,
    // });
})