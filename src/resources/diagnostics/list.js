import React from 'react';
import {
  Datagrid,
  DateField,
  EditButton,
  Filter,
  List,
  ReferenceField,
  ReferenceInput,
  AutocompleteInput,
  ShowButton,
  TextField
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import {MediaField} from '../fields';
import FullNameField from '../fields/FullNameField';

const dateOptions = {year: 'numeric', month: 'short', day: 'numeric'};

const Filters = ({permissions, ...props}) => <Filter {...props}>
  {permissions && permissions.includes('DIAGNOSTICS_LIST_USERS') &&
  <ReferenceInput source="user" reference="users" filterToQuery={(q) => ({fullname: q})}>
    <AutocompleteInput optionText="fullname"/>
  </ReferenceInput>}
</Filter>;

export default ({permissions, ...props}) => {
  return (
    <List {...props} filters={<Filters permissions={permissions}/>} bulkActions={false}>
      <Datagrid>
        {permissions && permissions.includes('DIAGNOSTICS_LIST_USERS') &&
        <ReferenceField source="user" reference="users">
          <FullNameField source="fullname"/>
        </ReferenceField>}

        <TextField source="value"/>

        <MediaField source="attachment.content_url" title="attachment.name" />

        <ReferenceField source="created_by" reference="users">
          <FullNameField source="fullname"/>
        </ReferenceField>

        {permissions && permissions.includes('DIAGNOSTICS_LIST_CREATED') &&
        <DateField source="created" locales="pl" options={dateOptions}/>}

        {permissions && permissions.includes('DIAGNOSTICS_LIST_UPDATED') &&
        <DateField source="updated" locales="pl" options={dateOptions}/>}

        {permissions && permissions.includes('DIAGNOSTICS_EDIT') &&
        <EditButton basePath="/diagnostics" />}

        <ShowButton basePath="/diagnostics" />
      </Datagrid>
    </List>
  );
};
