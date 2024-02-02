import { ClothingContext } from "./contexts/ClothingContext";
import { useContext, useState } from "react";
import { FilterContext } from "./contexts/FilterContext";
import ClothingFilters from "./ClothingFilters";
import ClothingCard from "./ClothingCard.tsx";
import { outfitsRandomizer } from "./outfitsRandomizer";
import { OutfitContext } from "./contexts/OutfitsContext";
import BackButton from "./buttons/BackButton";

export default function GenerateOutfits() {

    // State for the randomly generated outfit
    const [outfit, setOutfit] = useState([]);
    // State for randomly generated outfits saved by the user
    const { savedOutfits, setSavedOutfits } = useContext(OutfitContext);

    const [errorMessage, setErrorMessage] = useState("");

    // All clothing pieces array state
    const { clothes } = useContext(ClothingContext);

    // Filter function for clothes
    const { filteredClothes } = useContext(FilterContext);
    // Apply the filter on clothes
    const clothesForOutfitGeneration = filteredClothes(clothes);

    // Generate random outfit
    const handleGenerateOutfit = () => {
        const { randomOutfit, errorMessage } = outfitsRandomizer(clothesForOutfitGeneration);

        setErrorMessage(errorMessage);
        setOutfit(randomOutfit);
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

    console.log(errorMessage);

    return (
        <div>

            <ClothingFilters />

            {errorMessage.length !== 0 ? <div>{errorMessage}</div> : mapOutfit}

            <button type="button" onClick={handleGenerateOutfit}>Generate Outfit</button>

            {/*If an outfit has been generated, show the save button*/}
            {outfit.length > 0 && <button type="button" onClick={saveOutfit}>Save Outfit</button>}

            <BackButton />

        </div>
    );
}