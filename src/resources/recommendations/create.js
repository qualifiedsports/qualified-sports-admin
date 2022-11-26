import React from 'react';
import {
  translate,
  required,
  Create,
  SimpleForm,
  SelectInput,
  ReferenceInput,
  SelectArrayInput,
  TextInput,
  ReferenceArrayInput
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import MomentUtils from "@date-io/moment";
import { DateInput } from 'react-admin-date-inputs';

export default translate(({translate, ...props}) => (
  <Create {...props}>
    <SimpleForm redirect="show">
      <ReferenceInput source="type" reference="recommendation_types" validate={required()}>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput multiline source="value" validate={required()}/>
      <DateInput
        source="at"
        validate={required()}
        providerOptions={{utils: MomentUtils}}
      />
      <DateInput
        source="ends"
        allowEmpty
        providerOptions={{utils: MomentUtils}}
      />
      <ReferenceArrayInput source="users" reference="users" allowEmpty>
        <SelectArrayInput optionText="email"/>
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
));

/** todo allowEmpty inside ReferenceInput needs to be removed https://github.com/marmelab/react-admin/issues/460 [30 Nov 2017] **/
