import React from "react";
import { registerRootComponent } from "expo";
import { Provider } from "react-redux"; // Import Provider from react-redux
import App from "./src/App";
import store from "./src/redux/store";

// Wrap your main App component with the Provider and pass the store to it
const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

registerRootComponent(Root); // Register the Root component
