import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators } from '../../../../redux/chats/duck';
import SimpleBar from 'simplebar-react';
import sideBarMenus from '../../../../layouts/AuthLayout/sideBarMenus';
import { Link } from 'react-router-dom';
import airplane_tourism from '../../../../assets/images/users/airplane_tourism.svg';

function Chats({ groups, activeTab, getGroupsByUser }) {
  useEffect(() => {
    if (activeTab === sideBarMenus.CHATS) {
      getGroupsByUser();
    }
  }, [getGroupsByUser, activeTab]);

  return (
    <>
      <div>
        <div className="px-4 pt-4">
          <h4 className="mb-4">Seus grupos</h4>
        </div>

        <div className="px-2">
          <h5 className="mb-3 px-3 font-size-16">Recentes</h5>
          <SimpleBar
            style={{ maxHeight: '100%' }}
            className="chat-message-list"
          >
            <ul
              className="list-unstyled chat-list chat-user-list"
              id="chat-list"
            >
              {groups.map((chatGroup, key) => (
                <li key={key} id={'conversation-group' + key}>
                  <Link to="#" onClick={(e) => {}}>
                    <div className="d-flex">
                      <div
                        className={'chat-user-img align-self-center me-3 ms-0'}
                      >
                        <img
                          src={chatGroup.picture || airplane_tourism}
                          className="rounded-circle avatar-xs"
                          alt="chatvia"
                        />
                      </div>

                      <div className="flex-1 overflow-hidden">
                        <h5 className="text-truncate font-size-15 mb-1">
                          {chatGroup.name}
                        </h5>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </SimpleBar>
        </div>
      </div>
    </>
  );
}

const { getGroupsByUser } = Creators;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getGroupsByUser }, dispatch);

const mapStateToProps = (state) => {
  const { groups } = state.Chats;
  const { activeTab } = state.Layout;
  return { groups, activeTab };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chats);
