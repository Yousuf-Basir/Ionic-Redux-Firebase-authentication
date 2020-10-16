import React, { useState } from 'react';
import { IonContent, IonInput, IonItem, IonList, IonLabel, IonButton, IonLoading, IonAlert } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import '../styles/LoginSignup.scss'

// importing auth redux store
import {signup, setError} from '../store/actions/authActions';
import {RootState} from '../store'
import { SignUpData } from '../store/types';




const Signup: React.FC = ()=>{
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState({
        show: false,
        msg: ""
    })

    const { register, handleSubmit } = useForm<FormData>();

    const dispatch = useDispatch();
    const { error } = useSelector((state: RootState) => state.auth);

    const onSubmit = (data:SignUpData) => {
        error && dispatch(setError(''));
        if(data.password === data.confirmPassowrd){
            setLoading(true);
            error && setShowAlert({show: true, msg: error});
            dispatch(signup(data, () => setLoading(false)));
        }else{
            setShowAlert({show: true, msg: "Passowrd didn't match. "});
        }
    };
    
    return(
        <IonContent scrollEvents={true}>
            <div className="loginHead">
                <h1>Sign up</h1>
                <p>Lets sign up to get started</p>
            </div>

            <IonList>

            <form className="loginInputList" onSubmit={handleSubmit(onSubmit)}>

            <IonItem>
                <IonLabel position="floating">First name</IonLabel>
                <IonInput ref={register} name="firstName" type="text" placeholder="Enter first name"></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Last name</IonLabel>
                <IonInput ref={register} name="lastName" type="text" placeholder="Enter last name"></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput ref={register} name="email" type="email" placeholder="Enter email address"></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput ref={register} name="password" type="password" placeholder="Enter password"></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Retype Password</IonLabel>
                <IonInput ref={register} name="confirmPassowrd" type="password" placeholder="Re-enter password"></IonInput>
            </IonItem>

            <IonButton type="submit">Sign up</IonButton>
            </form>

        </IonList>

        <IonLoading isOpen={loading} onDidDismiss={() => setLoading(false)} message={'Please wait...'} />
        <IonAlert onDidDismiss={()=>{setShowAlert({...showAlert, show: false})}} isOpen={showAlert.show} message={showAlert.msg} buttons={['OK']}/>
        </IonContent>
    )
}

export default Signup;