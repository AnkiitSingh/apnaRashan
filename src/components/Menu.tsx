import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { archiveOutline, bookmarks, heartOutline, cart, mailOutline, paperPlaneOutline, home, trashOutline, informationCircle, logIn, person } from 'ionicons/icons';
import './Menu.css';
import signout from "../auth/userSignout"
import avatar from "../pages/assets/avatar.svg"

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/page/Home',
    iosIcon: mailOutline,
    mdIcon: home
  },
  {
    title: 'Cart',
    url: '/page/Cart',
    iosIcon: heartOutline,
    mdIcon: cart
  },
  {
    title: 'Orders',
    url: '/page/Orders',
    iosIcon: archiveOutline,
    mdIcon: bookmarks
  },
  {
    title: 'Profile',
    url: '/page/Profile',
    iosIcon: trashOutline,
    mdIcon: person
  },
  {
    title: 'Login/SignUp',
    url: '/page/Login',
    iosIcon: paperPlaneOutline,
    mdIcon: logIn
  },
  {
    title: 'About',
    url: '/page/AboutUs',
    iosIcon: trashOutline,
    mdIcon: informationCircle
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const local: any = localStorage.getItem("jwt");
  const user: any = JSON.parse(local);
  const info = () => {
    if (!user) {
      return (
        ""
      )
    }
    return (
      <div className="noPad">
        <IonGrid>
          <IonRow>
            <IonCol className="ion-text-center" size="12">
              <img src={avatar} alt="avatar" className="menuImg" />
            </IonCol>
            <IonCol>
              <div className="ion-text-center menuTxt">Welcome, </div>
              <div className="ion-text-center menuTxt1">{user.user.email}</div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    )
  }
  const logoutBtn = () => {
    if (localStorage.getItem("jwt") == null) {
      return (
        ""
      )
    }
    return (
      <Link to="/page/Home">
        <button onClick={signout} className="menuBtn2">SignOut</button>
      </Link>
    )
  }
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <div className="ion-text-center pad-up">
          <IonText className="text-pad">{info()}</IonText>
        </div>
        <IonList id="inbox-list">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false} >
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel >{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <br />
        <IonContent className="ion-text-center">{logoutBtn()}</IonContent>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
