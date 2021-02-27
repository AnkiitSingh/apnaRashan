import React, { Component } from 'react';
import { IonCol, IonGrid, IonPage, IonRow } from '@ionic/react';
import { Link } from 'react-router-dom';
import './assets/profile.css';
import './about.css';

class Terms extends Component {
    render() {
        const checker = () => {
            return (
                <div>
                    <div className="profile2">
                        <div className="about-head ion-text-center">Terms and Conditions</div>
                        <ul>
                            <li>This application is operated by Apna Rashan. Throughout the site, the terms “we”, “us”
                            and “our” refer to Apna Rashan.Apna Rashan offers this application, including all information, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
                            </li>
                            <li>
                                By agreeing to these Terms of Service, you represent that you are at least the age of majority
                                in your state or province of residence.A breach or violation of any of the Terms will result in an immediate termination of your Services.
                            </li>
                            <li>
                                You understand that your content (not including credit card information), may be transferred unencrypted
                                and involve (a) transmissions over various networks and (b) changes to conform and adapt to technical requirements of connecting networks or devices.
                            </li>
                            <li>
                                Prices for our products are subject to change without notice.
                            </li>
                            <li>
                                We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order.
                            </li>
                            <li>
                                Your submission of personal information through the store is governed by our Privacy Policy.
                            </li>
                            <li>
                                The obligations and liabilities of the parties incurred prior to the termination date
                                shall survive the termination of this agreement for all purposes.
                            </li>
                            <li>
                                You can review the most current version of the Terms of Service at any time at this page.
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

export default Terms;