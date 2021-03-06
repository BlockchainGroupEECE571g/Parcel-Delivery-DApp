import React, { Component } from 'react'
import Addressbar from './Addressbar'
import Express from '../abis/Express'
import Web3 from 'web3'
import Dialog from "./Dialog"
import './App.css'
import logo from '../images/logo.png'
import courierCar from '../images/courier-car.jpg'

 
class Courier extends Component {
  state = {
    account: '',
    orders: [],
    currentCourier: [],
    statusMap: {
      101: 'Waiting to be taken',
      102: 'Waiting for delivery',
      103: 'Delivered, waiting a confirmation',
      104: 'Completed',
      105: 'Cancelled',
      106: 'Completed and Graded'
    },
    loading2: false,
    dialog: false,
    message: []
  }
 
  async componentDidMount() {
    await this.getWeb3Provider()
    await this.connectToBlockchain()
  }
 
  async getWeb3Provider() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      )
    }
  }
  async connectToBlockchain() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Express.networks[networkId]
    if (networkData) {
      const deployedExpress = new web3.eth.Contract(
        Express.abi,
        networkData.address,
      )
      this.setState({ deployedExpress: deployedExpress })
      const totalNumber = await deployedExpress.methods.totalNumber().call()
      this.setState({ totalNumber })
      console.log('totalNumber', totalNumber)
      for (var i = 1; i <= totalNumber; i++) {
        const order1 = await deployedExpress.methods.orders1(i).call()
        const order2 = await deployedExpress.methods.orders2(i).call()
        const order3 = await deployedExpress.methods.orders3(i).call()
        const orderAll = { ...order1, ...order2, ...order3 }
        this.setState({
          orders: [...this.state.orders, orderAll],
        })
      }
      console.log('myOrders', this.state.orders)
     
      const currentCourier = await deployedExpress.methods.couriers(accounts[0]).call();
      this.setState({
        currentCourier: currentCourier
      })
      console.log('currentCourier', this.state.currentCourier);
 
    } else {
      window.alert('Express contract is not found in your blockchain.')
    }
  }
  takeOrder = async (_orderId, _currentTime) => {
    this.setState({ loading: true })
    const gasAmount = await this.state.deployedExpress.methods
      .takeOrder(_orderId, _currentTime)
      .estimateGas({ from: this.state.account })
    this.state.deployedExpress.methods
      .takeOrder(_orderId, _currentTime)
      .send({ from: this.state.account, gas: gasAmount })
      .once('receipt', receipt => {
        this.setState({ loading: false })
        window.location.reload();
      })
  }
  deliverOrder = async (_orderId, _currentTime) => {
    this.setState({ loading: true })
    const gasAmount = await this.state.deployedExpress.methods
      .deliverOrder(_orderId, _currentTime)
      .estimateGas({ from: this.state.account })
    this.state.deployedExpress.methods
      .deliverOrder(_orderId, _currentTime)
      .send({ from: this.state.account, gas: gasAmount })
      .once('receipt', receipt => {
        this.setState({ loading: false })
        window.location.reload();
      })
  }
 
  handleTakeOrder = async e => {
    var r = window.confirm(
      'Are you sure to taking order ' + e.target.name + '?',
    )
    if (r == true) {
      // var myDate = new Date();
      // const currentTime = myDate.getHours()+1;
      // console.log(currentTime)
      await this.takeOrder(e.target.name, 1)
    } else {
    }
  }
 
  //open the dialog
  showInfo = async (senderName, senderPhone, pickupAddr, receiverName, receiverPhone, shippingAddr, receiver, startTime, endTime, orderWeight, orderType) => {
    this.setState({
      loading2: true
    })
 
    this.setState({
      dialog: true,
      message: [senderName, senderPhone, pickupAddr, receiverName, receiverPhone, shippingAddr, receiver, startTime, endTime, orderWeight, orderType],
      loading2: false
    })
 
  }
 
  //close the dialog
  closeDialog = () => {
    this.setState({
      dialog: false
    })
  }
  Home = () => {
    this.props.history.push({ pathname: '/' })
  }

  render() {
    return (
      <div>
        <Addressbar account={this.state.account} />{' '}
        {this.state.dialog&&<Dialog message={this.state.message} closeDialog={this.closeDialog}/>}
        <div className="container-fluid mt-5">
        <div className="mybody">
          <div className="title">
          <img
            onClick={this.Home.bind(this)}
            src={logo}
            className="logoimg2"
          ></img>
          <img
            src={courierCar}
            className="logoimg4"
          ></img>
          <h2 className="orderH"> All Orders To Be Taken  </h2>
          </div>
          <div className="table1">
          <table className="table">
            <thead id="orderList">
              <tr>
                <th scope="col"> #OrderId </th>{' '}
                <th scope="col"> Pickup Address </th>{' '}
                <th scope="col"> Shipping Address </th>{' '}
                <th scope="col"> Order Type </th>{' '}
                <th scope="col"> Pickup Time </th>{' '}
                <th scope="col"> Expected Delivery Time </th>{' '}
              </tr>{' '}
            </thead>{' '}
            <tbody id="orderList">
              {' '}
              {this.state.orders.map((order, key) => {
                return order.orderStatus == '101' &&
                  order.parcelSender != this.state.account && order.receiver != this.state.account? (
                  <tr key={key}>
                    <th scope="row"> {order.orderId.toString()} </th>{' '}
                    <th scope="row"> {order.pickupAddr} </th>{' '}
                    <th scope="row"> {order.shippingAddr} </th>{' '}
                    <th scope="row"> {order.orderType} </th>{' '}
                    <th scope="row"> {order.startTime.toString()}: 00 </th>{' '}
                    <th scope="row"> {order.endTime.toString()}: 00 </th>{' '}
                    <td>
                      <button
                        name={order.orderId}
                        onClick={this.handleTakeOrder}
                        className="deliverButton"
                      >
                        Take Order{' '}
                      </button>{' '}
                    </td>{' '}
                  </tr>
                ) : null
              })}{' '}
            </tbody>{' '}
          </table>{' '}
          </div>
          <h2 className="orderRecordsH"> Your Taken Orders </h2>{' '}
          <div className="table2">
          <table className="table">
            <thead id="orderList">
              <tr>
                <th scope="col"> #OrderId </th>{' '}
                <th scope="col"> Order Status </th>{' '}
                <th scope="col"> Deliver Order </th>{' '}
              </tr>{' '}
            </thead>{' '}
            <tbody id="orderList">
              {' '}
              {this.state.orders.map((order, key) => {
                return order.courier == this.state.account ? (
                  <tr key={key}>
                    <th scope="row"> {order.orderId.toString()} </th>{' '}
                    <td scope="row">
                      {' '}
                      {this.state.statusMap[order.orderStatus]}{' '}
                    </td>{' '}
                    <td>
                      {' '}
                      {order.orderStatus == '102' ? (
                        <button
                        className="deliverButton"
                          name={order.orderId}
                          onClick={async event => {
                            await this.deliverOrder(event.target.name, 11)
                          }}
                        >
                          Deliver Order{' '}
                        </button>
                      ) : null}{' '}
                    </td>{' '}
                    <td>
                      {' '}
                      
                        <button
                        className="showInfoButton"
                          onClick={async event => {
                            await this.showInfo(order.senderName,order.senderPhone,order.pickupAddr,order.receiverName,order.receiverPhone,order.shippingAddr,order.receiver,order.startTime,order.endTime,order.orderWeight,order.orderType)
                          }}
                        >
                          showInfo{' '}
                        </button>
                      {' '}
                    </td>{' '}
                  </tr>
                ) : null
              })}{' '}
            </tbody>{' '}
          </table>{' '}
          </div>
          <div className="showScore">
          <span>Your current Score: {this.state.currentCourier.courierGrade}</span>
          <span>Total Number of received grades: {this.state.currentCourier.totalGradesNum}</span>
          </div>
          </div>
        </div>{' '}
      </div>
    )
  }
}
 
export default Courier
