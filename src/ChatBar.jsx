import React, {Component} from 'react';

class ChatBar extends Component {
  render () {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder= {this.props.currentUser.name} onKeyUp = {this.props.newUsername} />
        <input className="chatbar-message" placeholder="type a message and hit ENTER" onKeyUp = {this.props.newChatMessage} />
      </footer>
    );
  }
}

export default ChatBar;
