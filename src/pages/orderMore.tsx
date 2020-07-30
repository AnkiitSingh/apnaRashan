import { IonButtons, IonHeader, IonContent, IonGrid, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonCard, IonRow, IonCol } from '@ionic/react';
import React, { Component } from 'react';
import { cart, person } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { API } from '../Api'
import './assets/order.css';

class OrderDetails extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            products: []
        };
    }
    componentDidMount() {
        var url = this.props.match.params.OrderId
        fetch(` ${API}/user/orderDetails/${url}`)
            .then(res => res.json())
            .then(res => this.setState({ items: res, isLoaded: false }))
            .catch(() => this.setState({ error: true }));
    }
    render() {
        const { error, items, isLoaded, products } = this.state;
        let arr: any = [];
        if (isLoaded === false) {
            for (let i = 0; i < items.length; i++) {
                fetch(`${API}/getProduct/${items[i]}`)
                    .then(res => res.json())
                    .then(res => arr.push(res))
                    .then(res => this.setState({ isLoaded: true, products: [...arr] }))
                    .catch(() => console.log("error"))
            }
        }
        if (error) {
            return <div className="ion-text-center">Login to see Products{error.message}</div>;
        }
        const OrderBody = () => {
            return (
                <IonGrid>
                    <IonRow>
                        {products.map((items: any, index: any) => {
                            return <IonCol size="6" key={index}>
                                <IonCard key={index} className="ion-text-center">
                                    <div className="cartImage">
                                        <img src={`${API}/product/photo/${items._id}`} alt="order-details" className="order-img" />
                                    </div>
                                    <div className="orderData1">{items.name}</div>
                                    <div className="orderData1">Quantity: {items.quantity} </div>

                                </IonCard>
                            </IonCol>
                        })}
                    </IonRow>
                </IonGrid>
            )
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
                        <div className="toolHead">Order Details</div>
                    </IonTitle>
                </IonHeader>
                <IonContent>
                    {!isLoaded ? (
                        <p className="LoadPad ion-text-center">Loading ...</p>
                    ) : (
                            OrderBody()
                        )}

                </IonContent>
            </IonPage>
        )
    }
}
export default OrderDetails;
