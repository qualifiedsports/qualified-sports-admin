import React from 'react';
import {
  Show,
  SimpleShowLayout,
  ReferenceField,
  TextField
} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import {MediaField} from '../fields';

const styles = {
  numberField: {textAlign: 'left'},
  booleanField: {margin: 0}
};

export default ({permissions, ...props}) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="value" style={styles.numberField}/>
      <ReferenceField source="user" reference="users">
        <TextField source="fullname"/>
      </ReferenceField>
      <MediaField source="attachment.content_url" title="attachment.name" />
    </SimpleShowLayout>
  </Show>
);
