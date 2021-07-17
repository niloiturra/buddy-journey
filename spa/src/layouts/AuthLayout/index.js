import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import LeftSidebarMenu from './LeftSidebarMenu';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.capitalizeFirstLetterAndNormalize.bind(this);
  }

  capitalizeFirstLetterAndNormalize = (string) => {
    const capitalized = string.charAt(1).toUpperCase() + string.slice(2);
    const stringNormalized = capitalized.split('/')[0];
    return stringNormalized.replace('-', ' ');
  };

  componentDidMount() {
    let currentage = this.capitalizeFirstLetterAndNormalize(
      this.props.location.pathname
    );

    document.title = currentage + ' | Buddy Journey';
  }

  render() {
    return (
      <>
        <div className="layout-wrapper d-lg-flex">
          <LeftSidebarMenu />
          {this.props.children}
        </div>
      </>
    );
  }
}

export default withRouter(Index);
