import { ClothingContext } from "./ClothingContext";
import { useContext, useState } from "react";
import { FilterContext } from "./FilterContext";
import ClothingFilters from "./ClothingFilters";
import ClothingCard from "./ClothingCard";
import { randomizeOutfit } from "./randomizer";

export default function GenerateOutfits() {

    // State for the randomly generated outfit
    const [outfit, setOutfit] = useState([]);
    // State for randomly generated outfits saved by the user
    const [savedOutfits, setSavedOutfits] = useState([]);

    const [error, setError] = useState(false);

    // All clothing pieces array state
    const { clothes } = useContext(ClothingContext);

    // Filter function for clothes
    const { filteredClothes } = useContext(FilterContext);
    // Apply the filter on clothes
    const clothesForOutfitGeneration = filteredClothes(clothes);

    // Generate random outfit
    const handleGenerateOutfit = () => {
        const { randomOutfit, errorOccurred } = randomizeOutfit(clothesForOutfitGeneration);

        if (errorOccurred) {
            setError(true);
        } else {
            setOutfit(randomOutfit);
        }
    };

    const mapOutfit = outfit
        .map((piece) => (
        <div key={piece.id}>
            <ClothingCard clothingProp={piece} />
        </div>
        )
    );

    const saveOutfit = (event) => {
        setSavedOutfits([...savedOutfits, outfit]);
    }

    return (
        <div>

            <ClothingFilters />

            {error ? <div>Error: Not enough clothes to generate outfits!</div> : mapOutfit}

            <button type="button" onClick={handleGenerateOutfit}>Generate Outfit</button>

            {/*If an outfit has been generated, show the save button*/}
            {outfit.length > 0 && <button type="button" onClick={saveOutfit}>Save Outfit</button>}

        </div>
    );
}