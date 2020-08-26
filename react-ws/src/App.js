import React, {useState, useEffect} from 'react';
import useWS from "./useWS";
function App() {

  const [msgs,setMsg] = useState([]);
  const [text,setText] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [connect, sendMessage] = useWS();

  useEffect(()=>{    
    if(!isConnected){
      const recieveMessage = (evt) => {
        console.log(evt.data);
        console.log(msgs);
        setMsg([...msgs, evt.data])
      }

      connect("ws://localhost:3423", recieveMessage);
      setIsConnected(true)
    }
  },[connect, setMsg,msgs, isConnected])

  const request = ()=>{
      sendMessage({type:"request-amount"})
  }

  const deposit = ()=>{
    console.log(text)
    sendMessage({type:"deposit", payload:text})
  }


  return (
    <div className="App">
      <h1>Websocket React</h1>

      <button id="request-amount" onClick={request}>Request</button>
      <button id="deposit" onClick={deposit}>Deposit</button>
      <input onChange={(evt)=>setText(evt.target.value)}  />
      <div>{msgs.map((ms,idx)=><div key={idx} >{ms}</div>)}</div>
    </div>
  );
}

export default App;
