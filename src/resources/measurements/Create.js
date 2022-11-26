import React from 'react';
import {
  required,
  Create,
  SimpleForm,
  SelectInput,
  AutocompleteInput,
  TextInput,
  ReferenceInput,
  usePermissions
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import {MeasurementTypeSelectInput} from './../fields';
import RichTextInput from 'ra-input-rich-text'; // eslint-disable-line import/no-unresolved
import MomentUtils from "@date-io/moment";
import {DateTimeInput} from "react-admin-date-inputs";

export const MeasurementsCreate = ({...props}) => {
  const {permissions} = usePermissions();

  return <Create {...props}>
    <SimpleForm>
      {permissions && permissions.includes('MEASUREMENTS_CREATE_USERS') &&
      <ReferenceInput source="user" reference="users" allowEmpty validate={required()} filterToQuery={(q) => ({fullname: q})}>
        <AutocompleteInput optionText="fullname"/>
      </ReferenceInput>}

      <ReferenceInput source="type" reference="measurement_types" allowEmpty validate={required()}>
        <SelectInput optionText={<MeasurementTypeSelectInput/>}/>
      </ReferenceInput>

      <TextInput source="value" validate={required()}/>

      <RichTextInput source="comment" />

      <DateTimeInput
        source="created"
        validate={required()}
        providerOptions={{utils: MomentUtils}}
      />

    </SimpleForm>
  </Create>;
};
