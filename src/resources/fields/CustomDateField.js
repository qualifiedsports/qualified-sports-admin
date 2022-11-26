import React from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';

const CustomDateField = ({ source, record = {}, format }) => {
  return <Typography>{moment(record[source]).format(format)}</Typography>;
};

CustomDateField.defaultProps = { addLabel: true };

export default CustomDateField;
