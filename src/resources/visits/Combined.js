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
import {Chart} from "./chart/Chart";
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
  const [visits, setVisits] = useState([]);
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
        const visit = data[id];
        const user = users.data.find(user => user.id === visit.created_by);

        return {
          id: visit.id,
          title: translate('resources.visits.calendar_event_title', {user: (user ? user.fullname : '')}),
          start: visit.visit_date,
          end: visit.visit_date,
          backgroundColor: translate(`resources.visits.colors.background.status.${visit.status}`),
          textColor: translate(`resources.visits.colors.text.status.${visit.status}`),
          data: {
            ...visit,
            created_by: user ? user.fullname : '',
          }
        };
      })
    };

    get().then(setVisits);
  }, [props.ids.length]);

  const onEventClick = ({event: {id}}) => {
    setCurrentEvent(visits.find(visit => visit.id === parseInt(id, 0)));
    setDialogOpened(true);
  };

  const onDialogCloseClick = () => {
    setDialogOpened(false);
  };

  const onDatesRender = ({view: {activeStart, activeEnd}}) => {
    const before = formatAsDate(activeEnd);
    const after = formatAsDate(activeStart);

    if (props.filterValues.visitDate && props.filterValues.visitDate.after === after && props.filterValues.visitDate.before === before) {
      return;
    }

    const filters = {visitDate: {before, after}};

    props.setFilters(filters);
  };

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Card>
        <CardContent>
          <Typography variant="subheading" style={{marginBottom: '20px'}}>
            {translate('resources.visits.calendar_subtitle')}
          </Typography>
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            events={visits}
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
            <Chart visits={visits.map(visit => visit.data)}/>
          </CardContent>
        </Card>
      </Box>
      <Dialog visit={currentEvent} dialogOpened={dialogOpened} onDialogCloseClick={onDialogCloseClick}/>
    </Box>
  );
};