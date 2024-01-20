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
import { ClothingContextProvider } from './ClothingContext';
import SubmitClothing from './SubmitClothing';
import GenerateOutfits from './GenerateOutfits';
import { FilterContextProvider } from './FilterContext';
import { PaginationContextProvider } from './PaginationContext';
import { OutfitContextProvider } from './OutfitsContext';
import SavedOutfits from './SavedOutfits';

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
  {
    path: "outfits",
    element: <SavedOutfits/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClothingContextProvider>
      <PaginationContextProvider>
        <FilterContextProvider>
          <OutfitContextProvider>
            <RouterProvider router={router} />
          </OutfitContextProvider>
        </FilterContextProvider>
      </PaginationContextProvider>
    </ClothingContextProvider>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
