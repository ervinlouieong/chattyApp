import React, {Component} from 'react';

import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList />");
    let eachMessage =  this.props.messages.map(message => {
      return <Message
        key={ message.id }
        username={ message.username }
        content={ message.content } />
    });
    return (
      <div id="Message-List">
        { eachMessage }
      </div>
    );
  }
}
export default MessageList;