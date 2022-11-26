import React from 'react';
import {Route} from 'react-router-dom';
import {ChatList} from "../views/ChatList";
import {Chat} from "../views/Chat";
import { DietCalculator } from '../views/DietCalculator';

export default [
  <Route exact path="/chats" component={ChatList}/>,
  <Route exact path="/chat/:userId" render={(routeProps) => <Chat userId={routeProps.match.params.userId} />}/>,
  <Route exact path="/dietCalculator" component={DietCalculator}/>,
];