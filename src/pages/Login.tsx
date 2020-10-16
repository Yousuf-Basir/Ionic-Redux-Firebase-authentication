import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IonContent, IonInput, IonItem, IonList, IonLabel, IonButton, IonLoading, IonAlert } from '@ionic/react';
import '../styles/LoginSignup.scss'

// importing auth redux store
import {signin, setError} from '../store/actions/authActions';
import { SignInData } from '../store/types';
import { RootState } from '../store';



export interface PasswordReset {
    email: string;
    successMsg: string;
  }
const Login: React.FC = ()=>{
        const [loading, setLoading] = useState(false);
        const [showAlert, setShowAlert] = useState({
            show: false,
            msg: ""
        })
        const { register, handleSubmit } = useForm<FormData>();
        const dispatch = useDispatch();
        const { error } = useSelector((state: RootState) => state.auth);


        const onSubmit = async (data:SignInData) => {
            error && dispatch(setError(''));
            setLoading(true);
            dispatch(signin(data, () => setLoading(false)));
            error && setShowAlert({show: true, msg: error});
        };

        return(
        <IonContent scrollEvents={true}>
            <div className="loginHead">
                <h1>Login</h1>
                <p>Login with your email and password</p>
            </div>
            
            <IonList className="loginInputList">
                <form className="loginInputList" onSubmit={handleSubmit(onSubmit)}>
                
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput ref={register} name="email" type="email" placeholder="Enter email address"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput ref={register} name="password" type="password" placeholder="Enter password"></IonInput>
                    </IonItem>

                    <div>
                    <IonButton fill="outline" type="submit">Login</IonButton>
                    <Link to="/signup"><IonButton>Sign up</IonButton></Link>
                    
                    </div>
                    <IonButton fill="clear"><Link to="/resetpassword">Forgot password ?</Link></IonButton>
                </form>

            </IonList>


            <IonLoading isOpen={loading} onDidDismiss={() => setLoading(false)} message={'Please wait...'} />
            
            <IonAlert onDidDismiss={()=>{setShowAlert({...showAlert, show: false})}} isOpen={showAlert.show} message={showAlert.msg} buttons={['OK']}/>
        </IonContent>
    )
}

export default Login;