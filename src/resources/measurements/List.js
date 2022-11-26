import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  DateField,
  Filter,
  SelectInput,
  AutocompleteInput,
  ReferenceInput,
  RichTextField,
  usePermissions
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import FullNameField from './../fields/FullNameField';

const dateOptions = {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};

const Filters = ({...props}) => {
    const {permissions} = usePermissions();

    return <Filter {...props}>
      {permissions && permissions.includes('MEASUREMENTS_LIST_USERS') &&
      <ReferenceInput source="user" reference="users" filterToQuery={(q) => ({fullname: q})}>
        <AutocompleteInput optionText="fullname"/>
      </ReferenceInput>}
      <ReferenceInput source="type" reference="measurement_types">
        <SelectInput optionText="name"/>
      </ReferenceInput>
    </Filter>;
  }
;

export const MeasurementsList = ({...props}) => {
  const {permissions} = usePermissions();

  return (
    <List {...props} filters={<Filters/>} bulkActions={false}>
      <Datagrid>
        {permissions && permissions.includes('MEASUREMENTS_LIST_USERS') &&
        <ReferenceField source="user" reference="users">
          <FullNameField source="fullname"/>
        </ReferenceField>}

        <ReferenceField source="type" reference="measurement_types">
          <TextField source="name"/>
        </ReferenceField>

        <TextField source="value"/>
        <DateField source="created" locales="pl" options={dateOptions}/>

        {permissions && permissions.includes('MEASUREMENTS_LIST_UPDATED') &&
        <DateField source="updated" locales="pl" options={dateOptions}/>}

        <RichTextField source="comment" />

        <EditButton/>
      </Datagrid>
    </List>
  )
};
