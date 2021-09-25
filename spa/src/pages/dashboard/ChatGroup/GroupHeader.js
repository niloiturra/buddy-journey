import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import airplane_tourism from '../../../assets/images/users/airplane_tourism.svg';

const GroupHeader = ({ groupSelected }) => {
  return (
    <>
      <div className="p-3 p-lg-4 border-bottom">
        <Row className="align-items-center">
          <Col sm={6} xs={8}>
            <div className="d-flex align-items-center">
              <div className="d-block d-lg-none me-2 ms-0">
                <Link
                  to="#"
                  className="user-chat-remove text-muted font-size-16 p-2"
                >
                  <i className="ri-arrow-left-s-line"></i>
                </Link>
              </div>

              <div className="me-3 ms-0">
                <img
                  src={groupSelected.picture || airplane_tourism}
                  className="rounded-circle avatar-xs"
                  alt="chatvia"
                />
              </div>

              <div className="flex-1 overflow-hidden">
                <h5 className="font-size-16 mb-0 text-truncate">
                  <Link to="#" className="text-reset user-profile-show">
                    {groupSelected.name ||
                      'Para usar o chat é necessário selecionar um grupo 👀'}
                  </Link>
                </h5>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { groupSelected } = state.ChatGroups;
  return { groupSelected };
};

export default connect(mapStateToProps, null)(GroupHeader);
