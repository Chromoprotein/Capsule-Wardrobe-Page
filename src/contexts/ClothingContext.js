import React, { createContext, useState } from 'react';
import clothesArray from '../dummyData/clothesArray';

export const ClothingContext = createContext();

export const ClothingContextProvider = ({ children }) => {
  const [clothes, setClothes] = useState(clothesArray);

  return (
    <ClothingContext.Provider value={{ clothes, setClothes }}>
      {children}
    </ClothingContext.Provider> 
  );
};
