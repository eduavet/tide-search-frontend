import React, { Component } from 'react';
import { Media } from 'reactstrap';

class Result extends Component {
  render() {
    return (
      <a href={this.props.link}>
        <Media className="col-sm-4 offset-sm-4 results">
          <Media body>
            <Media heading>
              {this.props.heading}
            </Media>
            {this.props.text}
          </Media>
        </Media>
      </a>
    );
  }
}

export default Result;
