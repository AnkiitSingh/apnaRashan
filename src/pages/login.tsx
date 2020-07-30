import { IonPage, IonCard, IonText, IonLabel } from '@ionic/react';
import React, { useState } from 'react';
import './assets/login.css'
import { Link, Redirect } from 'react-router-dom';
import avatar from "./assets/avatar.svg";
import signin from "../auth/userSignin";
import authenticate from "../auth/userAuthenticate";
import isAutheticated from "../auth/userIsAuthenticated";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    phoneNo: "",
    error: true,
    success: false
  });
  const { email, phoneNo, error } = values;

  const handleChange = (name: string) => (event: any) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event: any) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signin({ email, phoneNo })
      .then((data: any) => {
        if (data.error) {
          console.log("error")
          setValues({ ...values, error: data.error, success: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              success: true,
              email: "",
              phoneNo: ""
            });
          });
        }
      })
      .catch(() => { console.log("signin request failed") });
  };

  const performRedirect = () => {
    if (isAutheticated()) {
      return <Redirect to="/page/Home" />;
    }
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="error ion-text-center">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  const loginForm = () => {

    return (
      <div className="background1">
        <div className="padding-top">
          <IonCard className="card">
            <div className="ion-text-center pad"><img src={avatar} alt="cart" className="avatar" /></div>
            <div className="ion-text-center header">Log-In</div>
            <div className="back">
              <form className="back pad2">
                <IonLabel position="stacked" >Email Id<IonText color="danger">*</IonText></IonLabel>
                <br />
                <input onChange={handleChange("email")} value={email} className="input"></input>
                <br />
                <br />
                <IonLabel position="stacked">Phone No.<IonText color="danger">*</IonText></IonLabel>
                <br />
                <input type="string" onChange={handleChange("phoneNo")} value={phoneNo} className="input"></input>

                <div className="ion-text-center pad">
                  <button onClick={onSubmit} className="ion-text-mid logButton" color="tertiary">Submit</button>
                </div>

              </form>
              <div className="foot ion-text-center">
                <IonText className="ion-text-center">Dont have Account ?<br />
                  <Link to="/page/SignUp">SignUp</Link>
                </IonText>
              </div>
            </div>
          </IonCard>
        </div>
      </div>
    )
  }

  return (
    <IonPage >
      {loginForm()}
      {performRedirect()}
      {errorMessage()}
    </IonPage>
  );
};


export default Login;
