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
  EditButton,
  useTranslate,
  usePermissions
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import FullNameField from '../fields/FullNameField';
import {ColouredChipField} from "../../components/fields/ColouredChipField";
import {Combined} from "./Combined";

const dateOptions = {year: 'numeric', month: 'short', day: 'numeric'};

const Filters = ({permissions, ...props}) => <Filter {...props}>
  {permissions && permissions.includes('MEDICAL_EXAMINATIONS_LIST_USERS') &&
  <ReferenceInput source="user" reference="users" filterToQuery={(q) => ({fullname: q})}>
    <AutocompleteInput optionText="fullname"/>
  </ReferenceInput>}
</Filter>;

export const MedicalExaminationsList = (props) => {
  const {permissions} = usePermissions();
  const translate = useTranslate();

  if (permissions && permissions.includes('MEDICAL_EXAMINATIONS_LIST_AS_CALENDAR')) {
    return (
      <List pagination={null} {...props} title={translate('resources.medical_examinations.calendar_title')}>
        <Combined/>
      </List>
    );
  }

  return (
    <List {...props} filters={<Filters permissions={permissions}/>} bulkActions={false}>
      <Datagrid>
        {permissions && permissions.includes('MEDICAL_EXAMINATIONS_LIST_USERS') &&
        <ReferenceField source="user" reference="users">
          <FullNameField source="fullname"/>
        </ReferenceField>}

        <DateField source="at" locales="pl" options={dateOptions}/>

        <TextField source="procedure"/>
        <TextField source="description"/>

        <ReferenceField source="created_by" reference="users">
          <FullNameField source="fullname"/>
        </ReferenceField>

        <ColouredChipField
          source="status"
          colorList={{
            DONE: "primary",
            NOT_DONE: "secondary",
          }}
          renderLabel={status => translate(`resources.medical_examinations.values.status.${status}`)}
        />

        {permissions && permissions.includes('MEDICAL_EXAMINATIONS_LIST_CREATED') &&
        <DateField source="created" locales="pl" options={dateOptions}/>}

        {permissions && permissions.includes('MEDICAL_EXAMINATIONS_LIST_UPDATED') &&
        <DateField source="updated" locales="pl" options={dateOptions}/>}

        {permissions && permissions.includes('MEDICAL_EXAMINATIONS_EDIT') &&
        <EditButton />}
      </Datagrid>
    </List>
  );
};
