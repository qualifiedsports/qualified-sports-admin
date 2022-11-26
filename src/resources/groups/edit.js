import React from 'react';
import {translate, required, Edit, SimpleForm, TextInput, SelectArrayInput} from 'react-admin'; // eslint-disable-line import/no-unresolved;
import const_roles from './const_roles';
import {withStyles} from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text'; // eslint-disable-line import/no-unresolved

const styles = {
  roles: {width: '100%'},
  description: {width: '100%'}
};

const GroupTitle = translate(({translate, record}) => {
  return <span>{`${translate('resources.groups.name', 5)} ${record.name}`}</span>;
});

export default withStyles(styles)(({classes, ...props}) => (
  <Edit title={<GroupTitle/>} {...props}>
    <SimpleForm>
      <TextInput disabled source="id"/>
      <TextInput source="name" validate={required()}/>
      <SelectArrayInput className={classes.roles} source="roles" choices={const_roles} options={{autoWidth: false}}/>
      <RichTextInput source="description"/>
    </SimpleForm>
  </Edit>
));
