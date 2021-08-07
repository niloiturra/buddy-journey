import React from 'react';
import { connect } from 'react-redux';

import { TabContent, TabPane } from 'reactstrap';

import Profile from './Tabs/Profile';
import Chats from './Tabs/Chats';
import Groups from './Tabs/Groups';
import Contacts from './Tabs/Contacts';
import Settings from './Tabs/Settings';
import Initial from './Tabs/Initial/Initial';

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

          <TabPane tabId="chat" id="pills-chat">
            <Chats recentChatList={props.recentChatList} />
          </TabPane>

          <TabPane tabId="group" id="pills-groups">
            <Groups />
          </TabPane>

          <TabPane tabId="contacts" id="pills-contacts">
            <Contacts />
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
