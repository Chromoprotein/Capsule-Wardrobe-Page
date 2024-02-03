import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import GenerateOutfits from './components/GenerateOutfits';
import SavedOutfits from './components/SavedOutfits';
import ClothingFormLogic from './components/ClothingFormLogic';
import { ClothingContextProvider, FilterContextProvider, OutfitContextProvider, PaginationContextProvider } from './contexts/index.js';

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