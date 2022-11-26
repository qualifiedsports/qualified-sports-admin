import React from 'react';
import {Create, SimpleForm, TextInput, SelectArrayInput, required} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import const_roles from './const_roles';
import {withStyles} from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text'; // eslint-disable-line import/no-unresolved

const styles = {
  roles: {width: '100%'}
};

export default withStyles(styles)(({classes, ...props}) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name"/>
      <SelectArrayInput source="roles" choices={const_roles} className={classes.roles}/>
      <RichTextInput source="description" validate={required()}/>
    </SimpleForm>
  </Create>
));
