import React from 'react';
import {
  required,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  AutocompleteInput,
  ReferenceInput,
  useTranslate,
  usePermissions
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import {MeasurementTypeSelectInput} from './../fields';
import RichTextInput from 'ra-input-rich-text'; // eslint-disable-line import/no-unresolved
import MomentUtils from "@date-io/moment";
import { DateInput, DateTimeInput } from "react-admin-date-inputs";

const Title = () => {
  const translate = useTranslate();

  return <span>{`${translate('resources.measurements.name', 1)}`} </span>;
};

export const MeasurementsEdit = ({...props}) => {
  const {permissions} = usePermissions();

  return <Edit title={<Title />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id"/>

      {permissions && permissions.includes('MEASUREMENT_EDIT_USERS') &&
      <ReferenceInput source="user" reference="users" validate={required()} filterToQuery={(q) => ({fullname: q})}>
        <AutocompleteInput optionText="fullname"/>
      </ReferenceInput>}

      <ReferenceInput source="type" reference="measurement_types" validate={required()}>
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
  </Edit>;
};
