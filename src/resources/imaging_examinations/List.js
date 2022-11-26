import React from 'react';
import {
  List,
  Datagrid,
  ReferenceField,
  DateField,
  Filter,
  AutocompleteInput,
  EditButton,
  ReferenceInput
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import {FullNameField, MediaField} from './../fields';

const dateOptions = {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};

const Filters = ({permissions, ...props}) => <Filter {...props}>
  {permissions && permissions.includes('IMAGING_EXAMINATIONS_LIST_USERS') &&
  <ReferenceInput source="user" reference="users" filterToQuery={(q) => ({fullname: q})}>
    <AutocompleteInput optionText="fullname"/>
  </ReferenceInput>}
</Filter>;

export default ({permissions, ...props}) => {
  return (
    <List {...props} filters={<Filters permissions={permissions}/>} bulkActions={false}>
      <Datagrid>
        {permissions && permissions.includes('IMAGING_EXAMINATIONS_LIST_USERS') &&
        <ReferenceField source="user" reference="users">
          <FullNameField source="fullname"/>
        </ReferenceField>}

        <MediaField source="attachment.content_url" title="attachment.name" />

        {permissions && permissions.includes('IMAGING_EXAMINATIONS_LIST_CREATED') &&
        <DateField source="created" locales="pl" options={dateOptions}/>}

        {permissions && permissions.includes('IMAGING_EXAMINATIONS_EDIT') &&
        <EditButton basePath="/imaging_examinations" />}
      </Datagrid>
    </List>
  );
};
