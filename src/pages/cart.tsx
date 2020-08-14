import { IonButtons, IonContent, IonHeader, IonRadioGroup, IonRadio, IonMenuButton, IonIcon, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonFooter, IonText, IonLabel } from '@ionic/react';
import React, { Component } from 'react';
import './Page.css';
import { cart as bag, person } from 'ionicons/icons';
import { API } from '../Api'
import { Link } from 'react-router-dom';
import './assets/products.css';
import cartOrder from "../auth/orderHelper"
import icon from "../icon.png"
class Cart extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      address: String,
      transaction_id: "Cash on Delivery",
      items: [],
      cart: [],
      paymentType: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePayment = this.handleChange.bind(this);
  }
  handleChange(event: any) {
    this.setState({ address: event.target.value });
  }
  handlePayment(event: any) {
    this.setState({ paymentType: event.target.value });
  }
  componentDidMount() {
    const { items } = this.state;
    const local: any = localStorage.getItem("jwt");
    const user: any = JSON.parse(local);
    var id: any = String;
    if (localStorage.getItem("jwt") === null) {
      this.setState({ isLoaded: true })
    }
    else {
      id = user.user._id
      fetch(` ${API}/${id}/cart`)
        .then(res => res.json())
        .then(res => this.setState({ items: res, isLoaded: false }))
        .then(() => { if (items.length === 0) { this.setState({ isLoaded: true }) } })
        .catch(() => this.setState({ error: true }));
    }
  }
  render() {
    const { cart, items, isLoaded, paymentType, address } = this.state;
    let arr: any = [];
    let amount = 0;
    let products: any = [];
    if (isLoaded === false) {
      for (let i = 0; i < items.length; i++) {
        fetch(`${API}/cart/${items[i]}`)
          .then(res => res.json())
          .then(res => arr.push(res))
          .then(res => this.setState({ isLoaded: true, cart: [...arr] }))
      }
    }
    function loadScript(src: any) {
      return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
          resolve(true)
        }
        script.onerror = () => {
          resolve(false)
        }
        document.body.appendChild(script)
      })
    }
    async function displayRazorpay() {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
      }
      var options = {
        "key": "rzp_test_MwvUUjNN2CExKX", // Enter the Key ID generated from the Dashboard
        "amount": (amount * 100),
        "currency": "INR",
        "name": "Apna Rashan",
        "description": "Test Transaction",
        "image": { icon },
        "handler": function (response: any) {
          const local: any = localStorage.getItem("jwt");
          const val: any = JSON.parse(local);
          const user = val.user._id;
          let transaction_id = response.razorpay_payment_id
          cartOrder({ products, transaction_id, amount, address, user })
            .then((data: any) => {
              if (data.error) {
                console.log(data.error);
              }
            })
            .then(() => alert("Product Ordered"))
            .then(() => { window.location.reload(false); })
            .catch((data: any) => {
              console.log(data.error);
            });
        }
      };
      const _window = window as any
      const paymentObject = new _window.Razorpay(options)
      paymentObject.open()
    }

    const onSubmit = (event: any) => {
      const local: any = localStorage.getItem("jwt");
      const val: any = JSON.parse(local);
      const user = val.user._id;
      const { transaction_id, address } = this.state;
      if (!paymentType || paymentType === "") {
        return alert("Please select a payment method")
      }
      else if (address.length <= 10) {
        return alert("Please Enter Full Address")
      }
      else if (paymentType === "payOnline") {
        displayRazorpay()
      }
      else {
        event.preventDefault();
        cartOrder({ products, transaction_id, amount, address, user })
          .then((data: any) => {
            if (data.error) {
              console.log(data.error);
            }
          })
          .then(() => alert("Product Ordered"))
          .then(() => { window.location.reload(false); })
          .catch((data: any) => {
            console.log(data.error);
          });
      }
    };
    const cartBody = () => {
      if (localStorage.getItem("jwt") == null) {
        return (
          <div className="LoadPad ion-text-center">Login to see Cart<br>
          </br>
            <br />
            <Link to="/page/Login">
              <button className="cartLogin">Login</button>
            </Link>
          </div>
        )
      }
      if (items.length === 0) {
        return (
          <div className="ion-text-center LoadPad"> Cart Empty !</div>
        )
      }
      return (
        <IonContent>
          {cart.map((data: any, index: any) => {
            products.push(cart[index][0]._id);
            const local: any = localStorage.getItem("jwt");
            const user: any = JSON.parse(local);
            const deleteCart = () => {
              return fetch(`${API}/cart/${user.user._id}/${index}`, {
                method: "PATCH",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                }
              })
                .then(response => {
                  return response.json();
                })
                .then(() => alert("Removed from cart"))
                .then(() => { window.location.reload(false); })
                .catch(err => console.log(err));
            }
            amount = amount + cart[index][0].price
            return <IonCard key={index} className="cartCard">
              <IonGrid >
                <IonRow>
                  <IonCol className="ion-text-center">
                    <img className="productImage" src={`${API}/product/photo/${cart[index][0]._id}`} alt="productImage" />
                  </IonCol>
                  <IonCol>
                    <IonCardContent className="name ion-text-center">{(cart[index][0].name)}</IonCardContent>
                    <IonCardContent className="name ion-text-center">&#8377; {(cart[index][0].price)}</IonCardContent>
                    <IonCardContent className="ion-text-center">
                      <button onClick={deleteCart} className="deleteBtn">Remove</button>
                    </IonCardContent>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>
          })}
          <div className="ion-text-center cartAddress">
            <IonRadioGroup value={paymentType} onIonChange={e => this.setState({ paymentType: e.detail.value })}>
              <IonLabel>Payment Method<IonText color="warning">*</IonText></IonLabel>
              <br />
              <br />
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonRadio value="COD" /> &nbsp;
                    <IonText>COD</IonText>
                  </IonCol>
                  <IonCol>
                    <IonRadio value="payOnline" />&nbsp;
                       <IonLabel>Pay Online</IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>


            </IonRadioGroup>
            <br />
            <br />
            <IonLabel>Address<IonText color="warning">*</IonText></IonLabel>
            <br />
            <br />
            <textarea value={this.state.value} onChange={this.handleChange} className="cartTextArea ion-text-center" placeholder="Enter Delivery Address"></textarea>
            <br />
          </div>
        </IonContent>
      )
    }
    const priceIndicator = () => {
      return (
        <IonFooter>
          <IonGrid>
            <IonRow className="orderFoot">
              <IonCol className="ion-text-center amount">&#8377; {amount}</IonCol>
              <IonCol className="ion-text-center">
                <button className="orderBtn" onClick={onSubmit} disabled={amount === 0 || isLoaded === false}>
                  Order Now
                  </button>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonFooter>

      )
    }

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton class="menuBtn" />
            </IonButtons>
            <IonTitle className="menuHead">Cart</IonTitle>
            <div slot="end" className="navIcon">
              <Link to="/page/Cart"><IonIcon className="Icon" md={bag} /></Link>
            </div>
            <div slot="end" className="navIcon">
              <Link to="/page/Profile"><IonIcon className="Icon" md={person} /></Link>
            </div>
          </IonToolbar>
          <IonTitle className="ion-text-center">
            <div className="toolHead">Cart List</div>
          </IonTitle>
        </IonHeader>
        <IonContent>
          {!isLoaded ? (
            <p className="LoadPad ion-text-center">Loading ...</p>
          ) : (
              cartBody()
            )}
        </IonContent>
        {priceIndicator()}
      </IonPage>
    )
  };
}
export default Cart;
