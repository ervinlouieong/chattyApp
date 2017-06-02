import React, {Component} from 'react';

import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    let eachMessage =  this.props.messages.map(message => {
      return <Message
        key={ message.id }
        username={ message.username }
        content={ message.content } 
        type={ message.type } />
    });
    return (
      <div id="Message-List">
        <main className='messages'>
        { eachMessage }
        </main>
      </div>
    );
  }
}
export default MessageList;