import { IonButtons, IonContent, IonCardTitle, IonGrid, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonCardContent, IonText, IonRow, IonCol } from '@ionic/react';
import React, { Component } from 'react';
import { cart, person } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { API } from '../Api'
import './assets/products.css';

class Products extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    var url = this.props.match.params.category
    fetch(` ${API}/product/${url}`)
      .then(res => res.json())
      .then(res => this.setState({ items: res, isLoaded: true }))
      .catch(() => this.setState({ error: true }));
  }
  render() {
    const { error, isLoaded, items } = this.state;
    const productBody = () => {
      return (
        <IonContent>
          {items.map((items: any, index: any) => {
            const local: any = localStorage.getItem("jwt");
            const user: any = JSON.parse(local);
            const addToCart = () => {
              if (localStorage.getItem("jwt") === null) {
                alert("Login to add to Cart")
              }
              else {
                return fetch(`${API}/put/${user.user._id}/${items._id}`, {
                  method: "PATCH",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  }
                })
                  .then(response => {
                    return response.json();
                  })
                  .then(() => alert("Added to cart"))
                  .catch(err => console.log(err));
              }
            }
            return <div key={index} className="products">
              <IonGrid className="home-content">
                <IonRow className="back">
                  <IonCol className="ion-text-center padder" size="4">
                    <img className="productImage" src={`${API}/product/photo/${items._id}`} alt="productImage" />
                    <br />
                  </IonCol>
                  <IonCol className="prod-desc">
                    <IonCardContent className="noPad">
                      <IonCardTitle className="name">
                        {items.name}
                      </IonCardTitle>
                      <IonText className="desc">{items.description}</IonText>
                      <br />
                      <div className="quantity">{items.quantity}</div>
                      <div className="price">&#8377; {items.price}</div>
                    </IonCardContent>
                  </IonCol>
                  <IonCol size="2" className="cart-sec text-center">
                    <button onClick={addToCart} className="prodBtn"><IonIcon md={cart} /></button>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
          })}
        </IonContent>
      )
    }
    if (error) {
      return <div className="ion-text-center">No Products Found{error.message}</div>;
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
              <div className="toolHead">Products</div>
            </IonTitle>
          </IonHeader>
          <IonContent>
            {!isLoaded ? (
              <p className="LoadPad ion-text-center">Loading .......</p>
            ) : (
                productBody()
              )}
          </IonContent>
        </IonPage>
      )
    }
  }
}
export default Products;
