import React, { createContext, useState, ReactNode } from 'react';
import clothesArray from '../dummyData/clothesArray';

interface ClothingProp { 
  id: string;
  category: string;
  brand: string;
  color: string;
  size: string;
  season: string;
  wearCount: number;
  cost: number;
  formality: string;
  img: string;
}

interface ClothingContextType {
  clothes: ClothingProp[];
  setClothes: React.Dispatch<React.SetStateAction<ClothingProp[]>>;
}

interface ClothingContextProviderProps {
  children: ReactNode;
}

export const ClothingContext = createContext<ClothingContextType>({
  clothes: [], // Initial empty array<ClothingContextpe>
  setClothes: () => {}, // Dummy function, will be replaced by actual useState function in provider
});

export const ClothingContextProvider = ({ children }: ClothingContextProviderProps) => {
  const [clothes, setClothes] = useState<ClothingProp[]>(clothesArray);

  return (
    <ClothingContext.Provider value={{ clothes, setClothes }}>
      {children}
    </ClothingContext.Provider> 
  );
};
