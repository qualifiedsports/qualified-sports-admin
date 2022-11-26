import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import {translate} from 'react-admin'; // eslint-disable-line import/no-unresolved;

const styles = {
  card: {flex: '1'},
  list: {padding: 0},
  buttonWrapper: {textAlign: 'center'},
  button: {margin: '1em'},
  divider: {marginTop: '1em'}
};

const button = ({label, href}) => (
  <div style={styles.buttonWrapper}>
    <Button style={styles.button} href={href}>
      {label}
    </Button>
  </div>
);

export default translate(({style, itemFunction, items = [], translate, backgroundColor = null, cardTitle, flatButtonLabel, flatButtonHref = '#', showButton = true, isPatient }) => {
  return (
    <Card style={{...styles.card, ...style}}>
      <CardContent>
        <Typography variant="h5" style={styles.cardTitle}>{translate(cardTitle)}</Typography>
        <Divider style={styles.divider}/>
        <List style={styles.list}>
          {items.length ? items.map(item => itemFunction(translate, item, isPatient)) : <ListItem>Brak</ListItem>}
        </List>
        {showButton ? button({label: translate(flatButtonLabel), href: flatButtonHref}) : ''}
      </CardContent>
    </Card>
  );
});
