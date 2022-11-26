import moment from 'moment';
import 'moment/locale/pl';

import {GET_LIST} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import restClient from '../providers/rest';

export default ({userId}) => {
  const params = {
    filter: {
      created: {
        after: moment().startOf('day').format(), before: moment().endOf('day').format()
      }
    },
    pagination: {
      page: 1,
      perPage: 3
    },
    sort: {
      field: 'created',
      order: 'desc'
    }
  };

  if ('undefined' !== userId) {
    params.filter.user = userId;
  }

  return restClient(GET_LIST, 'measurements', params);
}
