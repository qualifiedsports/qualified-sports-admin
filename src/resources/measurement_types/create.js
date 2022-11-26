import React from 'react';
import {translate, required, Create, SimpleForm, TextInput} from 'react-admin'; // eslint-disable-line import/no-unresolved;

export default translate(({translate, ...props}) => (
  <Create {...props}>
      <SimpleForm>
        <TextInput source="name" validate={required()}/>
        <TextInput source="unit"/>
      </SimpleForm>
  </Create>
));
