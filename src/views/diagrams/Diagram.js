import moment from 'moment';
import 'moment/locale/pl';

import React, {Component} from 'react';
import {translate} from 'react-admin';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

import {intlShape} from 'react-intl';

import DiagramReducer from './../../reducers/Diagram';

import restClient from '../../providers/rest';
import {GET_ONE} from 'react-admin'; // eslint-disable-line import/no-unresolved;

const styles = {
  card: {marginBottom: '2em'}
};

class Diagram extends Component {
  constructor(props) {
    super(props);

    this.id = props.id;
    this.name = props.name;
    this.userId = props.userId;
    this.state = {diagram: [], unit: ''};
  }

  updateDiagramData(data, resource) {
    const {intl} = this.context;
    let {diagram} = this.state;
    const length = data.data.length;
    const divideBy = 1 < length ? length - 1 : 1;

    for (let i = 0; i < length; i++) {
      const date = 'measurements' === resource ? moment(data.data[i].created) : moment(data.data[i].at);

      diagram = diagram.map(item => {
        const values = 'measurements' === resource ? {activity: (item.activity + data.data[i].value) / divideBy} : {recommendation: (item.recommendation + data.data[i].value) / divideBy};

        if (item.date === intl.formatDate(date, {month: 'short', day: 'numeric'})) {
          return {...item, ...values};
        }

        return item;
      });
    }

    this.setState({diagram: diagram});
  }

  updateUnit(measurementType) {
    this.setState({unit: measurementType.unit});
  }

  componentDidMount() {
    const {intl} = this.context;

    let diagram = this.state.diagram;
    for (let i = 0; i < 7; i++) {
      diagram.push({date: intl.formatDate(moment().subtract(i, 'days'), {month: 'short', day: 'numeric'}), activity: 0, recommendation: 0});
    }

    this.setState({diagram: diagram.reverse()});

    restClient(GET_ONE, 'measurement_types', {id: this.id}).then(data => this.updateUnit(data.data));

    DiagramReducer({resource: 'measurements', typeId: this.id, userId: this.userId}).then(data => this.updateDiagramData(data, 'measurements'));
    DiagramReducer({resource: 'recommendations', typeId: this.id, userId: this.userId}).then(data => this.updateDiagramData(data, 'recommendations'));
  }

  render() {
    const {translate} = this.props;

    return (
      <Card style={styles.card}>
        <CardContent>
          <Typography>{this.name}</Typography>
          <ResponsiveContainer height={300} width="90%" className="recharts-responsive-container-center">
            <LineChart data={this.state.diagram}>
              <CartesianGrid/>
              <XAxis dataKey="date"/>
              <YAxis unit={this.state.unit}/>
              <Tooltip />
              <Legend verticalAlign="top" align="left" height={48}/>
              <Line
                type="monotone"
                dataKey="recommendation"
                stroke="#8884d8"
                name={translate('views.diagrams.chart.recommendation')}/>
              <Line
                type="monotone"
                dataKey="activity"
                stroke="#82ca9d"
                name={translate('views.diagrams.chart.activity')}/>
            </LineChart>
          </ResponsiveContainer>

        </CardContent>
      </Card>
    );
  }
}

Diagram.contextTypes = {
  translate: PropTypes.func,
  intl: intlShape.isRequired
};

export default translate(Diagram);
