import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IonPage } from '@ionic/react';
import './assets/landing.css';
import apna from './assets/apna.jpg';
import './fonts/font1.ttf'
const Landing = () => {
    useEffect(() => {
        if (window.screen.width > 1000) { // eslint-disable-line
            alert("This is a mobile friendly web-site. Switch to mobile view")
            alert("Mobile Friendly Web Site")
        }
    }, [window.screen.width]) // eslint-disable-line
    return (
        <IonPage>
            <div className="background">
                <div className="align ion-text-center"><img src={apna} alt="cart" className="image" /></div>
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