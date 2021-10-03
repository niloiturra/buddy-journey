import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as LayoutCreators } from '../../../redux/layout/duck';
import airplane_tourism from '../../../assets/images/users/airplane_tourism.svg';

const GroupHeader = ({ groupSelected, openGroupSideBar }) => {
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
          <Col sm={6} xs={4}>
            <ul className="list-inline user-chat-nav text-end mb-0">
              <li className="list-inline-item d-none d-lg-inline-block">
                <Button
                  type="button"
                  color="none"
                  onClick={(e) => {
                    e.preventDefault();
                    openGroupSideBar();
                  }}
                  className="nav-btn user-profile-show"
                >
                  <i className="ri-more-2-fill"></i>
                </Button>
              </li>
            </ul>
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

const { openGroupSideBar } = LayoutCreators;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ openGroupSideBar }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GroupHeader);
