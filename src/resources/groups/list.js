import React from 'react';
import {List, Datagrid, TextField, EditButton, ReferenceArrayField, SingleFieldList, ChipField} from 'react-admin'; // eslint-disable-line import/no-unresolved;

export default ({permissions, ...props}) => (
  <List {...props} bulkActions={false}>
    <Datagrid>
      <TextField source="name"/>
      <ReferenceArrayField source="users" reference="users">
        <SingleFieldList>
          <ChipField source="fullname" />
        </SingleFieldList>
      </ReferenceArrayField>
      {permissions && permissions.includes('GROUPS_EDIT') ? <EditButton basePath="/groups"/> : null}
    </Datagrid>
  </List>
);
