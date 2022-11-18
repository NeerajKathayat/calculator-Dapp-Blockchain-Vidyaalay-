import React,{useState} from 'react'
import { addFunction,subFunction,mulFunction,divFunction } from '../web3_function';

export default function Calculator(contractInstance,account) {

    const [size,setSize] = useState('large');
      const [num1,setNum1]=useState(0);
      const [num2,setNum2]=useState(0);
      const [result,setResult]=useState(0);
    async function calculateRes(operationType){
        let openResult=0;

        switch(operationType){
            case "+": openResult= await addFunction(contractInstance,account,num1,num2);
                        setResult(openResult);
                        break;
             case "-": openResult=await subFunction(contractInstance,account,num1,num2);
                        setResult(openResult);
                        break;       
            case "*": openResult=await mulFunction(contractInstance,account,num1,num2);
                        setResult(openResult);
                        break;      
            case "/": openResult=await divFunction(contractInstance,account,num1,num2);
                        setResult(openResult);
                        break; 
            case "default": alert("wrong data");
                              break;                       

        }              
    }
  return (
    <>
    <div>
      <h2 style={{textAlign: "center"}}>
        WEB3 Calculator
      </h2>
      <center>
   <div >
      <h5>Number 1:</h5>
      <input style={{height: "50px"}} placeholder={"Enter First Number"} onChange={(e)=>{setNum1(e.target.value)}} /><br/>
      <h5 style={{marginTop: "10px"}}>Number 2:</h5>
      <input style={{height: "50px"}} placeholder={"Enter Second Number"} onChange={(e)=>{setNum2(e.target.value)}}/><br/>
      <h5 style={{marginTop: "10px"}}>Result:</h5>
      <input style={{height: "50px"}} placeholder={result} /><br/>
     <br/>

     <button size={size} style={{marginLeft: "10px"}} onClick={()=>calculateRes("+")}>+</button>
     <button size={size} style={{marginLeft: "10px"}} onClick={()=>calculateRes("-")}>-</button>
     <button size={size} style={{marginLeft: "10px"}} onClick={()=>calculateRes("*")}>X</button>
     <button size={size} style={{marginLeft: "10px"}} onClick={()=>calculateRes("/")}>/</button>            
    </div>
    </center>
    </div>
    </>
  )
}
