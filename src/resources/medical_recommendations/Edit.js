import React from 'react';
import {
  required,
  Edit as BaseEdit,
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
import {DateInput} from 'react-admin-date-inputs';

const MedicalRecommendationTitle = ({translate}) => {
  return <span>{`${translate('resources.medical_recommendations.name', 1)}`} </span>;
};

export const Edit = ({...props}) => {
  const translate = useTranslate();
  const {permissions} = usePermissions();

  return <BaseEdit title={<MedicalRecommendationTitle translate={translate}/>} {...props}>
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
      {permissions && permissions.includes('MEDICAL_RECOMMENDATIONS_EDIT_CREATED') && <DateInput source="created" providerOptions={{utils: MomentUtils}}/> }
      <DateInput source="created" validate={required()} providerOptions={{utils: MomentUtils}}/>
    </SimpleForm>
  </BaseEdit>;
};
