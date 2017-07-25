import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render () {
    return (
      <div className="MessageList">
        {
          this.props.messages.map(function(object, index) {
            return <Message key = {index} username = {object.username} content = {object.content} />
          })
        }
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </div>
    );
  }
}

export default MessageList;
