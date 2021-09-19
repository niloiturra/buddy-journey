import React, { useState } from 'react';

import ChatLeftSidebar from './ChatLeftSidebar';
import ChatGroup from './ChatGroup';
import Groups from './Groups/';
import sideBarMenus from '../../layouts/AuthLayout/sideBarMenus';
import { connect } from 'react-redux';

function Index({ activeTab }) {
  const [group, setGroup] = useState(null);

  return (
    <>
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
  return { activeTab };
};

export default connect(mapStateToProps, null)(Index);
