import { IonButtons, IonContent, IonGrid, IonHeader, IonButton, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonCard, IonRow, IonCol } from '@ionic/react';
import React, { Component } from 'react';
import { cart, person } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { API } from '../Api'
import './assets/order.css';

class Order extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
        const local: any = localStorage.getItem("jwt");
        var ide: any = "";
        const id = () => {
            if (local !== null) {
                const user: any = JSON.parse(local);
                ide = user.user._id;
                return (
                    ide
                )
            }
        }
        if (local !== null) {
            fetch(` ${API}/user/order/${id()}`)
                .then(res => res.json())
                .then(res => this.setState({ items: res, isLoaded: true }))
                .catch(() => this.setState({ error: true }));
        }
        this.setState({ isLoaded: true })
    }
    render() {
        const { error, items, isLoaded } = this.state;
        if (error) {
            return ("error");
        }
        const OrderContent = () => {
            if (localStorage.getItem("jwt") !== null) {
                return (
                    <IonContent>
                        {items.slice(0).reverse().map((items: any, index: any) => {
                            const local: any = localStorage.getItem("jwt");
                            const user: any = JSON.parse(local);
                            const cancleOrder = () => {
                                return fetch(`${API}/order/cancle/${user.user._id}/${orderId}`, {
                                    method: "PUT",
                                    headers: {
                                        Accept: "application/json",
                                        "Content-Type": "application/json"
                                    }
                                })
                                    .then(response => {
                                        return response.json();
                                    })
                                    .then(() => alert("Cancle Order !"))
                                    .then(() => { window.location.reload(false); })
                                    .catch(err => console.log(err));
                            }
                            const orderMore = () => {
                                return (`/page/Order/${orderId}`)
                            }
                            try {
                                var status = items.status;
                                var products = items.products.length;
                                var orderId = items._id;
                                var transaction = items.transaction_id;
                                var amount = items.amount;
                                var address = items.address;
                                var date = items.date;
                                var dte: any = new Date(date);
                                var day = dte.getDate();
                                var month = dte.getMonth();
                                var year = dte.getFullYear()
                            }
                            catch{

                            }
                            return (
                                <IonCard key={index}>
                                    <IonGrid >
                                        <div className="orderHead ion-text-center">Status:- {status}</div>
                                        <IonRow>
                                            <IonCol>
                                                <div className="orderData">Total Products:- {products}</div>
                                                <div className="orderData">Total Amount:- {amount}</div>
                                            </IonCol>
                                            <IonCol>
                                                <div className="orderData">
                                                    Date:- {day}/{month}/{year}
                                                </div>
                                                <div className="orderData">Deliver To:- {address}</div>
                                            </IonCol>
                                        </IonRow>
                                        <div className="orderFoot1 ion-text-center">Transaction:- {transaction}</div>
                                    </IonGrid>
                                    <IonGrid>
                                        <IonRow className="ion-text-center">
                                            <IonCol>
                                                <button className="orderCancle" onClick={cancleOrder}>Cancel</button>
                                            </IonCol>
                                            <IonCol>
                                                <Link to={orderMore()}><button className="orderMore">Details</button></Link>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonCard>
                            )
                        })}
                    </IonContent>
                )
            }
            else {
                return (
                    <div className="ion-text-center">
                        <div className="paddingOrder ion-text-center">
                            <div className="ion-text-center">Login to See Orders !</div>
                            <br />
                            <Link to="/page/Login">
                                <IonButton>Login</IonButton>
                            </Link>
                        </div></div>
                )
            }
        }

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton class="menuBtn" />
                        </IonButtons>
                        <IonTitle className="menuHead">Orders</IonTitle>
                        <div slot="end" className="navIcon">
                            <Link to="/page/Cart"><IonIcon className="Icon" md={cart} /></Link>
                        </div>
                        <div slot="end" className="navIcon">
                            <Link to="/page/Profile"><IonIcon className="Icon" md={person} /></Link>
                        </div>
                    </IonToolbar>
                    <IonTitle className="ion-text-center">
                        <div className="toolHead">Your Orders</div>
                    </IonTitle>
                </IonHeader>
                <IonContent>
                    {!isLoaded ? (
                        <p className="LoadPad ion-text-center">Loading ....</p>
                    ) : (
                            OrderContent()
                        )}

                </IonContent>
            </IonPage>
        )
    }
}

export default Order;
