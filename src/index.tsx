import React from 'react';
import ReactDOM from 'react-dom/client';

import FloorManager from './containers/floor-manager';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <FloorManager />
  </React.StrictMode>
);