import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
  super(props);
  this.state = { content: '' };
  this.onNameChange = this.onNameChange.bind(this);
  this.onMessage = this.onMessage.bind(this);
  this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  onNameChange(event){
    this.setState({
      username: event.target.value
    })
  }
  onMessage(event){
    this.setState({
      content: event.target.value
    });
  }
  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.props.onNewMessage(this.state.username, this.state.content);
      this.setState({content: ''});
    }
  } 
  render() {
    console.log("Rendering <ChatBar />");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" 
          placeholder="Your Name (Optional)" 
          defaultValue= { this.props.user } 
          onChange= { this.onNameChange } />
        <input className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          onChange = { this.onMessage }
          onKeyPress= { this.handleKeyPress } 
          value= {this.state.content } />
      </footer>   
    );
  }
}
export default ChatBar;

//  onSubmit = { this.onPost } 