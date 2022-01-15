import React from "react";
import { Router, Route, Switch } from "react-router-dom"; // replace router expect BrowserRouter Because we use history
import history from "./history";
import Home from "./Pages/Home/Home";
import SearchImage from "./Pages/SearchImage/SearchImage";
import UserProfile from "./Pages/UserProfile/UserProfile";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import SignupPage from "./Pages/SignupPage/SignupPage";
import Admin from "./Pages/Admin/Admin";
import ImagePreview from './components/ImagePreview/ImagePreview';
import UserPanel from './Pages/UserPanel/UserPanel';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Switch>
         
          <ProtectedRoute path="/" exact component={Home} />
          <ProtectedRoute
            path="/user/:id"
            component={UserPanel}
          />
          <ProtectedRoute path="/search/:name" component={SearchImage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/admin"  component={Admin} />
        <Route path="/image/:id" component={ImagePreview}/>
        </Switch>
      </Router>
    </div>
  );
};
export default App;
        /* <Route path="/user/:userId">
            <User />
        </Route> */
          /* <Route path="/newUser">
            <NewUser />
        </Route> */