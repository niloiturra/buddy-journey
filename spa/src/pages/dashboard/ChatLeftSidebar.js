import React from 'react';
import { connect } from 'react-redux';

import { TabContent, TabPane } from 'reactstrap';

import Profile from './Tabs/Profile/index.js';
import Chats from './Tabs/Chats/index.js';
import Settings from './Tabs/Settings';
import Initial from './Tabs/Initial/index.js';

function ChatLeftSidebar(props) {
  const activeTab = props.activeTab;

  return (
    <>
      <div className="chat-leftsidebar me-lg-1">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="home" id="pills-home">
            <Initial />
          </TabPane>

          <TabPane tabId="profile" id="pills-user">
            <Profile />
          </TabPane>

          <TabPane tabId="chats" id="pills-chat">
            <Chats recentChatList={props.recentChatList} />
          </TabPane>

          <TabPane tabId="settings" id="pills-setting">
            <Settings />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
}

const mapStatetoProps = (state) => {
  return {
    ...state.Layout,
  };
};

export default connect(mapStatetoProps, null)(ChatLeftSidebar);
