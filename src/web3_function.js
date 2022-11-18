import Web3 from "web3";
import CalculatorContract from './contract/Calculator.json';

async function connectWeb3(){
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    const web3=new Web3(provider);
    const accounts= await web3.eth.getAccounts();
    console.log("Accounts:",accounts);
    const networkId=await web3.eth.net.getId();
    const deployedNetwork=await CalculatorContract.networks[networkId];
    const instance=new web3.eth.Contract(
        CalculatorContract.abi,
        deployedNetwork.address
    );
    
    return {accounts,instance}
}
 
async function connectWeb3Metamask(){
    const web3 = new Web3(Web3.givenProvider);
    console.log("web3:",web3);
    const accounts=await web3.eth.requestAccounts();
    console.log("accounts",accounts);

    const networkId=await web3.eth.net.getId();
    const deployedNetwork=await CalculatorContract.networks[networkId];
    const instance=new web3.eth.Contract(
        CalculatorContract.abi,
        deployedNetwork.address
    );
    console.log("instance",instance);
    
    return {accounts,instance}
}

async function addFunction(contractInstance,account,num1,num2){
    console.log("Instance:", contractInstance);
    console.log(num1);

    let result=await contractInstance.methods.addNum(Number(num1),Number(num2)).send({from:account});
    console.log("Res:",result);
    return result.events.success.returnValues.value;
}

async function subFunction(contractInstance,account,num1,num2){
    if(num2>num1){
        let result=await contractInstance.methods.subNum(Number(num2),Number(num1)).send({from:account});
        console.log("Res:",result);
        return result.events.success.returnValues.value; 
    }else{
    let result=await contractInstance.methods.subNum(Number(num1),Number(num2)).send({from:account});
    console.log("Res:",result);
    return result.events.success.returnValues.value;
    }
}

async function mulFunction(contractInstance,account,num1,num2){
    let result=await contractInstance.methods.mulNum(Number(num1),Number(num2)).send({from:account});
    console.log("Res:",result);
    return result.events.success.returnValues.value;
}

async function divFunction(contractInstance,account,num1,num2){
    let result=await contractInstance.methods.divNum(Number(num1),Number(num2)).send({from:account});
    console.log("Res:",result);
    return result.events.success.returnValues.value;
}

export {connectWeb3,addFunction,subFunction,mulFunction,divFunction,connectWeb3Metamask};