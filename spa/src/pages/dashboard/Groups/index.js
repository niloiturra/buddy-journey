import React from 'react';
import { connect } from 'react-redux';
import GroupsMenu from './menu';
import GroupsSearch from './search';

function Groups({ searchMode }) {
  return (
    <>
      {!searchMode && <GroupsMenu></GroupsMenu>}
      {searchMode && <GroupsSearch></GroupsSearch>}
    </>
  );
}

const mapStateToProps = (state) => {
  const { searchMode } = state.Groups;
  return { searchMode };
};

export default connect(mapStateToProps, null)(Groups);
