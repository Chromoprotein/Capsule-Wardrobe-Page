import { createContext, useState, ReactNode } from "react";
import { outfitsArray } from "../dummyData/outfitsArray";


interface OutfitsContextType {
  savedOutfits: string[][];
  setSavedOutfits: (outfits: string[][]) => void;
}

export const OutfitContext = createContext<OutfitsContextType>({
  savedOutfits: [], // Initial empty array<ClothingContextpe>
  setSavedOutfits: () => {}, // Dummy function, will be replaced by actual useState function in provider
});

interface OutfitContextProviderProps {
  children: ReactNode;
}

export const OutfitContextProvider = ({ children }: OutfitContextProviderProps) => {

    const [savedOutfits, setSavedOutfits] = useState<string[][]>(outfitsArray);

    return (
        <OutfitContext.Provider value={{ savedOutfits, setSavedOutfits }}>
            {children}
        </OutfitContext.Provider>
    );
}