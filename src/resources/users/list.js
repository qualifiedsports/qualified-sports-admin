import React from 'react';
import {List, Datagrid, TextField, EditButton, ShowButton, EmailField, ReferenceArrayField, SingleFieldList, ChipField} from 'react-admin'; // eslint-disable-line import/no-unresolved;

export default (props) => (
  <List {...props} bulkActions={false}>
    <Datagrid>
      <TextField source="fullname"/>
      <EmailField source="email"/>
      <ReferenceArrayField source="groups" reference="groups">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <TextField source="phone"/>
      <ReferenceArrayField source="patients" reference="users">
        <SingleFieldList>
          <ChipField source="email" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceArrayField source="doctors" reference="users">
        <SingleFieldList>
          <ChipField source="email" />
        </SingleFieldList>
      </ReferenceArrayField>
      <EditButton/>
      <ShowButton/>
    </Datagrid>
  </List>
);
