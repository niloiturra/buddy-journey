import React from 'react';
import { connect } from 'react-redux';
import { TabContent, TabPane } from 'reactstrap';
import Profile from './Tabs/Profile/index.js';
import Chats from './Tabs/Chats/index.js';
import Initial from './Tabs/Initial/index.js';
import FAQ from './Tabs/FAQ/index.js';

const ChatLeftSidebar = ({ activeTab, handleClick }) => {
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
            <Chats handleClick={handleClick} />
          </TabPane>

          <TabPane tabId="faq" id="pills-faq">
            <FAQ />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { activeTab } = state.Layout;
  return { activeTab };
};

export default connect(mapStateToProps, null)(ChatLeftSidebar);
