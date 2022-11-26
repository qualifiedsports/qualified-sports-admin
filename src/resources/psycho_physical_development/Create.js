import React from 'react';
import {
  required,
  Create,
  SimpleForm,
  AutocompleteInput,
  ReferenceInput
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import RichTextInput from 'ra-input-rich-text'; // eslint-disable-line import/no-unresolved
import MomentUtils from "@date-io/moment";
import { DateInput } from 'react-admin-date-inputs';

export const PsychoPhysicalDevelopmentCreate = ({...props}) => (
  <Create {...props}>
    <SimpleForm redirect="show">
      <ReferenceInput source="user" reference="users" validate={required()} filterToQuery={(q) => ({fullname: q})}>
        <AutocompleteInput optionText="fullname"/>
      </ReferenceInput>
      <DateInput source="at" validate={required()} providerOptions={{utils: MomentUtils}}/>
      <RichTextInput source="value" validate={required()}/>
    </SimpleForm>
  </Create>
);
