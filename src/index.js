import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ClothingContextProvider } from './contexts/ClothingContext';
import GenerateOutfits from './GenerateOutfits';
import { FilterContextProvider } from './contexts/FilterContext';
import { PaginationContextProvider } from './contexts/PaginationContext';
import { OutfitContextProvider } from './contexts/OutfitsContext';
import SavedOutfits from './SavedOutfits';
import ClothingFormLogic from './ClothingFormLogic';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "edit/:id",
    element: <ClothingFormLogic/>
  },
  {
    path: "submit",
    element: <ClothingFormLogic/>
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
