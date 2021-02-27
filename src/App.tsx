import Menu from './components/Menu';
import Page from './pages/Page';
import Home from './pages/home';
import Products from './pages/products';
import Login from './pages/login';
import Cart from './pages/cart';
import Landing from './pages/landing';
import SignUp from './pages/signUp';
import Profile from './pages/profile';
import Order from "./pages/order";
import AboutUs from "./pages/aboutUs";
import Policy from "./pages/policy";
import OrderDetails from "./pages/orderMore"
import React, { useEffect } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { setupConfig } from "@ionic/react";
import { Plugins, Capacitor } from "@capacitor/core";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import loginCheck from './pages/loginChecker';
import logOutCheck from './pages/logOutCheck';
import Refund from './pages/refund';
import Terms from './pages/terms';
import Policies from './pages/guide';

setupConfig({
  hardwareBackButton: false,
});
const App: React.FC = () => {
  useEffect(() => {
    if (Capacitor.isNative) {
      Plugins.App.addListener("backButton", (e) => {
        if (window.location.pathname === "/page/Landing") {
          // Show A Confirm Box For User to exit app or not
          let ans = window.confirm("Are you sure");
          if (ans) {
            Plugins.App.exitApp();
          }
        } else if (window.location.pathname === "/page/Home") {
          // Show A Confirm Box For User to exit app or not
          let ans = window.confirm("Are you sure");
          if (ans) {
            Plugins.App.exitApp();
          }
        } else {
          // Handels Back Button If You don't want to exit app
          window.history.back();
        }
      });
    }
  }, []); //eslint-disable-line
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Redirect from="/" to="/page/Landing" exact />
            <Route path="/page/Landing" component={Landing} exact />
            <Route path="/page/Home" component={Home} exact />
            <Route path="/page/Login" component={Login} exact />
            <Route path="/page/SignUp" component={SignUp} exact />
            <Route path="/page/Cart" component={Cart} exact />
            <Route path="/page/Orders" component={Order} exact />
            <Route path="/page/Profile" component={Profile} exact />
            <Route path="/page/AboutUs" component={AboutUs} exact />
            <Route path="/page/Policy" component={Policy} exact />
            <Route path="/page/Policies" component={Policies} exact />
            <Route path="/page/Refund" component={Refund} exact />
            <Route path="/page/Terms" component={Terms} exact />
            <Route path="/page/loginCheck" component={loginCheck} exact />
            <Route path="/page/logOutCheck" component={logOutCheck} exact />
            <Route path="/page/Home/:category" component={Products} exact />
            <Route path="/page/Order/:OrderId" component={OrderDetails} exact />
            <Route path="/page/:name" component={Page} exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
