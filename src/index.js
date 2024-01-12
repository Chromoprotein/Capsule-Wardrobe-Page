import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import EditClothing from './EditClothing';
import { ClothingContextProvider } from './clothingContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "edit/:id",
    element: <EditClothing/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClothingContextProvider>
      <RouterProvider router={router} />
    </ClothingContextProvider>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
