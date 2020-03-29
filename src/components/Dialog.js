import React, { Component } from 'react'
const Dialog = props => {
  const { message, closeDialog } = props
  return (
      <div className="dialog-container">
        <div className="dialog-header"> </div>{' '}
        <div className="dialog-body">
          <div> {'Sender Name: ' + message[0]} </div>{' '}
          <div> {'Sender Phone Number: ' + message[1]} </div>{' '}
          <div> {'Pickup Address: ' + message[2]} </div>{' '}
          <div> {'Receiver Name: ' + message[3]} </div>{' '}
          <div> {'Receiver Phone Number: ' + message[4]} </div>{' '}
          <div> {'Shipping Address: ' + message[5]} </div>{' '}
          <div> {'Receiver Hash Address: ' + message[6]} </div>{' '}
          <div> {'Pickup Time: ' + message[7]} </div>{' '}
          <div> {'Expected Delivery Time: ' + message[8]} </div>{' '}
          <div> {'Item Weight: ' + message[9]} </div>{' '}
          <div> {'Item Type: ' + message[10]} </div>{' '}
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
