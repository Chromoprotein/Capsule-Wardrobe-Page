import { ClothingContext } from "./ClothingContext";
import { useContext, useState } from "react";
import { FilterContext } from "./FilterContext";
import ClothingFilters from "./ClothingFilters";

export default function GenerateOutfits() {

    const { clothes, setClothes } = useContext(ClothingContext);
    const { filters, setFilters, handleFiltersChange, resetFilters, resetButtonState, setResetButtonState, filteredClothes } = useContext(FilterContext);

    //Use these clothes for generating outfits
    if(clothes.length > 0) {
        const clothesForOutfitGeneration = filteredClothes(clothes);

        const topsAndDresses = clothesForOutfitGeneration.filter((item) => item.category === 'shirt' || 'dress' || 'sweater');
        const hosiery = clothesForOutfitGeneration.filter((item) => item.category === 'leggings' || 'tights' || 'socks');
        const bottoms = clothesForOutfitGeneration.filter((item) => item.category === 'skirt' || 'pants');
        const shirts = clothesForOutfitGeneration.filter((item) => item.category === 'shirt');
        const layers = clothesForOutfitGeneration.filter((item) => item.category === 'jacket' || 'cardigan');

        const randomBottoms = {};
        const randomLayer = {};

        //Choose a random top or a dress
        const randomTop = topsAndDresses[Math.floor(Math.random() * topsAndDresses.length)];

        //Start saving ids
        const randomOutfit = [randomTop.id];

        //If the selected is a dress, choose leggings, tights, or socks
        if(randomTop.category === 'dress') {
            //randomBottoms = hosiery[Math.floor(Math.random() * hosiery.length)];
        }
        else { //If the selected is a top, choose a skirt or pants
            //randomBottoms = bottoms[Math.floor(Math.random() * bottoms.length)];
        }

        const randomOutfitWithBottom = [...randomOutfit, randomBottoms.id];

        //If the first piece was a sweater, put a shirt under it
        if(randomTop.category === 'sweater') {
            //randomLayer = shirts[Math.floor(Math.random() * shirts.length)];
        }
        else { //Else, choose a different layer
           // randomLayer = layers[Math.floor(Math.random() * layers.length)];
        }

        const randomFullOutfit = [...randomOutfitWithBottom, randomLayer.id];
    }

    return (
        <div>
            <ClothingFilters />
        </div>
    );
}