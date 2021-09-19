import React from 'react';

import ChatLeftSidebar from './ChatLeftSidebar';
import ChatGroup from './ChatGroup';
import Groups from './Groups/';
import sideBarMenus from '../../layouts/AuthLayout/sideBarMenus';
import { connect } from 'react-redux';

function Index({ users, activeTab }) {
  return (
    <>
      {activeTab !== sideBarMenus.GROUP && (
        <>
          <ChatLeftSidebar />
          <ChatGroup />
        </>
      )}

      {activeTab === sideBarMenus.GROUP && <Groups />}
    </>
  );
}

const mapStateToProps = (state) => {
  const users = [];
  const { activeTab } = state.Layout;
  return { users, activeTab };
};

export default connect(mapStateToProps, {})(Index);
