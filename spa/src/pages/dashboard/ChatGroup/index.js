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
import UserHead from './UserHead';
import ImageList from './ImageList';
import ChatInput from './ChatInput';
import FileList from './FileList';

//Import Images
import avatar4 from '../../../assets/images/users/avatar-4.jpg';
import avatar1 from '../../../assets/images/users/avatar-1.jpg';

function ChatGroup({ onConnect }) {
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);

  useEffect(() => {
    onConnect();
  }, [onConnect]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log('Connected!');

          connection.on('ReceiveMessage', (message) => {
            console.log('Recebendo mensagens');
            const updatedChat = [...latestChat.current];
            updatedChat.push(message);

            setChat(updatedChat);
          });
        })
        .catch((e) => console.log('Connection failed: ', e));
    }
  }, [connection]);

  const sendMessage = async (user, message) => {
    const chatMessage = {
      user: user,
      message: message,
    };

    try {
      await fetch('https://localhost:5001/chat/messages', {
        method: 'POST',
        body: JSON.stringify(chatMessage),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      console.log('Sending message failed.', e);
    }
  };

  const ref = useRef();

  const [modal, setModal] = useState(false);

  //demo conversation messages
  //userType must be required
  //   const [allUsers] = useState(props.recentChatList);
  //   const [chatMessages, setchatMessages] = useState(
  //     props.recentChatList[props.active_user].messages
  //   );

  //   useEffect(() => {
  //     setchatMessages(props.recentChatList[props.active_user].messages);
  //     ref.current.recalculate();
  //     if (ref.current.el) {
  //       ref.current.getScrollElement().scrollTop =
  //         ref.current.getScrollElement().scrollHeight;
  //     }
  //   }, [props.active_user, props.recentChatList]);

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

  return (
    <React.Fragment>
      <div>OI</div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { userSidebar } = state.Layout;
  return { userSidebar };
};

const { onConnect } = Creators;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ onConnect }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatGroup);
