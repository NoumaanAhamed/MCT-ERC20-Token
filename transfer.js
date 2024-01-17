import Web3 from 'web3';
import axios from 'axios';
import { abi } from "./abi.js";
import 'dotenv/config'

const providerUrl = process.env.PROVIDER_URL;
const contractAddress = "0xdb803824be409cc8a3F4A005df77B570EC5a315f";

const privateKey = process.env.PRIVATE_KEY;

const fromAddress = '0xd68c62F898371Cd602d639eC190A70C6F0101d7f';
const toAddress = '0x8d30B3d4B6937b2fDE5267c20bE2e75e004113AA';
const amount = 1000 * 10 ** 18;

const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));
const contract = new web3.eth.Contract(abi, contractAddress);


const transfer = async () => {
  const nonce = await web3.eth.getTransactionCount(fromAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 200000; // Adjust as needed

  const data = contract.methods.transfer(toAddress, amount).encodeABI();

  const rawTransaction = {
    nonce: web3.utils.toHex(nonce),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gasLimit),
    to: contractAddress,
    value: '0x0',
    data: data,
  };


  const signedTransaction = await web3.eth.accounts.signTransaction(
    rawTransaction,
    privateKey
  );

  const transactionReceipt = await web3.eth.sendSignedTransaction(
    signedTransaction.rawTransaction
  );

  return transactionReceipt;
};

const receipt =  transfer();

console.log(receipt);
