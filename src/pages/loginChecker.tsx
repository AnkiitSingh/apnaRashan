import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,  IonButton,} from '@ionic/react';
import React from 'react';
import "./assets/products.css"
import { Link } from 'react-router-dom';
  const loginCheck = () => {
   
      return(
        <IonPage>
      <IonHeader>
          <IonToolbar color="dark">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Products</IonTitle>
          </IonToolbar>
        </IonHeader>

      <IonContent>
          <div className="ion-text-center pad-top">Log in to order products</div>
          <div className="ion-text-center">
              <Link to="/page/Login">
              <IonButton>LogIn</IonButton>
              </Link>
              <Link to="/page/Home">
              <IonButton>Go Back!</IonButton>
              </Link>
          </div>
      </IonContent>
        
    </IonPage>
      )
    }
    
export default loginCheck;
  