import React, { Component } from 'react';
import { IonCol, IonGrid, IonPage, IonRow } from '@ionic/react';
import { Link } from 'react-router-dom';
import './assets/profile.css';
import './about.css';

class Policy extends Component<any, any> {
    render() {
        const checker = () => {
            return (
                <div>
                    <div className="profile2">
                        <div className="about-head ion-text-center">PRIVACY STATEMENT</div>
                        <ul>
                            <li>When you purchase something from our store, as part of the buying and
                            selling process, we collect the personal information you give us such
                                    as your name, address and email address.</li>
                            <br />
                            <li>
                                We may disclose your personal information if we are required by law to do
                                so or if you violate our Terms of Service.
                                </li>
                            <br />
                            <li>
                                When you provide us with personal information to complete a transaction, verify
                                your credit card, place an order, arrange for a delivery or return a purchase, we
                                imply that you consent to our collecting it and using it for that specific reason only.
                                </li>
                            <br />
                            <li>
                                We use Razorpay for processing payments. We/Razorpay do not store your card data
                                on their servers. The data is encrypted through the Payment Card Industry Data
                                Security Standard (PCI-DSS) when processing payment.
                                </li>
                            <br />
                            <li>
                                To protect your personal information, we take reasonable precautions and follow
                                industry best practices to make sure it is not inappropriately lost, misused,
                                accessed, disclosed, altered or destroyed.
                                </li>
                            <br />
                            <li>
                                If you would like to: access, correct, amend or delete any personal information we
                                have about you, register a complaint, or simply want more information contact us
                                at VIKASH.KUM@GMAIL.COM
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

export default Policy;