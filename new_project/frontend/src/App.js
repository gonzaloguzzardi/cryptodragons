import React, { Component } from 'react';
import Web3 from 'web3'
import Counter from './contracts/Counter.json'
import CounterInfo from './counter_info.json'
import { Client, LocalAddress, CryptoUtils, LoomProvider } from 'loom-js'
import './App.css'

class App extends Component  {

  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      loading: true,
      privateKey: null
    }

    this.increment = this.increment.bind(this);
    this.handlePk = this.handlePk.bind(this);

  }

  handlePk(event) {
      let privateKey = event.target.value;
      this.setState({ privateKey })

      this.publicKey = CryptoUtils.publicKeyFromPrivateKey(CryptoUtils.B64ToUint8Array(privateKey));
      this.currentUserAddress = LocalAddress.fromPublicKey(this.publicKey).toString();

      this.client = new Client(
        'default',
        'ws://127.0.0.1:46658/websocket',
        'ws://127.0.0.1:46658/queryws'
      );

      this.client.on('error', msg => {
        console.error('Error on connect to client', msg)
        console.warn('Please verify if loom command is running')
      });
      this.web3Provider = new LoomProvider(this.client, CryptoUtils.B64ToUint8Array(privateKey));
      this.web3 = new Web3(this.web3Provider)
           
      // Change for 
      this.counter = new this.web3.eth.Contract(Counter.abi, CounterInfo.address, {
        from: this.currentUserAddress
      })

      this.counter.methods.getCounter().call().then((value) => {
          return this.setState({ value, loading: false })
      })
  }

  increment() {
    console.log("Incrementing counter by 1")
    this.setState({ loading: true })
    this.counter.methods.getCounter().call().then((value) => {
      console.log(`Counter value before updating is: ${value}`)
      this.counter.methods.increment().send({ from: this.currentUserAddress }).then((r) => {
        console.log("Counter incremented by 1")
        this.counter.methods.getCounter().call().then((value) => {
          console.log("Reading counter value")
          return this.setState({ value, loading: false })
        })
      })
    })
  }

  render() {
    return (
      <div className='row'>
        <div className='col-lg-12 text-center' >
          <h1>Counter</h1>
          <input type="text" value={this.state.pk} onChange={this.handlePk} placeholder="Enter your private key"/>
          <br />
          <button onClick={this.increment} disabled={!this.state.privateKey}>
            Increment
          </button>
          <br/>
          { this.state.loading
            ? <p className='text-center'>Loading...</p>
            : <p>Counter: {this.state.value.toString()}</p>
          }
        </div>
      </div>
    )
  }
}

export default App;