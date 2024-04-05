import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const transfiQueryParams = {
  apiKey: "Q2sUGOFUXOJ1R0GV",
  fiatTicker: "USD",
  fiatAmount: "100",
  redirectUrl: "google.com",
  cryptoTicker: "ETH",
  language: "vi",
};

export function getSrc() {
  const uri = "https://sandbox-buy.transfi.com?"; //sandbox option
  const queryEntries = Object.entries(transfiQueryParams);
  const query = queryEntries.map((param, index) => {
    const [key, value] = param;
    if (index === (queryEntries.length - 1)) return `${key}=${value}`;
    return `${key}=${value}&`;
  }).join('');

  const src = uri + query;
  return src;
}

function App() {
  const [showIframe, setShowIframe] = useState(false);

  const handleButtonClick = () => {
    setShowIframe(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>
          On-Ramps
        </h3>
        <button onClick={handleButtonClick}>TransfiPay</button>
        {
          showIframe && (<iframe
            height="625"
            title="TransFi Ramp Widget"
            src={getSrc()}
            frameBorder="no"
            allowransparency="true"
            allowFullScreen=""
            style={{ display: "block", width: "100%", maxHeight: "625px", maxWidth: "500px", borderRadius: "15px" }}
          />)
        }
      </header>
    </div>
  );
}

export default App;
