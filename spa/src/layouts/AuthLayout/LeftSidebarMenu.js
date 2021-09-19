import React from 'react';
import { Nav, NavItem, NavLink, UncontrolledTooltip } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators } from '../../redux/layout/duck';
import sideBarMenus from '../AuthLayout/sideBarMenus';
import logo from '../../assets/images/logo.svg';

function LeftSidebarMenu({ setActiveTab, activeTab }) {
  return (
    <>
      <div className="side-menu flex-lg-column me-lg-1">
        <div className="flex-lg-column my-auto">
          <Nav
            pills
            className="side-menu-nav justify-content-center"
            role="tablist"
          >
            <NavItem id="home">
              <NavLink
                id="pills-home-tab"
                className={classnames({
                  active: activeTab === sideBarMenus.HOME,
                })}
                onClick={() => {
                  setActiveTab(sideBarMenus.HOME);
                }}
              >
                <img
                  data-tut="profile"
                  src={logo}
                  alt=""
                  className="profile-user rounded-circle"
                />
              </NavLink>
            </NavItem>

            <NavItem id="profile">
              <NavLink
                id="pills-user-tab"
                className={classnames({
                  active: activeTab === sideBarMenus.PROFILE,
                })}
                onClick={() => {
                  setActiveTab(sideBarMenus.PROFILE);
                }}
              >
                <i className="ri-account-circle-line"></i>
              </NavLink>
            </NavItem>
            <UncontrolledTooltip target="profile" placement="top">
              Perfil
            </UncontrolledTooltip>

            <NavItem id="Groups">
              <NavLink
                id="pills-groups-tab"
                className={classnames({
                  active: activeTab === sideBarMenus.GROUP,
                })}
                onClick={() => {
                  setActiveTab(sideBarMenus.GROUP);
                }}
              >
                <i className="ri-map-2-fill"></i>
              </NavLink>
            </NavItem>
            <UncontrolledTooltip target="Groups" placement="top">
              Groups
            </UncontrolledTooltip>

            <NavItem id="Chats">
              <NavLink
                id="pills-chat-tab"
                className={classnames({
                  active: activeTab === sideBarMenus.CHATS,
                })}
                onClick={() => {
                  setActiveTab(sideBarMenus.CHATS);
                }}
              >
                <i className="ri-message-3-line"></i>
              </NavLink>
            </NavItem>
            <UncontrolledTooltip target="Chats" placement="top">
              Chats
            </UncontrolledTooltip>
          </Nav>
        </div>

        <div className="flex-lg-column d-none d-lg-block">
          <Nav className="side-menu-nav justify-content-center">
            <NavItem id="logout">
              <NavLink href="/logout" id="pills-contacts-tab">
                <i className="ri-logout-circle-r-line"></i>
              </NavLink>
            </NavItem>
            <UncontrolledTooltip target="logout" placement="right">
              Sair
            </UncontrolledTooltip>
          </Nav>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { activeTab } = state.Layout;
  return { activeTab };
};

const { setActiveTab } = Creators;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setActiveTab }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebarMenu);
