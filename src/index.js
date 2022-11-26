import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider, addLocaleData} from 'react-intl';
import pl from 'react-intl/locale-data/pl';
import './index.scss';
import App from './App';
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
// import registerServiceWorker from './registerServiceWorker';

import moment from "moment";
import "moment/locale/pl";

moment.locale("pl");

addLocaleData([...pl]);

ReactDOM.render(
  <IntlProvider locale="pl">
    <MuiPickersUtilsProvider utils={MomentUtils} locale={"pl"}>
      <App/>
    </MuiPickersUtilsProvider>
  </IntlProvider>,
  document.getElementById('root')
);
// registerServiceWorker();
