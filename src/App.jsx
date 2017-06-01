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
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = (event) =>  {
      console.log("Connected to server!");
    };
    this.socket.onmessage = (event) => {
      console.log(event.data);
      this.setState({
        messages: this.state.messages.concat(JSON.parse(event.data))
      })
    };
  }
  onNewMessage(type, username, content) {
    let newMessage = {type: type,
                      username: username , 
                      content:content};
    console.log("NEW MESSAGE",newMessage);
              
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


