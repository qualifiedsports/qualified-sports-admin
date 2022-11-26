import React, {Component, useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CallIcon from '@material-ui/icons/Call';
import {GET_LIST} from 'react-admin';
import {makeStyles} from "@material-ui/core/styles";
import restClient from "../providers/rest";

const useStyles = makeStyles({
  card: {
    display: 'flex',
    float: 'left',
    marginRight: '2em',
    marginTop: '1em'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  typography: {
    marginRight: '0.25em'
  }
});

export const ChatList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    restClient(GET_LIST, 'users', {pagination: {page: 1, perPage: 1000}, sort: {field: 'id', order: 'ASC'}})
      .then(({data}) => setUsers(data));
  }, []);

  const classes = useStyles();

  return <div>
    {users.map(user => <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="headline" className={classes.typography}>{user.fullname}</Typography>
        <IconButton href={`/#/chat/${user.id}`}>
          <CallIcon/>
        </IconButton>
      </CardContent>
    </Card>)}
  </div>;
};