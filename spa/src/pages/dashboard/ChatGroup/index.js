import React, { useState, useEffect, useRef } from 'react';
import { Creators } from '../../../redux/chatGroups/duck';
import { bindActionCreators } from 'redux';
import {
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  CardBody,
  Button,
  ModalFooter,
} from 'reactstrap';
import { connect } from 'react-redux';
import SimpleBar from 'simplebar-react';
import { withRouter } from 'react-router-dom';
//Import Components
import UserProfileSidebar from '../../../components/UserProfileSidebar';
import SelectContact from '../../../components/SelectContact';
import GroupHeader from './GroupHeader';
import ImageList from './ImageList';
import ChatInput from './ChatInput';
import FileList from './FileList';

//Import Images
import avatar4 from '../../../assets/images/users/avatar-4.jpg';
import avatar1 from '../../../assets/images/users/avatar-1.jpg';
import { groupsApi } from '../../../redux/chats/api';

function ChatGroup({
  onConnect,
  connection,
  receiveMessage,
  messagesFromGroup,
  group,
  userSidebar,
  groupMessages,
}) {
  useEffect(() => {
    onConnect();
  }, [onConnect]);

  useEffect(() => {
    if (connection.on) {
      connection.on('ReceiveMessage', (message) => {
        receiveMessage(message);
      });
    }
  }, [connection, receiveMessage]);

  useEffect(() => {
    if (group) {
      messagesFromGroup(group);
    }
  }, [group]);

  // const sendMessage = async (user, message) => {
  //   const chatMessage = {
  //     user: user,
  //     message: message,
  //   };

  //   try {
  //     await fetch('https://localhost:5001/chat/messages', {
  //       method: 'POST',
  //       body: JSON.stringify(chatMessage),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //   } catch (e) {
  //     console.log('Sending message failed.', e);
  //   }
  // };

  const ref = useRef();

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const addMessage = (message, type) => {
    var messageObj = null;

    let d = new Date();
    var n = d.getSeconds();

    //matches the message type is text, file or image, and create object according to it
    // switch (type) {
    //   case 'textMessage':
    //     messageObj = {
    //       id: chatMessages.length + 1,
    //       message: message,
    //       time: '00:' + n,
    //       userType: 'sender',
    //       image: avatar4,
    //       isFileMessage: false,
    //       isImageMessage: false,
    //     };
    //     break;

    //   case 'fileMessage':
    //     messageObj = {
    //       id: chatMessages.length + 1,
    //       message: 'file',
    //       fileMessage: message.name,
    //       size: message.size,
    //       time: '00:' + n,
    //       userType: 'sender',
    //       image: avatar4,
    //       isFileMessage: true,
    //       isImageMessage: false,
    //     };
    //     break;

    //   case 'imageMessage':
    //     var imageMessage = [{ image: message }];

    //     messageObj = {
    //       id: chatMessages.length + 1,
    //       message: 'image',
    //       imageMessage: imageMessage,
    //       size: message.size,
    //       time: '00:' + n,
    //       userType: 'sender',
    //       image: avatar4,
    //       isImageMessage: true,
    //       isFileMessage: false,
    //     };
    //     break;

    //   default:
    //     break;
    // }

    //add message object to chat
    // setchatMessages([...chatMessages, messageObj]);

    // let copyallUsers = [...allUsers];
    // copyallUsers[props.active_user].messages = [...chatMessages, messageObj];
    // copyallUsers[props.active_user].isTyping = false;
    // props.setFullUser(copyallUsers);

    scrolltoBottom();
  };

  function scrolltoBottom() {
    if (ref.current.el) {
      ref.current.getScrollElement().scrollTop =
        ref.current.getScrollElement().scrollHeight;
    }
  }

  const deleteMessage = (id) => {
    // let conversation = chatMessages;
    // var filtered = conversation.filter(function (item) {
    //   return item.id !== id;
    // });
    // setchatMessages(filtered);
  };

  const getTimeForChat = (date) => {
    const dateTime = new Date(date);
    return `${dateTime.getHours()}:${dateTime.getMinutes()}`;
  };

  return (
    <React.Fragment>
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
                        <img src={chat.user.picture} alt="chatvia" />
                      </div>

                      <div className="user-chat-content">
                        <div className="ctext-wrap">
                          <div className="ctext-wrap-content">
                            {chat.message && (
                              <p className="mb-0">{chat.message}</p>
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

            <ChatInput onaddMessage={addMessage} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { userSidebar } = state.Layout;
  const { connection, groupMessages } = state.ChatGroups;
  return { userSidebar, connection, groupMessages };
};

const { onConnect, receiveMessage, messagesFromGroup } = Creators;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { onConnect, receiveMessage, messagesFromGroup },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ChatGroup);
