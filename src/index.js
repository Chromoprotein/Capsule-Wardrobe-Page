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
import SubmitClothing from './SubmitClothing';
import GenerateOutfits from './GenerateOutfits';
import { FilterContextProvider } from './filterContext';
import { PaginationContextProvider } from './PaginationContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "edit/:id",
    element: <EditClothing/>
  },
  {
    path: "submit",
    element: <SubmitClothing/>
  },
  {
    path: "generate",
    element: <GenerateOutfits/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClothingContextProvider>
      <PaginationContextProvider>
        <FilterContextProvider>
          <RouterProvider router={router} />
        </FilterContextProvider>
      </PaginationContextProvider>
    </ClothingContextProvider>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
