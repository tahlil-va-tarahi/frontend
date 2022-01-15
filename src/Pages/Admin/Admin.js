import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Switch, Route } from 'react-router-dom';
import ProductList from './../productList/ProductList';
import Product from './../product/Product';
import NewProduct from './../newProduct/NewProduct';
import WidgetSm from './../../components/widgetSm/WidgetSm';
import WidgetLg from './../../components/widgetLg/WidgetLg';
import UserList from './../userList/UserList';
const Admin = ({match}) => {
  console.log(match)
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path={`${match.path}/product/:id`} component={Product}/>
          <Route path={`${match.path}/products`} exact component={ProductList} />
          <Route path={`${match.path}/products/:productId`} exact component={Product} />
          <Route path={`${match.path}/newproduct`} exact component={NewProduct} />
          <Route path={`${match.path}/transactions`} exact>
            <WidgetSm />
            <WidgetLg />
          </Route>
          <Route path={`${match.path}/users`} component={UserList}/>
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
