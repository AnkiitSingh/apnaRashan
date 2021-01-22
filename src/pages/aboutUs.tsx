import React, { Component } from 'react';
import { IonCol, IonGrid, IonPage, IonRow } from '@ionic/react';
import { Link } from 'react-router-dom';
import './assets/profile.css';
import './about.css';

class AboutUs extends Component<any, any> {
    render() {
        const checker = () => {
            return (
                <div>
                    <div className="profile">
                        <div className="about-head ion-text-center">Apna Rashan</div>
                        <div className="about-body ion-text-center">
                            Online Grocery Shopping is now easy with "APNA RASHAN".
                            <br />
                            APNA RASHAN is an Online Grocery Store where all your daily needs are just
                             ONE CLICK AWAY. Get everything you need, right to your doorstep.
                            We offer a wide range of products in every category at reasonable price,
                            anywhere in Ranchi now.
                        </div>
                        <div className="about-address ion-text-center">
                            Address: Sadabhar Colony, Namkum, Ranchi
                            <br />
                            Email: VIKASH.KUM@GMAIL.COM
                        </div>

                        <div className="profBtn ion-text-center">
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="12">
                                        <Link to="/page/Home"><button className="proBtn">Home</button></Link>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </div>
                    </div>
                    <div className="footSpace"></div>
                </div>
            )
        }
        return (
            <IonPage className="background4">
                <div className="profile1">
                    {checker()}
                </div>
            </IonPage>
        )
    }
}

export default AboutUs;