import React, {Component} from 'react';

const SystemNotification = (props) => {
  return (<div className="message system">{props.content}</div>)
}

class Message extends Component {
  render() {
    if(this.props.type === 'incomingNotification'){
      return (<SystemNotification content={this.props.content}/>);
    }
    return (<div className="message">
      <span className="message-username">{ this.props.username } </span>
      <span className="message-content">{ this.props.content }</span>
    </div>);
  }
}
export default Message;