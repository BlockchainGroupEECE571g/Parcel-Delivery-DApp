import React, { Component } from 'react'
const Dialog = props => {
  const { message, closeDialog } = props
  let weight = "";
  if(message[9]==1){
<<<<<<< HEAD
     weight = "0-10kg";
  }else if(message[9]==11){
    weight = "10-20kg";
  }else if(message[9]==21){
    weight = "20-30kg";
=======
    weight = "0 - 10 KG";
  }
  if(message[9]==11){
    weight = "10 - 20 KG";
  }
  if(message[9]==21){
    weight = "20 - 30 KG";
>>>>>>> 6cc5dd1628c7dfca2f8a575c8e2ba4b7828f5dad
  }
  return (
      <div className="dialog-container">
        <div className="dialog-header"> </div>{' '}
        <div className="dialog-body">
          <div className="dialog-content"> <span>Sender Name: &nbsp; &nbsp;</span> {message[0]}</div>{' '}
          <div className="dialog-content"> <span>Sender Phone Number: &nbsp; &nbsp;</span> {message[1]}</div>{' '}
          <div className="dialog-content"> <span>Pickup Address: &nbsp; &nbsp;</span> {message[2]}</div>{' '}
          <div className="dialog-content"> <span>Receiver Name: &nbsp; &nbsp;</span> {message[3]}</div>{' '}
          <div className="dialog-content"> <span>Receiver Phone Number:  &nbsp; &nbsp;</span> {message[4]}</div>{' '}
          <div className="dialog-content"> <span>Shipping Address: &nbsp; &nbsp;</span> {message[5]}</div>{' '}
          <div className="dialog-content2"> <span>Receiver Hash Address:  &nbsp; &nbsp;</span> {message[6]}</div>{' '}
          <div className="dialog-content"> <span>Pickup Time:  &nbsp; &nbsp;</span> {message[7]+": 00"}</div>{' '}
          <div className="dialog-content"> <span>Expected Delivery Time:&nbsp; &nbsp;</span> {message[8]+": 00"}</div>{' '}
          <div className="dialog-content"> <span>Item Weight: &nbsp; &nbsp;</span> {weight}</div>{' '}
          <div className="dialog-content"> <span>Item Type:&nbsp; &nbsp;</span> {message[10]}</div>{' '}
        </div>{' '}
        <div className="dialog-footer">
          <button className="btn" onClick={closeDialog}>
            {' '}
            Close{' '}
          </button>{' '}
        </div>{' '}
      </div>
  )
}

export default Dialog
