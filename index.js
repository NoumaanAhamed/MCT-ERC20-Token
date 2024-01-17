import Web3 from 'web3';
import axios from 'axios';
import { abi } from "./abi.js";
import 'dotenv/config'


const providerUrl = process.env.PROVIDER_URL;
const contractAddress = "0xdb803824be409cc8a3F4A005df77B570EC5a315f";
const webhookUrl = "http://localhost:3000/webhook";

const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));
const contract = new web3.eth.Contract(abi, contractAddress);

// async function main() {
//     const accounts = await web3.eth.getAccounts();
//     console.log(accounts);
// }

contract.events.Transfer({
    fromBlock: 0
})
.on('data', async function(event) {
    console.log(`Received ${event.returnValues.value}`);
    // await axios.post(webhookUrl, {
    //     value: event.returnValues.value.toString()
    // });
})

// main();