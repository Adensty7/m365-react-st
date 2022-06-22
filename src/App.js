import { Providers, ProviderState } from '@microsoft/mgt-element';
import { Agenda, Login, People, PeoplePicker, Person, PersonCard } from '@microsoft/mgt-react';
import React, { useState, useEffect } from 'react';
import './App.css';

function useIsSignedIn() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const updateState = () => {
      const provider = Providers.globalProvider;
      setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
    };

    Providers.onProviderUpdated(updateState);
    updateState();

    return () => {
      Providers.removeProviderUpdatedListener(updateState);
    }
  }, []);

  useEffect(() => {
    document.title = "Micrsoft Graph API"
  }, [])

  return [isSignedIn];
}

function App() {
  const [isSignedIn] = useIsSignedIn();

  return (
    <div className="App">
      <header>
        <Login />
      </header>
      <div>
        {isSignedIn &&
          <PersonCard personQuery='me' showPresence  />}
      </div>
      <div>
        {isSignedIn &&
          <Agenda preferredTimezone='' />}
      </div>
      
    </div>
  );
}

export default App;