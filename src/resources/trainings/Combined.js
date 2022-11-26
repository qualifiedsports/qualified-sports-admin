import React, {
  useEffect,
  useState
} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import plLocale from '@fullcalendar/core/locales/pl';

import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import restClient from '../../providers/rest';
import {GET_MANY, useTranslate} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import {Dialog} from './calendar/Dialog';
import {formatAsDate} from "../../providers/date";
import {TrainingLineChart} from "./chart/TrainingLineChart";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  root: {
    background: '#303030' // uhh ugly
  },
  calendar: {

  },
  chart: {
    marginTop: '1em'
  }
});

export const Combined = (props) => {
  const [trainings, setTrainings] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(undefined);
  const [dialogOpened, setDialogOpened] = useState(false);
  const translate = useTranslate();

  useEffect(() => {
    const {ids, data} = props;

    if (!ids.length) {
      return;
    }

    const get = async () => {
      const users = await restClient(GET_MANY, 'users', {ids: [...new Set(ids.map(id => data[id].created_by))]});

      return ids.map(id => {
        const training = data[id];
        const user = users.data.find(user => user.id === training.created_by);

        return {
          id: training.id,
          title: `${training.value.substring(0, 30)} ${training.value.length > 30 ? '...' : ''}`,
          start: training.at,
          end: training.ends,
          allDay: true,
          backgroundColor: translate(`resources.trainings.colors.background.status.${training.status}`),
          textColor: translate(`resources.trainings.colors.text.status.${training.status}`),
          data: {
            ...training,
            created_by: user ? user.fullname : '',
          }
        };
      })
    };

    get().then(setTrainings);
  }, [props.ids.length]);

  const onEventClick = ({event: {id}}) => {
    setCurrentEvent(trainings.find(training => training.id === parseInt(id, 0)));
    setDialogOpened(true);
  };

  const onDialogCloseClick = () => {
    setDialogOpened(false);
  };

  const onDatesRender = ({view: {activeStart, activeEnd}}) => {
    const before = formatAsDate(activeEnd);
    const after = formatAsDate(activeStart);

    if (props.filterValues.at && props.filterValues.at.after === after && props.filterValues.at.before === before) {
      return;
    }

    const filters = {at: {before, after}};

    props.setFilters(filters);
  };

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Card>
        <CardContent>
          <Typography variant="subheading" style={{marginBottom: '20px'}}>
            {translate('resources.trainings.calendar_subtitle')}
          </Typography>
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            events={trainings}
            locale={plLocale}
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'month,basicWeek,basicDay'
            }}
            navLinks={true}
            eventClick={onEventClick}
            datesRender={onDatesRender}
          />
        </CardContent>
      </Card>
      <Box className={classes.chart}>
        <Card >
          <CardContent>
            {props.filterValues.at ? <TrainingLineChart
              from={props.filterValues.at.after}
              to={props.filterValues.at.before}
              trainings={trainings.map(training => training.data)}
            /> : null}
          </CardContent>
        </Card>
      </Box>
      <Dialog training={currentEvent} dialogOpened={dialogOpened} onDialogCloseClick={onDialogCloseClick}/>
    </Box>
  );
};