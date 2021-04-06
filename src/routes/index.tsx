import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Categories from '../pages/Categories';
import Menu from '../pages/Menu';
import Tables from '../pages/Tables';
import Feedbacks from '../pages/Feedbacks';
import Settings from '../pages/Settings';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />

    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route path="/categories" exact component={Categories} isPrivate />
    <Route path="/menu" exact component={Menu} isPrivate />
    <Route path="/tables" exact component={Tables} isPrivate />
    <Route path="/feedbacks" exact component={Feedbacks} isPrivate />
    <Route path="/settings" exact component={Settings} isPrivate />
  </Switch>
);

export default Routes;
