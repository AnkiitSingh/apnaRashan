import React, { Component } from 'react';
import { IonCol, IonGrid, IonPage, IonRow } from '@ionic/react';
import { Link } from 'react-router-dom';
import './assets/profile.css';
import './about.css';

class Refund extends Component {
    render() {
        const checker = () => {
            return (
                <div>
                    <div className="profile2">
                        <div className="about-head ion-text-center">Refund Policy</div>
                        <ul>
                            <li>Returns
                                <br></br>
                            Our policy lasts 3 days. If 3 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.
                            To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
                            </li>
                            <br />
                            <li>
                                Refunds (if applicable)
                            <br />
                            Once your return is received and inspected, We will notify you of the approval or rejection of your refund.
                            If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.
                            </li>
                            <br />
                            <li>
                                Late or missing refunds (if applicable)
                            <br />
                            If you haven’t received a refund yet, first check your bank account again. If the refund is still
                            not recieved contact us at VIKASH.KUM@GMAIL.COM
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

export default Refund;