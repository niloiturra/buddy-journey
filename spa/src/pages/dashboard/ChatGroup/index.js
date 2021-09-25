import React, { useEffect, useRef } from 'react';
import { Creators } from '../../../redux/chatGroups/duck';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimpleBar from 'simplebar-react';
import GroupHeader from './GroupHeader';
import ChatInput from './ChatInput';
import RenderMessage from './RenderMessage';
import { getTimeForChat } from '../../../helpers/utils';
import airplane_tourism from '../../../assets/images/users/airplane_tourism.svg';

const ChatGroup = ({
  messagesFromGroup,
  group,
  userSidebar,
  groupMessages,
}) => {
  useEffect(() => {
    if (group) {
      messagesFromGroup(group);
    }
  }, [group]);

  const ref = useRef();
  const scrolltoBottom = () => {
    if (ref.current.el) {
      ref.current.getScrollElement().scrollTop =
        ref.current.getScrollElement().scrollHeight;
    }
  };

  return (
    <>
      <div className="user-chat w-100">
        <div className="d-lg-flex">
          <div className={userSidebar ? 'w-70' : 'w-100'}>
            <GroupHeader />

            <SimpleBar
              style={{ maxHeight: '100%' }}
              ref={ref}
              className="chat-conversation p-3 p-lg-4"
              id="messages"
            >
              <ul className="list-unstyled mb-0">
                {groupMessages.map((chat, key) => (
                  <li key={key} className={chat.isMine ? 'right' : ''}>
                    <div className="conversation-list">
                      <div className="chat-avatar">
                        <img
                          src={chat.user.picture || airplane_tourism}
                          alt="chatvia"
                        />
                      </div>

                      <div className="user-chat-content">
                        <div className="ctext-wrap">
                          <div className="ctext-wrap-content">
                            {chat.message && (
                              <RenderMessage message={chat.message} />
                            )}
                            <p className="chat-time mb-0">
                              <i className="ri-time-line align-middle"></i>{' '}
                              <span className="align-middle">
                                {getTimeForChat(chat.createdAt)}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="conversation-name">
                          {chat.user.name}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </SimpleBar>

            <ChatInput scrolltoBottom={scrolltoBottom} />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { groupMessages } = state.ChatGroups;
  const { userSidebar } = state.Layout;

  return { groupMessages, userSidebar };
};

const { messagesFromGroup } = Creators;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ messagesFromGroup }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatGroup);
