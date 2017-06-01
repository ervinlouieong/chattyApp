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
      const data = JSON.parse(event.data);
      switch(data.type) {
        // handle incoming message
        case 'incomingMessage':
          this.setState({
            messages: this.state.messages.concat(data)
          })
          break;
        // handle incoming notification
        case 'incomingNotification':
          this.setState({
            messages: this.state.messages.concat(data)
            })
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + data.type);
        }
    };
  }
  onNewMessage(username, content) {
    if(username !== this.state.currentUser.name) {
      let newMessage = {type: 'postNotification',
                        content: `${this.state.currentUser.name || 'Anonymous'} has changed their name to ${username || 'Anonymous'}`};
      this.setState({ currentUser: { name: username }});
      this.socket.send(JSON.stringify(newMessage));  
    }
    console.log(newMessage);
    let newMessage = {type: 'postMessage',
                      username: username , 
                      content: content };
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


