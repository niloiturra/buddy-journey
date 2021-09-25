import { useEffect } from 'react';
import { Creators as ChatGroupsCreators } from '../../../redux/chatGroups/duck';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const LobbyConnection = ({
  connection,
  onConnect,
  user,
  receiveMessage,
  onDisconnect,
}) => {
  useEffect(() => {
    onConnect();
  }, [onConnect]);

  useEffect(() => {
    if (connection.on) {
      connection.on('ReceiveMessage', (message) => {
        receiveMessage(message, user);
      });

      connection.onclose((e) => {
        onDisconnect();
      });
    }
  }, [connection]);

  return <></>;
};

const mapStateToProps = (state) => {
  const { connection } = state.ChatGroups;
  const { user } = state.Auth;
  return { connection, user };
};

const { receiveMessage, onDisconnect, onConnect } = ChatGroupsCreators;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ receiveMessage, onDisconnect, onConnect }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LobbyConnection);
