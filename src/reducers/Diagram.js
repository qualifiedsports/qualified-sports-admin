import moment from 'moment';
import 'moment/locale/pl';

import {GET_LIST} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import restClient from '../providers/rest';

export default ({userId = null, resource, typeId}) => {
  let dateField;

  switch (resource) {
    case 'measurements':
      dateField = {created: {after: moment().subtract(7, 'days').startOf('day').format(), before: moment().endOf('day').format()}};
      break;
    case 'recommendations':
      dateField = {at: {after: moment().subtract(7, 'days').startOf('day').format(), before: moment().endOf('day').format()}};
      break;
    default:
      break;
  }

  let params = {filter: {...{type: typeId}, ...dateField}, pagination: {page: 1, perPage: 100}, sort: {field: 'id', order: 'asc'}};

  if (null !== userId) {
    params.filter.user = userId;
  }

  return restClient(GET_LIST, resource, params);
}