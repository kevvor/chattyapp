import React, {Component} from 'react';

class Message extends Component {

  render () {
    console.log(this.props.color)
    if (this.props.type === 'incomingMessage') {
      return (
        <div className="Message">
          <span className="message-username" style={{color: this.props.color}} > {this.props.username} </span>
          <span className="message-content">{this.props.content}</span>
        </div>
      )
    }
    if (this.props.type === 'incomingNotification') {
      return (
        <div className = "message system"> {this.props.content} </div>
      )
    }
  }
}

export default Message;
