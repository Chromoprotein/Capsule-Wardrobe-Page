import React, { createContext, useState, ReactNode, useContext } from 'react';
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
  setClothes: (clothes: ClothingProp[]) => void;
}

interface ClothingContextProviderProps {
  children: ReactNode;
}

export const ClothingContext = createContext<ClothingContextType | undefined>(undefined);

export const ClothingContextProvider = ({ children }: ClothingContextProviderProps) => {
  const [clothes, setClothes] = useState<ClothingProp[]>(clothesArray);

  return (
    <ClothingContext.Provider value={{ clothes, setClothes }}>
      {children}
    </ClothingContext.Provider> 
  );
};

// Custom hook to consume the context
export function useClothingContext(): ClothingContextType {
  const context = useContext(ClothingContext);
  
  if (context === undefined) {
    throw new Error('useClothingContext must be used within a ClothingContextProvider');
  }
  
  return context;
}