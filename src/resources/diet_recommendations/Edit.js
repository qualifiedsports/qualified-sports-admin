import React from 'react';
import {
  required,
  Edit,
  SimpleForm,
  TextInput,
  AutocompleteInput,
  ReferenceInput,
  FileInput,
  FileField,
  useTranslate,
  usePermissions
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import RichTextInput from 'ra-input-rich-text'; // eslint-disable-line import/no-unresolved
import MomentUtils from "@date-io/moment";
import { DateInput, DateTimeInput } from "react-admin-date-inputs";

const Title = () => {
  const translate = useTranslate();

  return <span>{`${translate('resources.diet_recommendations.name', 1)}`} </span>;
};

export const DietRecommendationsEdit = ({...props}) => {
  const {permissions} = usePermissions();

  return <Edit title={<Title/>} {...props}>
    <SimpleForm redirect="list">
      <TextInput disabled source="id"/>
      <ReferenceInput source="user" reference="users" allowEmpty validate={required()} filterToQuery={(q) => ({fullname: q})}>
        <AutocompleteInput optionText="fullname"/>
      </ReferenceInput>
      <DateInput source="at" validate={required()} providerOptions={{utils: MomentUtils}}/>
      <DateInput source="ends" allowEmpty providerOptions={{utils: MomentUtils}}/>
      <RichTextInput multiline source="value" validate={required()}/>
      <FileInput source="attachment">
        <FileField source="attachment" title="title"/>
      </FileInput>
      <DateTimeInput
        source="created"
        validate={required()}
        providerOptions={{utils: MomentUtils}}
      />
    </SimpleForm>
  </Edit>;
};
