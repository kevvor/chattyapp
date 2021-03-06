import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentUser: {name: 'anon'},
      messages: [],
      number: 0
    };
  }

  componentDidMount() {

    this.socket = new WebSocket('ws://localhost:3001/');

    console.log("componentDidMount <App />");

    this.socket.onopen = (event) => {
      console.log('Connected to server')
    }

    this.socket.onmessage = (event) => {
      const parsedMsgs = JSON.parse(event.data);

      if (parsedMsgs.type === 'incomingMessage' || parsedMsgs.type === 'incomingNotification') {
        const messages = this.state.messages.concat(parsedMsgs)
        this.setState({messages: messages})
      }
      else if (parsedMsgs.type === 'usercolor') {
        const newColor = {color: parsedMsgs.color}
        const userColor = Object.assign(this.state.currentUser, newColor);
        this.setState({currentUser: userColor})
      }
      else {
        this.setState({numClients: parsedMsgs.number})
      }
    }

    this.socket.onclose = (event) => {
      const parsedMsgs = JSON.parse(event.data);
      this.setState({numClients: parsedMsgs.number})
    }
  }

  newChatMessage(event) {
    if (event.keyCode === 13) {
      const postMessage = {
          type: 'postMessage',
          username: this.state.currentUser.name,
          content: event.target.value,
          color: this.state.currentUser.color
      }
      this.socket.send(JSON.stringify(postMessage));
      event.target.value = '';
    }
  }

  newUsername(event) {
    if (event.keyCode === 13) {
      const newUsername = {
        name: event.target.value,
        color: this.state.currentUser.color
      }
      event.target.blur()
      const userNotification = {
        type: 'postNotification',
        content: `${this.state.currentUser.name} has changed their name to ${newUsername.name}`
      }
      this.setState({currentUser: newUsername})
      this.socket.send(JSON.stringify(userNotification))
    }
  }

  render() {
    return (
      <div className ="wrapper">
        <NavBar numClients = {this.state.numClients} />
        <MessageList messages = {this.state.messages} />
        <ChatBar currentUser = {this.state.currentUser} newUsername = {this.newUsername.bind(this)} newChatMessage = {this.newChatMessage.bind(this)} />
      </div>
    );
  }
}
export default App;
