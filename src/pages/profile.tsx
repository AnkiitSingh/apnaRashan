import React, { Component } from 'react';
import { IonCol, IonGrid, IonPage, IonRow } from '@ionic/react';
import { Link } from 'react-router-dom';
import { API } from '../Api';
import avatar from "./assets/avatar.svg";
import './assets/profile.css';
import signout from "../auth/userSignout"

class Profile extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: []
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
            fetch(` ${API}/user/${id()}`)
                .then(res => res.json())
                .then(res => this.setState({ data: res, isLoaded: true }))
                .catch(() => this.setState({ error: true }));
        }
    }
    render() {
        const { data } = this.state;
        const checker = () => {
            if (localStorage.getItem("jwt") === null) {
                return (
                    <div>
                        <div className="ion-text-center profile">
                            <div className="logCheck">
                                Login To See Profile
                        </div>
                            <div className="profBtn">
                                <Link to="/page/Login"><button className="proBtn">Login</button></Link>
                            </div>
                        </div>
                        <div className="footSpace2"></div>
                    </div>

                )
            }
            return (
                <div>
                    <div className="profile">
                        <div className="ion-text-center proPic"><img src={avatar} alt="avatar"></img></div>
                        <div className="email ion-text-center">{data.email}</div>
                        <div className="address ion-text-center">Ranchi, Jharkhand</div>
                        <div className="profBtn ion-text-center">
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="6">
                                        <Link to="/"><button className="proBtn1" onClick={signout}>Logout</button></Link>
                                    </IonCol>
                                    <IonCol size="6">
                                        <Link to="/page/Home"><button className="proBtn">Home</button></Link>
                                    </IonCol>

                                </IonRow>
                            </IonGrid>
                        </div>
                        <div className="phoneNo">Mobile No : {data.phoneNo}</div>
                        <div className="address1">Address: {data.address}</div>
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

export default Profile;