import React from 'react';
import { Nav, NavItem, NavLink, UncontrolledTooltip } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { setActiveTab } from '../../redux/actions';
import logo from '../../assets/images/logo.svg';

function LeftSidebarMenu(props) {
  const toggleTab = (tab) => {
    props.setActiveTab(tab);
  };

  const activeTab = props.activeTab;

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
                className={classnames({ active: activeTab === 'home' })}
                onClick={() => {
                  toggleTab('home');
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
            <UncontrolledTooltip target="profile" placement="top">
              Perfil
            </UncontrolledTooltip>

            <NavItem id="profile">
              <NavLink
                id="pills-user-tab"
                className={classnames({ active: activeTab === 'profile' })}
                onClick={() => {
                  toggleTab('profile');
                }}
              >
                <i className="ri-account-circle-line"></i>
              </NavLink>
            </NavItem>
            <UncontrolledTooltip target="profile" placement="top">
              Perfil
            </UncontrolledTooltip>

            <NavItem id="Chats">
              <NavLink
                id="pills-chat-tab"
                className={classnames({ active: activeTab === 'chat' })}
                onClick={() => {
                  toggleTab('chat');
                }}
              >
                <i className="ri-message-3-line"></i>
              </NavLink>
            </NavItem>
            <UncontrolledTooltip target="Chats" placement="top">
              Chats
            </UncontrolledTooltip>

            <NavItem id="Groups">
              <NavLink
                id="pills-groups-tab"
                className={classnames({ active: activeTab === 'group' })}
                onClick={() => {
                  toggleTab('group');
                }}
              >
                <i className="ri-group-line"></i>
              </NavLink>
            </NavItem>
            <UncontrolledTooltip target="Groups" placement="top">
              Groups
            </UncontrolledTooltip>

            <NavItem id="Contacts">
              <NavLink
                id="pills-contacts-tab"
                className={classnames({ active: activeTab === 'contacts' })}
                onClick={() => {
                  toggleTab('contacts');
                }}
              >
                <i className="ri-contacts-line"></i>
              </NavLink>
            </NavItem>
            <UncontrolledTooltip target="Contacts" placement="top">
              Contacts
            </UncontrolledTooltip>
          </Nav>
        </div>

        <div className="flex-lg-column d-none d-lg-block">
          <Nav className="side-menu-nav justify-content-center">
            <NavItem>
              <NavLink
                id="light-dark"
                target="_blank"
                href="//chatvia-light.react.themesbrand.com/"
              >
                <i className="ri-sun-line theme-mode-icon"></i>
              </NavLink>
              <UncontrolledTooltip target="light-dark" placement="top">
                Dark / Light Mode
              </UncontrolledTooltip>
            </NavItem>

            <NavItem id="logout">
              <NavLink
                id="pills-contacts-tab"
                className={classnames({ active: activeTab === 'logout' })}
                onClick={() => {
                  toggleTab('logout');
                }}
              >
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

const mapStatetoProps = (state) => {
  return {
    ...state.Layout,
  };
};

export default connect(mapStatetoProps, {
  setActiveTab,
})(LeftSidebarMenu);
