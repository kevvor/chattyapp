import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render () {
    return (
      <div className="MessageList">
        {
          this.props.messages.map(function(object, index) {
            console.log(object)
            return <Message color= {object.color} key = {index} username = {object.username} content = {object.content} type = {object.type} />
          })
        }
      </div>
    );
  }
}

export default MessageList;
