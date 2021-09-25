import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Row,
  Col,
  UncontrolledTooltip,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  Form,
} from 'reactstrap';
import { Picker } from 'emoji-mart';
import { Creators } from '../../../redux/chatGroups/duck';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'emoji-mart/css/emoji-mart.css';

function ChatInput({ user, groupSelected, dispatchMessage, scrolltoBottom }) {
  const [textMessage, setTextMessage] = useState('');
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    scrolltoBottom();
  }, [scrolltoBottom]);

  const toggle = () => setisOpen(!isOpen);

  const handleChange = (e) => {
    setTextMessage(e.target.value);
  };

  const addEmoji = (e) => {
    let emoji = e.native;
    setTextMessage(textMessage + emoji);
  };

  const handleKeyDownForm = (e) => {
    if (e.key === 'Enter') {
      onSubmitForm(e);
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!groupSelected) {
      return;
    }

    const userNameMember = groupSelected.members.find(
      (x) => x.email === user.userToken.email
    );
    const userNameAdmin =
      groupSelected.administrator.email === user.userToken.email
        ? groupSelected.administrator
        : null;

    const messagesValue = {
      groupName: groupSelected.id,
      message: textMessage,
      name: userNameAdmin ? userNameAdmin.name : userNameMember.name,
      picture: userNameAdmin ? userNameAdmin.picture : userNameMember.picture,
    };

    dispatchMessage(messagesValue);
    scrolltoBottom();
    setTextMessage('');
  };

  return (
    <>
      <div className="p-2 p-lg-4 border-top mb-0">
        <Form onSubmit={(e) => onSubmitForm(e)}>
          <Row noGutters>
            <Col>
              <div>
                <Input
                  type="text"
                  value={textMessage}
                  onChange={handleChange}
                  className="form-control form-control-lg bg-light border-light"
                  placeholder="Digite aqui..."
                  onKeyDown={(e) => handleKeyDownForm(e)}
                />
              </div>
            </Col>
            <Col xs="auto">
              <div className="chat-input-links">
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <ButtonDropdown
                      className="emoji-dropdown"
                      direction="up"
                      isOpen={isOpen}
                      toggle={toggle}
                    >
                      <DropdownToggle
                        caret
                        id="emoji"
                        color="link"
                        className="text-decoration-none font-size-16 btn-lg waves-effect"
                      >
                        <i className="ri-emotion-happy-line"></i>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <Picker onSelect={addEmoji} />
                      </DropdownMenu>
                    </ButtonDropdown>
                    <UncontrolledTooltip target="emoji" placement="top">
                      Emoji
                    </UncontrolledTooltip>
                  </li>
                  <li className="list-inline-item">
                    <Button
                      type="submit"
                      color="primary"
                      disabled={!textMessage}
                      className="font-size-16 btn-lg chat-send waves-effect waves-light"
                    >
                      <i className="ri-send-plane-2-fill"></i>
                    </Button>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

const { dispatchMessage } = Creators;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ dispatchMessage }, dispatch);

const mapStateToProps = (state) => {
  const { groupSelected } = state.ChatGroups;
  const { user } = state.Auth;

  return { user, groupSelected };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
