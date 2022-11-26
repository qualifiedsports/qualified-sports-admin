import React, {Component} from 'react';
import {GET_LIST} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import restClient from '../providers/rest';
import Diagram from './diagrams/Diagram';

export default class Diagrams extends Component {
  constructor(props) {
    super(props);

    this.style = props.style;
    this.userId = props.userId;
    this.state = {measurement_types: []};
  }

  componentDidMount() {
    const parent = this;
    const params = {pagination: {page: 1, perPage: 5}, sort: {field: 'id', order: 'asc'}};

    restClient(GET_LIST, 'measurement_types', params).then(function (data) {
      parent.setState({measurement_types: data.data});
    });
  }

  render() {
    return (
      <div style={this.style}>
        {this.state.measurement_types.map(measurement_type => <Diagram key={measurement_type.id} {...measurement_type} userId={this.userId}/>)}
      </div>
    );
  }
}