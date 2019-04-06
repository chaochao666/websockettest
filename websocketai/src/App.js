import React, { Component } from 'react';
import './App.css';
import {Button, Input} from 'antd';

var client;
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      tip:'666',
      receive:''
    }

  }
  
  componentDidMount(){
    client = new WebSocket('ws://localhost:8080/', 'echo-protocol');  
        client.onerror = function() {  
            console.log('Connection Error');  
        };  
        client.onopen = function() {  
            console.log('WebSocket Client Connected');  
  
        };  
        client.onclose = function() {  
            console.log('echo-protocol Client Closed');  
        };  
        client.onmessage = this.receiveData;
  }
  sendmsg = ()=>{
      let {tip} = this.state;
      if (client.readyState === client.OPEN) {  
          client.send(tip.toString());  

      }  
  }  

  
  receiveData =(e)=>{
    this.setState({
      receive:e.data
    });
  }

  onOpen = ()=>{
    console.log("connected");
  }

  onClose = ()=>{
    console.log("disconnect");
  }

  textonchang = (e)=>{
    this.setState({
      tip:e.target.value
    })
  }
  render() {
    const { receive} = this.state;
    return (
      <div className="App">
        <Input onChange={this.textonchang} style={{display:'inline-block',width:'200px'}}></Input>
        <Button onClick={this.sendmsg} type='primary'>AITEST</Button>
        <span style={{display:'block'}}>{receive}</span>
      </div>
    );
  }
}

export default App;
