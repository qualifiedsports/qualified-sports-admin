import moment from 'moment';
import 'moment/locale/pl';
import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import restClient from '../providers/rest';
import {GET_LIST} from 'react-admin'; // eslint-disable-line import/no-unresolved;

const styles = {
  fullCalendar: {padding: '20px'}
};

export default class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {events: []};
    this.measurement_types = undefined;
  }

  mapRecommendationToEvent(recommendation) {
    let measurement_type = this.measurement_types.filter(measurement_type => recommendation.type === measurement_type.id)[0];
    const title = `Zalecenie dla ${measurement_type.name} wartość ${recommendation.value} ${measurement_type.unit}`;
    const at = moment(recommendation.at);

    if (!recommendation.recurring_day_of_week.length) {
      return {
        title: title,
        start: at.format(),
        end: null !== recommendation.ends ? moment(recommendation.ends).format() : null,
        allDay: recommendation.whole_day
      }
    }

    return {
      title: title,
      start: !recommendation.whole_day ? at.format('LT') : null,
      end: !recommendation.whole_day && null !== recommendation.ends ? moment(recommendation.ends).format('LT') : null,
      dow: recommendation.recurring_day_of_week,
      allDay: recommendation.whole_day,
      ranges: recommendation.recurring_from ? [{
          start: moment(recommendation.recurring_from).format('MM-DD-YYYY'),
          end: recommendation.recurring_to
            ? moment(recommendation.recurring_to).format('MM-DD-YYYY')
            : null
        }] : []
    };
  }

  componentDidMount() {
    const parent = this;
    const params = {pagination: {page: 1, perPage: 1000}, sort: {field: 'id', order: 'desc'}};

    restClient(GET_LIST, 'measurement_types', params).then(function (data) {
        parent.measurement_types = data.data;

      restClient(GET_LIST, 'recommendations', params).then(function (data) {
        parent.setState({events: data.data.map(recommendation => parent.mapRecommendationToEvent(recommendation))});
      });
    });
  }

  render() {
    return (
      <Card style={styles.fullCalendar}>
        <CardContent>
          <FullCalendar
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'month,basicWeek,basicDay'
            }}
            defaultDate={new Date()}
            navLinks={true}
            events={this.state.events}
            locale="pl"
            buttonText={{
              today: 'dzisiaj',
              month: 'miesiąc',
              week: 'tydzień',
              day: 'dzień',
              list: 'lista'
            }}
            timeFormat="H:mm"
          />
        </CardContent>
      </Card>
    );
  }
}