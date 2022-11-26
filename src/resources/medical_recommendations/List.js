import React from 'react';
import {
  List as BaseList,
  Datagrid,
  RichTextField,
  ReferenceField,
  EditButton,
  DateField,
  Filter,
  AutocompleteInput,
  ReferenceInput,
  usePermissions
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import FullNameField from './../fields/FullNameField';
import {MediaField} from '../fields';

const dateOptions = {year: 'numeric', month: 'short', day: 'numeric'};

const Filters = ({permissions, ...props}) => (
  <Filter {...props}>
    {permissions && permissions.includes('MEDICAL_RECOMMENDATIONS_LIST_USER') &&
    <ReferenceInput source="user" reference="users" filterToQuery={(q) => ({fullname: q})}>
      <AutocompleteInput optionText="fullname"/>
    </ReferenceInput>}
  </Filter>
);

export const List = ({...props}) => {
  const {permissions} = usePermissions();

  return <BaseList {...props}
               filters={<Filters permissions={permissions}/>}
               bulkActions={false}
  >
    <Datagrid>
      {permissions && permissions.includes('MEDICAL_RECOMMENDATIONS_LIST_USER') &&
      <ReferenceField source="user" reference="users">
        <FullNameField source="fullname"/>
      </ReferenceField>}

      <RichTextField source="value"/>

      <DateField source="at" locales="pl" options={dateOptions}/>
      <DateField source="ends" locales="pl" options={dateOptions}/>

      <ReferenceField source="created_by" reference="users">
        <FullNameField source="fullname"/>
      </ReferenceField>

      <MediaField source="attachment.content_url" title="attachment.name" />

      {permissions && permissions.includes('MEDICAL_RECOMMENDATIONS_LIST_CREATED') &&
      <DateField source="created" locales="pl" options={dateOptions}/>}

      {permissions && permissions.includes('MEDICAL_RECOMMENDATIONS_LIST_UPDATED') &&
      <DateField source="updated" locales="pl" options={dateOptions}/>}

      {permissions && permissions.includes('MEDICAL_RECOMMENDATIONS_EDIT') &&
      <EditButton />}
    </Datagrid>
  </BaseList>;
};

