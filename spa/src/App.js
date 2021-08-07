import React from 'react';
import Routes from './routes/';
import ReduxToastr from 'react-redux-toastr';
import Tour from 'reactour';
import { bindActionCreators } from 'redux';
import { Creators } from './redux/tour/duck';
import { tourConfig } from './helpers/tourUtils';
import { connect } from 'react-redux';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './assets/scss/themes.scss';

const App = (props) => {
  return (
    <>
      <Routes />
      <Tour
        steps={tourConfig}
        isOpen={props.isOpen}
        onRequestClose={() => props.closeTour()}
      />
      <ReduxToastr
        newestOnTop={false}
        position="bottom-right"
        closeOnToastrClick
        preventDuplicates
      />
    </>
  );
};

const mapStateToProps = (state) => {
  const { isOpen } = state.Tour;
  return { isOpen };
};

const { closeTour } = Creators;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ closeTour }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
