const express = require("express");
const app = express();
require('express-ws')(app);
const port = 3423;

let bankAmount = 20;
let connections = []; 
app.use(express.static(__dirname+'/public'));

app.ws("/", (ws,req)=>{
    
    ws.id = Math.random()+'-'+Math.random()+'-'+new Date().getTime()
    console.log(ws.id);
    connections.push(ws);

    ws.send("Connection Accepted");    
    ws.on('message', (msg)=>{
        let msgObj;
        try {
            msgObj = JSON.parse(msg);
        } catch(err){
            return ws.send('You have requested something incorrectly');
        }

        if(msgObj.type === 'deposit'){
            
            let addAmount = parseInt(msgObj.payload);
            console.log(addAmount);

            if (!isNaN(addAmount)) bankAmount += addAmount;

            return connections.forEach(_ws=>_ws.send(bankAmount));
        }
        if(msgObj.type === 'request-amount') return ws.send(bankAmount);
        ws.send("Message Recieved");
    });

    ws.on('close', ()=>{
        connections = connections.filter(con=>con.id !== ws.id);
    });
        
});

app.listen(port, ()=>console.log(`http://localhost:${port}`)) 