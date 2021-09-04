import React from 'react';

import ChatLeftSidebar from './ChatLeftSidebar';
import UserChat from './UserChat/';
import Groups from './Groups/';
import sideBarMenus from '../../layouts/AuthLayout/sideBarMenus';
import { connect } from 'react-redux';

function Index({ users, activeTab }) {
  return (
    <>
      {activeTab !== sideBarMenus.GROUP && (
        <>
          <ChatLeftSidebar recentChatList={users} />
          <UserChat recentChatList={users} />
        </>
      )}

      {activeTab === sideBarMenus.GROUP && <Groups />}
    </>
  );
}

const mapStateToProps = (state) => {
  const { users } = state.Chat;
  const { activeTab } = state.Layout;
  return { users, activeTab };
};

export default connect(mapStateToProps, {})(Index);
