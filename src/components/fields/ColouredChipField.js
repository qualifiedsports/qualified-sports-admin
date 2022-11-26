import React from 'react';
import Chip from '@material-ui/core/Chip';

export const ColouredChipField = ({source, record = {}, colorList = {}, renderLabel}) => <Chip
  color={colorList[record[source]]}
  label={renderLabel(record[source])}
/>;