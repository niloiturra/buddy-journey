import React, { useState } from 'react';
import ChatLeftSidebar from './ChatLeftSidebar';
import ChatGroup from './ChatGroup';
import Groups from './Groups/';
import sideBarMenus from '../../layouts/AuthLayout/sideBarMenus';
import { connect } from 'react-redux';
import LobbyConnection from './LobbyConnection';

function Index({ activeTab }) {
  const [group, setGroup] = useState(null);
  return (
    <>
      <LobbyConnection />
      {activeTab !== sideBarMenus.GROUP && (
        <>
          <ChatLeftSidebar handleClick={(value) => setGroup(value)} />
          <ChatGroup group={group} />
        </>
      )}

      {activeTab === sideBarMenus.GROUP && <Groups />}
    </>
  );
}

const mapStateToProps = (state) => {
  const { activeTab } = state.Layout;
  const { connection } = state.ChatGroups;
  const { user } = state.Auth;
  return { activeTab, connection, user };
};

export default connect(mapStateToProps, null)(Index);
