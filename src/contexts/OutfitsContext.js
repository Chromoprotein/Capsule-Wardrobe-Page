import { createContext, useState } from "react";
import { outfitsArray } from "../dummyData/outfitsArray";

export const OutfitContext = createContext();

export const OutfitContextProvider = ({ children }) => {

    const [savedOutfits, setSavedOutfits] = useState(outfitsArray);

    return (
        <OutfitContext.Provider value={{ savedOutfits, setSavedOutfits }}>
            {children}
        </OutfitContext.Provider>
    );
}