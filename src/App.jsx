import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


let testData = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: []
};



class App extends Component {
  constructor(props) {
  super(props);
  this.state = testData;
  this.onNewMessage = this.onNewMessage.bind(this);
  }
  componentDidMount() {
    const ws = new WebSocket("ws://localhost:3001");
    this.socket = ws;
    this.socket.onmessage = (event) => {
      this.setState({
        messages: this.state.messages.concat(JSON.parse(event.data))
      })
  // code to handle incoming message
}
    ws.onopen = function() {
      console.log("Connected to server!");
    }
    console.log("componentDidMount <App />");
  }
  onNewMessage(username, content) {
    let newMessage = {username: username, 
                      content:content}
    this.socket.send(JSON.stringify(newMessage));
  }
  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages = { this.state.messages } />
        <ChatBar user = { this.state.currentUser }
          onNewMessage = { this.onNewMessage }/>
      </div>
    );
  }
}
export default App;


