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
  RichTextField
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import FullNameField from '../fields/FullNameField';

const dateOptions = {year: 'numeric', month: 'short', day: 'numeric'};

const Filters = ({permissions, ...props}) => <Filter {...props}>
  {permissions && permissions.includes('PSYCHO_PHYSICAL_DEVELOPMENT_LIST_USERS') &&
  <ReferenceInput source="user" reference="users" filterToQuery={(q) => ({fullname: q})}>
    <AutocompleteInput optionText="fullname"/>
  </ReferenceInput>}
</Filter>;

export const PsychoPhysicalDevelopmentList = ({permissions, ...props}) => {
  return (
    <List {...props} filters={<Filters permissions={permissions}/>} bulkActions={false}>
      <Datagrid>
        {permissions && permissions.includes('PSYCHO_PHYSICAL_DEVELOPMENT_LIST_USER') &&
        <ReferenceField source="user" reference="users">
          <FullNameField source="fullname"/>
        </ReferenceField>}

        <RichTextField source="value"/>

        <ReferenceField source="created_by" reference="users">
          <FullNameField source="fullname"/>
        </ReferenceField>

        <DateField source="at" locales="pl" options={dateOptions}/>

        {permissions && permissions.includes('PSYCHO_PHYSICAL_DEVELOPMENT_LIST_CREATED') &&
        <DateField source="created" locales="pl" options={dateOptions}/>}

        {permissions && permissions.includes('PSYCHO_PHYSICAL_DEVELOPMENT_LIST_UPDATED') &&
        <DateField source="updated" locales="pl" options={dateOptions}/>}

        {permissions && permissions.includes('PSYCHO_PHYSICAL_DEVELOPMENT_EDIT') &&
        <EditButton basePath="/psycho_physical_developments" />}

        {permissions && permissions.includes('PSYCHO_PHYSICAL_DEVELOPMENT_SHOW') &&
        <ShowButton basePath="/psycho_physical_developments" />}
      </Datagrid>
    </List>
  );
}
