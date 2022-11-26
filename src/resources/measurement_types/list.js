import React from 'react';
import {
  translate,
  List,
  Datagrid,
  TextField,
  EditButton
} from 'react-admin'; // eslint-disable-line import/no-unresolved;

export default translate(({...props}) => (
  <List {...props} bulkActions={false}>
    <Datagrid>
      <TextField source="name"/>
      <TextField source="unit"/>

      <EditButton basePath="/measurement_types"/>
    </Datagrid>
  </List>
));
