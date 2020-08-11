import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCardTitle, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import React, { Component } from 'react';
import './assets/home.css';
import { Link } from 'react-router-dom';
import { cart, person } from 'ionicons/icons';
import { API } from '../Api';

class Home extends Component<any, any>{
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    };
  }
  componentDidMount() {
    fetch(` ${API}/category`)
      .then(res => res.json())
      .then(res => this.setState({ data: res, isLoaded: true }))
      .catch(() => this.setState({ error: true }));
  }
  render() {
    const { error, isLoaded, data } = this.state;
    const homeBody = () => {
      return (
        <div className="home-content">
          <IonGrid className="body home-content">
            <IonRow>
              {data.map((data: any, index: any) => {
                const product = () => {
                  return (
                    `/page/Home/${data._id}`
                  )
                }
                return <IonCol size="6" key={index} className="noPad ion-text-center">
                  <Link to={product()}>
                    <div className="catg-sep">
                      <img className="categoryImage" src={`${API}/category/photo/${data._id}`} alt="categoryPhoto" />
                      <IonCardTitle className="name ion-text-center">
                        {data.name}
                      </IonCardTitle>
                    </div>
                  </Link>
                </IonCol>
              })}
            </IonRow>
          </IonGrid>
        </div>
      )
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }
    else {
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton class="menuBtn" />
              </IonButtons>
              <IonTitle className="menuHead">Home</IonTitle>
              <div slot="end" className="navIcon">
                <Link to="/page/Cart"><IonIcon className="Icon" md={cart} /></Link>
              </div>
              <div slot="end" className="navIcon">
                <Link to="/page/Profile"><IonIcon className="Icon" md={person} /></Link>
              </div>
            </IonToolbar>
            <IonTitle className="ion-text-center">
              <div className="toolHead">Categories</div>
            </IonTitle>
          </IonHeader>
          <IonContent>
            {!isLoaded ? (
              <p className="LoadPad ion-text-center">Loading .......</p>
            ) : (
                homeBody()
              )}
          </IonContent>
        </IonPage>
      );
    }
  };
}
export default Home;
