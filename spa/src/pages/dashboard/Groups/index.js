import React from 'react';
import { connect } from 'react-redux';
import GroupsForm from './form';
import GroupsMenu from './menu';
import GroupsSearch from './search';

function Groups({ searchMode, createMode }) {
  return (
    <>
      {!searchMode && !createMode && <GroupsMenu></GroupsMenu>}
      {searchMode && <GroupsSearch></GroupsSearch>}
      {createMode && <GroupsForm></GroupsForm>}
    </>
  );
}

const mapStateToProps = (state) => {
  const { searchMode, createMode } = state.Groups;
  return { searchMode, createMode };
};

export default connect(mapStateToProps, null)(Groups);
