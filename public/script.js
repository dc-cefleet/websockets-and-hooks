const socket = new WebSocket("ws://localhost:3423");

socket.onopen = ()=>{
    socket.onmessage = (evt)=>{
        console.log(evt.data);
        document.getElementById("messages").innerHTML += `<div>${evt.data}</div>`;
    }

    document.getElementById("request-amount").addEventListener("click",()=>{
        socket.send(JSON.stringify({type:"request-amount"}))
    })

    document.getElementById("deposit").addEventListener("click",()=>{
        let value = document.getElementById("deposit-amount").value;

        let responseMsg = {type:"deposit", payload:value};

        socket.send(JSON.stringify(responseMsg))
    })
}