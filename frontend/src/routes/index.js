import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

import MeetupCreateAndEdit from '~/pages/Meetup/CreateAndEdit';
import MeetupView from '~/pages/Meetup/View';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/meetup" exact component={MeetupCreateAndEdit} isPrivate />
      <Route path="/meetup/view/:id" exact component={MeetupView} isPrivate />
      <Route path="/meetup/:id" component={MeetupCreateAndEdit} isPrivate />
    </Switch>
  );
}
