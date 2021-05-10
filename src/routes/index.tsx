import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Categories from '../pages/Categories';
import Menu from '../pages/Menu';
import Tables from '../pages/Tables';
import TableDetails from '../pages/TableDetails';
import Feedbacks from '../pages/Feedbacks';
import Product from '../pages/Product';
import Settings from '../pages/Settings';
import Waiters from '../pages/Waiters';
import WaitersCreate from '../pages/WaitersCreate';
import WaitersEdit from '../pages/WaitersEdit';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/categories" component={Categories} isPrivate />

    <Route path="/tables" exact component={Tables} isPrivate />
    <Route path="/tables/:id" exact component={TableDetails} isPrivate />

    <Route path="/feedbacks" component={Feedbacks} isPrivate />

    <Route path="/menu" exact component={Menu} isPrivate />
    <Route path="/menu/product/:id" exact component={Product} isPrivate />

    <Route path="/settings" exact component={Settings} isPrivate />
    <Route path="/settings/waiters" exact component={Waiters} isPrivate />
    <Route
      path="/settings/waiters/create"
      exact
      component={WaitersCreate}
      isPrivate
    />
    <Route
      path="/settings/waiters/:id"
      exact
      component={WaitersEdit}
      isPrivate
    />
  </Switch>
);

export default Routes;
