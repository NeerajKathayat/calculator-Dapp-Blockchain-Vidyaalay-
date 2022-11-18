import React, { useEffect, useState } from 'react'
import Calculator from "./Component/calculator";
import { connectWeb3,connectWeb3Metamask } from './web3_function';
export default function App() {
  const [contractInstance,setContract]=useState(null);
  const [accounts,setAccounts]=useState();

  useEffect(()=>{
    async function connect(){
      try{
        // let {accounts,instance}= await connectWeb3();
       let {accounts,instance} =await connectWeb3Metamask();
       setAccounts(accounts);
       setContract(instance);
      }catch(error){
        alert("Failed to load web3, accounts, or contract. check console for details.");
        console.log(error);
      }
     
    }
      connect();
  },[])

  return (
    <>
    { contractInstance == null ? 
        <>
          <h2 style={{textAlign: "center"}}> Trying to connect with web3Provider </h2>
        </> :
        <>
        <Calculator contractInstance={contractInstance} account={accounts[0]}/>
        </>}
     
      </>
  );
}
