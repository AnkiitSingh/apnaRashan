import React, { Component } from 'react';
import { IonCol, IonGrid, IonPage, IonRow } from '@ionic/react';
import { Link } from 'react-router-dom';
import './assets/profile.css';
import './about.css';

class Policies extends Component {
    render() {
        const checker = () => {
            return (
                <div>
                    <div className="profile2">
                        <div className="about-head ion-text-center">Policy List</div>
                        <ul>
                            <li>
                                Terms and condition
                                <a href="page/Terms"> (click here) </a>
                            </li>
                            <br />
                            <li>
                                Refund Policy
                                <a href="page/Refund"> (click here)</a>
                            </li>
                            <br />
                            <li>
                                Privacy policy
                                <a href="page/Policy"> (click here)</a>
                            </li>
                        </ul>
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

export default Policies;