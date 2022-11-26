import React, { Fragment } from 'react';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import restClient from '../../providers/rest';
import { GET_ONE } from 'react-admin'; // eslint-disable-line import/no-unresolved;

class CalendarView extends React.Component {
  state = {
    events: [],
    currentEvent: { data: { value: '', type: '', created_by: '' } },
    dialogOpened: false
  };

  componentDidMount = () => {
    const { ids, data } = this.props;

    const result = [];

    ids.forEach(id => {
      restClient(GET_ONE, 'recommendation_types', { id: data[id].type }).then(type => {
        restClient(GET_ONE, 'users', { id: data[id].created_by }).then(user => {
          result.push({
            title: `${data[id].value.substring(0, 30)} ${data[id].value.length > 30 ? '...' : ''}`,
            start: moment(data[id].at),
            end: moment(data[id].ends),
            allDay: true,
            data: {
              ...data[id],
              type: type.data.name,
              created_by: user.data.fullname
            }
          });

          this.setState({
            events: [...result]
          });
        });
      });
    });
  };

  onEventClick = (event) => {
    this.setState({
      currentEvent: event,
      dialogOpened: true
    });
  };

  onDialogCloseClick = () => {
    this.setState({ dialogOpened: false });
  };

  render = () => {
    const { currentEvent: { data }, dialogOpened } = this.state;
    const { translate } = this.props;

    return (
      <Fragment>
        <Card>
          <CardContent>
            <Typography variant="subheading" style={{ marginBottom: '20px' }}>{translate('resources.recommendations.calendar_subtitle')}</Typography>
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
              eventClick={this.onEventClick}
            />
          </CardContent>
        </Card>
        <Dialog open={dialogOpened}>
          <DialogTitle>{translate('resources.recommendations.details')}</DialogTitle>
          <DialogContent>
            <FormControl fullWidth style={{ margin: '14px 0' }}>
              <InputLabel>{translate('resources.recommendations.fields.type')}</InputLabel>
              <Input value={data && data.type} readOnly disableUnderline />
            </FormControl>
            <FormControl fullWidth style={{ margin: '14px 0' }}>
              <InputLabel>{translate('resources.recommendations.fields.value')}</InputLabel>
              <Input value={data && data.value} readOnly multiline disableUnderline />
            </FormControl>
            <FormControl fullWidth style={{ margin: '14px 0' }}>
              <InputLabel>{translate('resources.recommendations.fields.created_by')}</InputLabel>
              <Input value={data && data.created_by} readOnly disableUnderline />
            </FormControl>
            <FormControl fullWidth style={{ margin: '14px 0' }}>
              <InputLabel>{translate('resources.recommendations.fields.at')}</InputLabel>
              <Input value={data && data.at && moment(data.at).format('DD-MM-YYYY')} readOnly disableUnderline />
            </FormControl>
            <FormControl fullWidth style={{ margin: '14px 0' }}>
              <InputLabel>{translate('resources.recommendations.fields.ends')}</InputLabel>
              <Input value={data && data.ends && moment(data.ends).format('DD-MM-YYYY')} readOnly disableUnderline />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onDialogCloseClick} color="primary">
              {translate('resources.recommendations.close')}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default CalendarView;
