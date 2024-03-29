import logo from './logo.svg';
import './App.css';

import { Transak } from '@transak/transak-sdk';

const transakConfig = {
  apiKey: 'cf5868eb-a8bb-45c8-a2db-4309e5f8b412', // (Required)
  environment: Transak.ENVIRONMENTS.STAGING, // (Required)
  defaultCryptoCurrency: 'ETH',
  themeColor: '000000', // App theme color
  hostURL: window.location.origin,
  widgetHeight: "700px",
  widgetWidth: "500px",
};

export function openTransak() {
  const transak = new Transak(transakConfig);

  transak.init();

  // To get all the events
  Transak.on('*', (data) => {
    console.log(data);
  });

  // This will trigger when the user closed the widget
  Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
    console.log('Transak SDK closed!');
  });

  /*
  * This will trigger when the user has confirmed the order
  * This doesn't guarantee that payment has completed in all scenarios
  * If you want to close/navigate away, use the TRANSAK_ORDER_SUCCESSFUL event
  */
  Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, (orderData) => {
    console.log(orderData);
  });

  /*
  * This will trigger when the user marks payment is made
  * You can close/navigate away at this event
  */
  Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
    console.log(orderData);
    transak.close();
  });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>
          Let mainstream users buy crypto in your app

          Onboard more users to crypto and increase revenue through a simple developer integration.
        </h3>
        <button onClick={() => openTransak()}>
          Buy Crypto
        </button>
      </header>
    </div>
  );
}

export default App;
