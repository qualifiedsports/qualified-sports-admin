import React from 'react';
import {
  required,
  Edit,
  SimpleForm,
  AutocompleteInput,
  ReferenceInput,
  TextInput,
  useTranslate
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import RichTextInput from 'ra-input-rich-text'; // eslint-disable-line import/no-unresolved
import MomentUtils from "@date-io/moment";
import { DateInput } from 'react-admin-date-inputs';

const Title = () => {
  const translate = useTranslate();

  return <span>{`${translate('resources.psycho_physical_developments.name', 1)}`} </span>;
};

export const PsychoPhysicalDevelopmentEdit = ({...props}) => (
  <Edit title={<Title/>} {...props}>
    <SimpleForm redirect="show">
      <TextInput disabled source="id"/>
      <ReferenceInput source="user" reference="users" validate={required()} filterToQuery={(q) => ({fullname: q})}>
        <AutocompleteInput optionText="fullname"/>
      </ReferenceInput>
      <DateInput source="at" validate={required()} providerOptions={{utils: MomentUtils}}/>
      <RichTextInput source="value" validate={required()}/>
      <DateInput source="created" validate={required()} providerOptions={{utils: MomentUtils}}/>
    </SimpleForm>
  </Edit>
);
