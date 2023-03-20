import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { BackgroundFetch } from '@transistorsoft/capacitor-background-fetch';
import { Capacitor } from '@capacitor/core';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

let backgroundFetchRun = false;

const App: React.FC = () => {
  const initBackgroundFetch = async () => {
    await BackgroundFetch.configure(
        {
            minimumFetchInterval: 15,
        },
        async taskId => {
          // Await something async here
          // Signal to the OS that work is complete
          BackgroundFetch.finish(taskId);
        },
        async taskId => {
          // Await something async here
          // Signal to the OS that work is complete
          BackgroundFetch.finish(taskId);
        },
    );
  };

  if (!backgroundFetchRun && Capacitor.isNativePlatform()) {
    initBackgroundFetch();
    backgroundFetchRun = true;
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
