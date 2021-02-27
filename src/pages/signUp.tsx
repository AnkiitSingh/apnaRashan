import { IonPage, IonCard, IonText, IonLabel } from '@ionic/react';
import React, { useState } from 'react';
import './assets/login.css'
import avatar from "./assets/avatar.svg"
import signup from "../auth/userSignup"
import { Link, useHistory } from 'react-router-dom';

const SignUp = () => {
  const history = useHistory()
  const [values, setValues] = useState({
    email: "",
    phoneNo: "",
    address: "",
    error: true,
    success: false,
    redirect: false
  });
  const { email, phoneNo, address, error } = values;

  const handleChange = (name: string) => (event: any) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event: any) => {
    event.preventDefault();
    if (email.length <= 10) {
      alert("Enter a valid email address")
    }
    else if (phoneNo.length < 10) {
      alert("Enter a valid phone No")
    }
    else {
      setValues({ ...values, error: false });
      signup({ email, phoneNo, address })
        .then((data: any) => {
          if (data.error) {
            setValues({ ...values, error: data.error, success: false, redirect: true });
            return Promise.reject("Error")
          } else {
            setValues({
              ...values,
              email: "",
              phoneNo: "",
              address: "",
              error: false,
              success: true,
              redirect: false
            });
          }
        })
        .then(() => history.push('/page/Login'))
        .catch((data: any) => {
          console.log(data.error);
        });
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
  const signupFn = () => {
    return (
      <div className="padding-top2">
        <IonCard className="card">
          <div className="pad ion-text-center"><img src={avatar} alt="cart" className="avatar" /></div>
          <div className="header">Sign-Up</div>
          <div className="back">
            <form className="back pad2">

              <IonLabel position="stacked">
                Email Id
                  <IonText color="danger">*</IonText></IonLabel>
              <br />
              <input onChange={handleChange("email")} className="input"></input>
              <br />
              <br />
              <IonLabel position="stacked">
                Phone No.
              <IonText color="danger">*</IonText></IonLabel>
              <br />
              <input onChange={handleChange("phoneNo")} className="input"></input>
              <br />
              <br />
              <IonLabel position="stacked">
                Address
                <IonText color="danger" >*</IonText></IonLabel>
              <br />
              <textarea onChange={handleChange("address")} className="inputArea"></textarea>
              <br /><br />

              <div className="ion-text-center">
                <IonLabel >Currently only active in<IonText color="danger" className="pad">*</IonText></IonLabel>
                <br />
                <IonText >( Ranchi, Jharkhand )</IonText>
                <br />
                <IonLabel >By clicking submit you agree the Terms and condition
                                <a href="page/Terms"> (click here) </a>
                  <br />
                </IonLabel>
              </div>

              <div className="ion-text-center pad">
                <Link to="/page/Login"><button className="logButton" color="tertiary" onClick={onSubmit}>Submit</button></Link>
              </div>
            </form>
          </div>
        </IonCard>
      </div>
    )
  }
  return (
    <IonPage >
      <div className="background1">
        {signupFn()}
      </div>
      {errorMessage()}
    </IonPage>
  );
};


export default SignUp;
