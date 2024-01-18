import { ClothingContext } from "./ClothingContext";
import { useContext, useState } from "react";
import { FilterContext } from "./FilterContext";
import ClothingFilters from "./ClothingFilters";
import ClothingCard from "./ClothingCard";

export default function GenerateOutfits() {

    // State for the randomly generated outfit
    const [outfit, setOutfit] = useState([]);
    const [savedOutfits, setSavedOutfits] = useState([]);

    const [error, setError] = useState(false);

    // Clothing array state
    const { clothes } = useContext(ClothingContext);

    // Filter function for clothes
    const { filteredClothes } = useContext(FilterContext);
    // Apply the filter on clothes
    const clothesForOutfitGeneration = filteredClothes(clothes);

    // Generate random outfit
    const randomizeOutfit = (clothesForOutfitGeneration) => {
        // Arrays for different categories
        const filterArray = (array, ...queries) => {
            return array.filter((item) => queries.includes(item.category));
        };

        const topsAndDresses = filterArray(clothesForOutfitGeneration, "shirt", "dress", "sweater");
        const hosiery = filterArray(clothesForOutfitGeneration, "leggings", "tights", "socks");
        const bottoms = filterArray(clothesForOutfitGeneration, "skirt", "pants");
        const shirts = filterArray(clothesForOutfitGeneration, "shirt");
        const layers = filterArray(clothesForOutfitGeneration, "jacket", "cardigan");

        // Save clothing pieces here for the outfit
        const randomOutfit = [];

        setError(false);

        // Choose a random top or a dress
        if(topsAndDresses.length > 0) {
            const randomTop = topsAndDresses[Math.floor(Math.random() * topsAndDresses.length)];
            randomOutfit.push(randomTop);

            //If the selected is a dress, choose leggings, tights, or socks
            if(randomTop.category === 'dress' && hosiery.length > 0) {
                const randomHosiery = hosiery[Math.floor(Math.random() * hosiery.length)];
                randomOutfit.push(randomHosiery);
            }
            else if (bottoms.length > 0) { //If the selected is a top, choose a skirt or pants
                const randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
                randomOutfit.push(randomBottom);
            }
            else {
                setError(true);
            }

            //If the first piece was a sweater, put a shirt under it
            if(randomTop.category === 'sweater' && shirts.length > 0) {
                const randomLayer = shirts[Math.floor(Math.random() * shirts.length)];
                randomOutfit.push(randomLayer);
            }
            else if (layers.length > 0) { //Else, choose a different layering piece like a cardigan
                const randomLayer = layers[Math.floor(Math.random() * layers.length)];
                randomOutfit.push(randomLayer);
            }
            else {
                setError(true);
            }

            setOutfit(randomOutfit);
        }
        else {
            setError(true);
        }
    }

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

            <button type="button" onClick={() => randomizeOutfit(clothesForOutfitGeneration)}>Generate Outfit</button>

            {/*If an outfit has been generated, show the save button*/}
            {outfit.length > 0 && <button type="button" onClick={saveOutfit}>Save Outfit</button>}

        </div>
    );
}