import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {
        id: 3,
        username: "Michelle",
        content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 3000);
  }


  newChatMessage(event) {


    if (event.keyCode === 13) {

    const incomingMsg = {
        username: this.state.currentUser.name,
        content: event.target.value
      }
      const msgs = this.state.messages.concat(incomingMsg)
      this.setState({messages: msgs})
      event.target.value = ''
    }
  }


  render() {
    return (
    <div className ="wrapper">
      <NavBar />
      <MessageList messages = {this.state.messages}
      />
      <ChatBar currentUser = {this.state.currentUser} newChatMessage = {this.newChatMessage.bind(this)} />
    </div>
    );
  }
}
export default App;






