import React from 'react';
import {
  required,
  Edit,
  SimpleForm,
  AutocompleteInput,
  TextInput,
  ReferenceInput
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import MomentUtils from "@date-io/moment";
import { DateInput, DateTimeInput } from "react-admin-date-inputs";

export const MedicalExaminationsEdit = (props) => <Edit {...props}>
  <SimpleForm redirect="show">
    <ReferenceInput source="user" reference="users" validate={required()} filterToQuery={(q) => ({fullname: q})}>
      <AutocompleteInput optionText="fullname"/>
    </ReferenceInput>
    <DateTimeInput
      source="at"
      validate={required()}
      providerOptions={{utils: MomentUtils}}
    />
    <TextInput source="procedure" validate={required()}/>
    <TextInput source="description" validate={required()}/>
    <DateInput source="created" validate={required()} providerOptions={{utils: MomentUtils}}/>
  </SimpleForm>
</Edit>;
