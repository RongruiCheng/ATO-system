import React from 'react';
import {Router, Route, Switch, Redirect} from 'dva/router';
import ShowVehicle from './view/purchaseCar/showVehicle/ShowVehicle.js';
import ShowDetail from './view/purchaseCar/showDetail/ShowDetail.js';
import Register from './view/register/Register.js';
import Upload from './view/uploads/Upload.js';

export default ({history})=> <Router history={history}>
    <Switch>
        <Route path='/purchase/car' exact component={ShowVehicle}></Route>
        <Route path='/purchase/car/:id' exact component={ShowDetail}></Route>
        <Route path='/user/register' exact component={Register}></Route>
        <Redirect from="/" to="/user/register"></Redirect>
    </Switch>
</Router>;