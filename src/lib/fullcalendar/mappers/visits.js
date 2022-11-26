import moment from 'moment';

export const mapVisit = (visit, user) => ({
  title: (translate) => `${translate('resources.visits.visit')} - ${user.fullname}`,
  date: moment(visit.visit_date).format(),
  end: moment(visit.visit_date).add(60, 'minutes')
});
