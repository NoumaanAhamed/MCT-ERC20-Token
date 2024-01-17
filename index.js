import Web3 from 'web3';
import axios from 'axios';
import { abi } from "./abi.js";
import 'dotenv/config'


const providerUrl = process.env.PROVIDER_URL;
const contractAddress = "0xdb803824be409cc8a3F4A005df77B570EC5a315f";
const webhookUrl = "http://localhost:3000/webhook";

const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));
const contract = new web3.eth.Contract(abi, contractAddress);

const fromAddress = '0xd68c62F898371Cd602d639eC190A70C6F0101d7f';
const toAddress = '0xA5D19Db5428ab1eEe51D4047b4aE31E83fba1c5F';



function viewAllTranscations(){
    contract.events.Transfer({
        fromBlock: 0
    })
    .on('data', async function(event) {
        console.log(`Received ${event.returnValues.value}`);
        // await axios.post(webhookUrl, {
        //     value: event.returnValues.value.toString()
        // });
    })

}

function viewBalance(fromAddress){
    contract.methods.balanceOf(fromAddress).call().then((balance) => {
        console.log(`Balance of ${fromAddress} is ${balance}`);
    })
}

function viewTranscationsOfSender(targetWalletAddress){
    contract.events.Transfer({
        fromBlock: 0,
        filter: { from: targetWalletAddress } // Specify the address you want to filter by
    })
    .on('data', async function(event) {
        console.log(`Received ${event.returnValues.value} for address ${event.returnValues.to}`);
    })
    
}

function viewTranscationsOfReceiver(targetWalletAddress){
    contract.events.Transfer({
        fromBlock: 0,
        filter: { to: targetWalletAddress } // Specify the address you want to filter by
    })
    .on('data', async function(event) {
        console.log(`Received ${event.returnValues.value} from address ${event.returnValues.from}`);
    })
    
}

function main(){
    viewBalance(fromAddress);
    viewTranscationsOfSender(fromAddress);
    viewTranscationsOfReceiver(toAddress);
}



// viewBalance(fromAddress);
// viewAllTranscations();


// main();