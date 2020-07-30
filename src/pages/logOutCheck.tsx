import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,  IonButton,} from '@ionic/react';
import React from 'react';
import "./assets/products.css"
import { Link } from 'react-router-dom';
import signout from "../auth/userSignout"
  const logOutCheck = () => {
      return(
        <IonPage>
      <IonHeader>
          <IonToolbar color="dark">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>LogIn</IonTitle>
          </IonToolbar>
        </IonHeader>

      <IonContent>
          <div className="ion-text-center pad-top">Already logged in!</div>
          <div className="ion-text-center">
              <Link to="/page/Home">
              <IonButton onClick={signout}>SignOut</IonButton>
              </Link>
              <Link to="/page/Home">
              <IonButton>Go Back!</IonButton>
              </Link>
          </div>
      </IonContent>
        
    </IonPage>
      )
    }
    
export default logOutCheck;
  