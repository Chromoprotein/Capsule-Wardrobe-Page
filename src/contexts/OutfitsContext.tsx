import { createContext, useState, ReactNode, useContext } from "react";
import { outfitsArray } from "../dummyData/outfitsArray";

interface OutfitsContextType {
  savedOutfits: string[][];
  setSavedOutfits: (outfits: string[][]) => void;
}

interface OutfitContextProviderProps {
  children: ReactNode;
}

export const OutfitContext = createContext<OutfitsContextType | undefined>(undefined);

export const OutfitContextProvider = ({ children }: OutfitContextProviderProps) => {

    const [savedOutfits, setSavedOutfits] = useState<string[][]>(outfitsArray);

    return (
        <OutfitContext.Provider value={{ savedOutfits, setSavedOutfits }}>
            {children}
        </OutfitContext.Provider>
    );
}

// Custom hook to consume the context
export function useOutfitContext(): OutfitsContextType {
  const context = useContext(OutfitContext);
  
  if (context === undefined) {
    throw new Error('useOutfitContext must be used within a OutfitContextProvider');
  }
  
  return context;
}