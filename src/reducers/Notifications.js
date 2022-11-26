import moment from 'moment';
import 'moment/locale/pl';

import {GET_LIST} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import restClient from '../providers/rest';

export default () => {
    const params = {
        filter: {
            created: {
                after: moment().startOf('day').utc().format(), before: moment().endOf('day').utc().format(),
            },
        },
        pagination: {
            page: 1,
            perPage: 3,
        },
        sort: {
            field: 'created',
            order: 'desc',
        },
    };
    
    return restClient(GET_LIST, 'notifications', params);
}
