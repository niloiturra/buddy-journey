import React, { Component } from 'react';

import ChatLeftSidebar from './ChatLeftSidebar';
import UserChat from './UserChat/';

import { connect } from 'react-redux';

class Index extends Component {
  render() {
    return (
      <>
        <ChatLeftSidebar recentChatList={this.props.users} />

        <UserChat recentChatList={this.props.users} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { users } = state.Chat;
  return { users };
};

export default connect(mapStateToProps, {})(Index);
