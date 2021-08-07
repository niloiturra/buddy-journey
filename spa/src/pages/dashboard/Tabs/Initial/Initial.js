import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators } from '../../../../redux/tour/duck';
import { Button } from 'reactstrap';
import logo from '../../../../assets/images/logo.svg';
import './initial-style.css';

const Initial = (props) => {
  return (
    <div className="d-flex flex-column max-height-vh centralized">
      <div className="align-self-center">
        <h4 className="text-primary">Eai... Vamos viajar?</h4>
      </div>

      <div className="align-self-center">
        <img src={logo} width="100" alt="buddy journey logo" />
      </div>

      <div className="p-4 align-self-center">
        <Button
          color="primary"
          block
          className="waves-effect waves-light"
          type="submit"
          onClick={() => props.openTour()}
        >
          Iniciar o Tour!
        </Button>
      </div>
    </div>
  );
};

const { openTour } = Creators;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ openTour }, dispatch);

export default connect(null, mapDispatchToProps)(Initial);
