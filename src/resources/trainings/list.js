import React from 'react';
import {
  Datagrid,
  DateField,
  Filter,
  List,
  ReferenceField,
  ReferenceInput,
  AutocompleteInput,
  TextField,
  useTranslate,
  EditButton,
  usePermissions
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import FullNameField from '../fields/FullNameField';
import {MediaField} from '../fields';
import {Combined} from './Combined';
import {ColouredChipField} from "../../components/fields/ColouredChipField";

const dateOptions = {year: 'numeric', month: 'short', day: 'numeric'};

const Filters = ({permissions, ...props}) => <Filter {...props}>
  {permissions && permissions.includes('TRAININGS_LIST_USERS') &&
  <ReferenceInput source="user" reference="users" filterToQuery={(q) => ({fullname: q})}>
    <AutocompleteInput optionText="fullname"/>
  </ReferenceInput>}
</Filter>;

export const TrainingsList = (props) => {
  const {permissions} = usePermissions();
  const translate = useTranslate();

  if (permissions && permissions.includes('TRAININGS_LIST_AS_CALENDAR') && !permissions.includes('TRAININGS_CREATE')) {
    return (
      <List pagination={null} bulkActions={false} {...props} title={translate('resources.trainings.calendar_title')}>
        <Combined/>
      </List>
    );
  }

  return (
    <List {...props} filters={<Filters permissions={permissions}/>} bulkActions={false}>
      <Datagrid>
        {permissions && permissions.includes('TRAININGS_LIST_USERS') &&
        <ReferenceField source="user" reference="users">
          <FullNameField source="fullname"/>
        </ReferenceField>}

        <TextField source="value"/>
        <TextField source="result_achieved"/>

        <DateField source="at" locales="pl" options={dateOptions}/>
        <DateField source="ends" locales="pl" options={dateOptions}/>

        <MediaField source="attachment.content_url" title="attachment.name"/>

        <ReferenceField source="created_by" reference="users">
          <FullNameField source="fullname"/>
        </ReferenceField>

        <TextField source="result"/>

        <ColouredChipField
          source="status"
          colorList={{
            DONE: "primary",
            NOT_DONE: "secondary",
          }}
          renderLabel={status => translate(`resources.trainings.values.status.${status}`)}
        />

        {permissions && permissions.includes('TRAININGS_LIST_CREATED') &&
        <DateField source="created" locales="pl" options={dateOptions}/>}

        {permissions && permissions.includes('TRAININGS_LIST_UPDATED') &&
        <DateField source="updated" locales="pl" options={dateOptions}/>}

        {permissions && permissions.includes('TRAININGS_EDIT') &&
        <EditButton basePath="/trainings"/>}

      </Datagrid>
    </List>
  );
};

export default TrainingsList;
