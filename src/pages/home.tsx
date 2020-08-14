import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCardTitle, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import React, { Component } from 'react';
import './assets/home.css';
import { Link } from 'react-router-dom';
import { cart, person } from 'ionicons/icons';
import { API } from '../Api';
import fast from "./assets/FastDev.png";
import cash from "./assets/cash.png";
class Home extends Component<any, any>{
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      offer: [],
      data: [],
      data2: [],
      secondLoad: false
    };
  }
  componentDidMount() {
    fetch(`${API}/category/high`)
      .then(res => res.json())
      .then(res => this.setState({ data: res }))
      .catch(() => this.setState({ error: true }));
    fetch(`${API}/productOffer`)
      .then(res => res.json())
      .then(res => this.setState({ offer: res, isLoaded: true }))
      .catch(() => this.setState({ error: true }));
  }
  render() {
    const { error, isLoaded, data, offer, secondLoad, data2 } = this.state;
    if (secondLoad === false) {
      fetch(`${API}/category/low`)
        .then(res3 => res3.json())
        .then(res3 => this.setState({ secondLoad: true, data2: res3 }))
    }
    const homeBody = () => {
      return (
        <div className="home-content">
          <button className="offer-name">
            <img src={`${API}/product/photo/${offer[0]._id}`} alt="offer" className="offer">
            </img>
          </button>
          <IonGrid className="body home-content">
            <IonRow>
              <br />
              {data.map((data: any, index: any) => {
                const product = () => {
                  return (
                    `/page/Home/${data._id}`
                  )
                }
                return <IonCol size="6" key={index} className="home-cat-pad ion-text-center">
                  <Link to={product()}>
                    <button className="catg-sep">
                      <IonCardTitle className="name ion-text-center">
                        {data.name}
                      </IonCardTitle>
                      <img className="categoryImage" src={`${API}/category/photo/${data._id}`} alt="categoryPhoto" />
                    </button>
                  </Link>
                </IonCol>
              })}
            </IonRow>
            <div className="info ion-text-center">
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <img src={fast} alt="info" className="info-image"></img>
                    <br />
                    <div className="info-text">
                      Fast Delivery
                    </div>
                  </IonCol>
                  <IonCol size="6">
                    <img src={cash} alt="info" className="info-image"></img>
                    <br />
                    <div className="info-text">
                      COD Available
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
            <IonRow>
              <br />
              {data2.map((data: any, index: any) => {
                const product = () => {
                  return (
                    `/page/Home/${data._id}`
                  )
                }
                return <IonCol size="6" key={index} className="home-cat-pad ion-text-center">
                  <Link to={product()}>
                    <button className="catg-sep">
                      <IonCardTitle className="name ion-text-center">
                        {data.name}
                      </IonCardTitle>
                      <img className="categoryImage" src={`${API}/category/photo/${data._id}`} alt="categoryPhoto" />
                    </button>
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
