import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCardTitle, IonIcon, IonGrid, IonRow, IonCol, IonSpinner } from '@ionic/react';
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
      secondLoad: false,
      screenWidth: window.screen.width
    };
  }
  componentDidMount() {
    if (this.state.screenWidth > 1000) {
      alert("This is a mobile friendly web-site. Switch to mobile view and Refresh")
      alert("Mobile Friendly Web Site. Switch to mobile")
    }
    fetch(`${API}/category/high`)
      .then(res => res.json())
      .then(res => this.setState({ data: res, isLoaded: true }))
      .catch(() => this.setState({ error: true }));
  }
  render() {
    const { error, isLoaded, data, secondLoad, data2 } = this.state;
    if (secondLoad === false) {
      fetch(`${API}/category/low`)
        .then(res3 => res3.json())
        .then(res3 => this.setState({ secondLoad: true, data2: res3 }))
    }
    const offerImg = () => {
      return (
        <img src={`${API}/offerImage`} alt="offer" className="offer" />
      )
    }
    const homeBody = () => {
      return (
        <div className="home-content">
          <button className="offer-name">
            {offerImg()}
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
                const cardColor = () => {
                  if (index % 2 === 0) {
                    return "back1"
                  }
                  else return "back2"
                }
                return <IonCol size="4" key={index} className="ion-text-center remove-pad">
                  <Link to={product()}>
                    <button className="catg-sep">
                      <div className={cardColor()}>
                        <IonCardTitle className="name ion-text-center">
                          {data.name}
                        </IonCardTitle>
                        <img className="categoryImage" src={`${API}/category/photo/${data._id}`} alt="categoryPhoto" />
                      </div>
                    </button>
                  </Link>
                </IonCol>
              })}
            </IonRow>
            <br />
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
            <br />
            <IonRow>
              <br />
              {data2.map((data: any, index: any) => {
                const product = () => {
                  return (
                    `/page/Home/${data._id}`
                  )
                }
                const cardColor = () => {
                  if (index % 2 === 0) {
                    return "back2"
                  }
                  else return "back1"
                }
                return <IonCol size="4" key={index} className="home-cat-pad ion-text-center remove-pad">
                  <Link to={product()}>
                    <button className="catg-sep">
                      <div className={cardColor()}>
                        <IonCardTitle className="name ion-text-center">
                          {data.name}
                        </IonCardTitle>
                        <img className="categoryImage" src={`${API}/category/photo/${data._id}`} alt="categoryPhoto" />
                      </div>
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
              <div className="ion-text-center load-animation">
                <IonSpinner name="crescent" />
              </div>

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
