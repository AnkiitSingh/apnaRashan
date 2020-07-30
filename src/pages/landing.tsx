import React from 'react';
import { Link } from 'react-router-dom';
import { IonPage } from '@ionic/react';
import './assets/landing.css';
import cart from './assets/cart.jpg';
import './fonts/font1.ttf'
const Landing = () => {
    return (
        <IonPage>
            <div className="background">
                <div className="align ion-text-center"><img src={cart} alt="cart" className="image" /></div>
                <div className="landing-text">
                    Apna
            </div>
                <div className="landing-text2">
                    Rashan
            </div>
                <div className="landing-desc">
                    Order grocery with an ease
            </div>
                <div className="ion-text-center">
                    <Link to='/page/Home'>
                        <button slot="start" color="light" className="btn-txt">Order Products</button>
                    </Link>
                </div>
            </div>
        </IonPage>
    )
}


export default Landing;