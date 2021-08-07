import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { Creators } from '../../redux/auth/duck';

const Logout = (props) => {
  useEffect(() => {
    props.logout(props.history);
  }, [props]);

  return <React.Fragment></React.Fragment>;
};

const mapDispatchToProps = (dispatch) => bindActionCreators(Creators, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(Logout));
