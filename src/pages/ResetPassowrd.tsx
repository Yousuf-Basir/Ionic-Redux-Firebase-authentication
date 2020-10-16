import React, { useState } from 'react';
import { IonContent, IonInput, IonItem, IonList, IonLabel, IonButton, IonLoading, IonAlert} from '@ionic/react';
import '../styles/LoginSignup.scss'

// Redux import
import { useDispatch, useSelector } from 'react-redux';
// importing auth redux store
import {sendPasswordResetEmail, setError} from '../store/actions/authActions';

import { useForm } from 'react-hook-form';

import { RootState } from '../store';

export interface PasswordResetData {
    email: string;
    successMsg: string;
  }
const ResetPassowrd: React.FC = ()=>{
        const [loading, setLoading] = useState(false);
        const { error } = useSelector((state: RootState) => state.auth);

        const [showAlert, setShowAlert] = useState({
            show: false,
            msg: ""
        })
        const { register, handleSubmit } = useForm<FormData>();
        const dispatch = useDispatch();
        


        const onSubmit = async (data:PasswordResetData) => {
            error && dispatch(setError(''));
            setLoading(true);
            error && setShowAlert({show: true, msg: error});
            await dispatch(sendPasswordResetEmail(data.email, "Email sent!"));
            setLoading(false);
            setShowAlert({show: true, msg: "Email sent"})
        };

        return(
        <IonContent scrollEvents={true}>
            <div className="loginHead">
                <h1>Reset Passowrd</h1>
                <p>Send password reset email to reset your passowrd</p>
            </div>
            
            <IonList className="loginInputList">
                <form className="loginInputList" onSubmit={handleSubmit(onSubmit)}>
                
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput ref={register} name="email" type="email" placeholder="Enter email address"></IonInput>
                    </IonItem>

                    <IonButton type="submit">Send password reset email</IonButton>
                </form>

            </IonList>


            <IonLoading isOpen={loading} onDidDismiss={() => setLoading(false)} message={'Please wait...'} />

            <IonAlert onDidDismiss={()=>{setShowAlert({...showAlert, show: false})}} isOpen={showAlert.show} message={showAlert.msg} buttons={['OK']}/>
            
        </IonContent>
    )
}

export default ResetPassowrd;