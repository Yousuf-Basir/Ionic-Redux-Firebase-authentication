import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import React from 'react';
import {useLocation } from 'react-router-dom';
import { logInOutline, atCircleOutline, archiveOutline, archiveSharp, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp, home, logOut } from 'ionicons/icons';
import './Menu.css';

import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../store/actions/authActions';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Inbox',
    url: '/page/Inbox',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Outbox',
    url: '/page/Outbox',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Favorites',
    url: '/page/Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Archived',
    url: '/page/Archived',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Trash',
    url: '/page/Trash',
    iosIcon: trashOutline,
    mdIcon: trashSharp
  },
  {
    title: 'Spam',
    url: '/page/Spam',
    iosIcon: warningOutline,
    mdIcon: warningSharp
  }
];

const Menu: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);
  const logoutClickHandler = () => {
    dispatch(signout());
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>App Title</IonListHeader>
          <IonNote>App Subtitle</IonNote>
          {!authenticated 
          ?<IonMenuToggle autoHide={false}>
            <IonItem routerLink="/signup" routerDirection="none" lines="none" detail={false} className={location.pathname === "/signup" ? 'selected' : ''}>
              <IonIcon slot="start" ios={atCircleOutline} md={atCircleOutline} />
              <IonLabel>Signup</IonLabel>
            </IonItem>
            <IonItem routerLink="/login" routerDirection="none" lines="none" detail={false} className={location.pathname === "/login" ? 'selected' : ''}>
              <IonIcon slot="start" ios={logInOutline} md={logInOutline} />
              <IonLabel>Login</IonLabel>
            </IonItem>
          </IonMenuToggle>
          :<IonMenuToggle autoHide={false}>
          <IonItem className={location.pathname === "/page/dashboard" ? 'selected' : ''} routerLink="/page/dashboard" routerDirection="none" lines="none" detail={false}>
            <IonIcon slot="start" ios={home} md={home} />
            <IonLabel>Dashboard</IonLabel>
          </IonItem>

            {
              appPages.map((appPage, index) => {
              return (
                  <IonItem key={index} className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
              )})
            } 

            <IonItem className="logoutButton" routerDirection="none" lines="none" detail={false} onClick={logoutClickHandler} >
              <IonIcon slot="start" ios={logOut} md={logOut} />
              <IonLabel>Log out</IonLabel>
            </IonItem>
            </IonMenuToggle>}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
