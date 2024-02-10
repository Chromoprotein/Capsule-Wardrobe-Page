import { ClothingProp } from "../components/interfaces/interfaces";

type Categories = {
  [key: string]: string[];
};

// Define a type for the clothingItems object
type ClothingItems = {
  [category: string]: ClothingProp[];
};

// Define the return type of the outfitsRandomizer function
type OutfitsRandomizerReturnType = {
  randomOutfit: ClothingProp[];
  errorMessage: string;
};

export const outfitsRandomizer = (clothesForOutfitGeneration: ClothingProp[]): OutfitsRandomizerReturnType => {

    let errorMessage = "";

    // Function that makes arrays for different categories
    const filterArray = (array: ClothingProp[], ...queries: string[]): ClothingProp[] => {
        return array.filter((item) => queries.includes(item.category));
    };

    // Generic randomizing function that takes an array and returns an item
    const randomItem = (arr: ClothingProp[]): ClothingProp => {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const categories: Categories = {
        topsAndDresses: ["shirt", "dress"],
        hosiery: ["leggings", "tights", "socks"],
        bottoms: ["skirt", "pants"],
        shirts: ["shirt"],
        layers: ["jacket", "cardigan", "sweater"]
    };

    // Filter the clothesForOutfitGeneration into their respective categories
    // For each key (category), add a property with the category's name to the clothingItems object. The property's value is the filtered array
    const clothingItems: ClothingItems = {};
    Object.keys(categories).forEach(category => {
        clothingItems[category] = filterArray(clothesForOutfitGeneration, ...categories[category]);
    });

    // Save clothing pieces here for the outfit
    const randomOutfit: ClothingProp[] = [];

    // Choose a random top or a dress
    if(clothingItems.topsAndDresses.length > 0) {
        const randomTop = randomItem(clothingItems.topsAndDresses);
        randomOutfit.push(randomTop);

        //If the selected is a dress, choose leggings, tights, or socks
        if(randomTop.category === 'dress' && clothingItems.hosiery.length > 0) {
            const randomHosiery = randomItem(clothingItems.hosiery);
            randomOutfit.push(randomHosiery);
        }
        else if (clothingItems.bottoms.length > 0) { //If the selected is a top, choose a skirt or pants
            const randomBottom = randomItem(clothingItems.bottoms);
            randomOutfit.push(randomBottom);
        }
        else {
            errorMessage = "You haven't added enough bottoms to make an outfit. Add more clothes or reduce filters.";
        }

        // Choose a layering piece if available
        if (clothingItems.layers.length > 0) { 
            const randomLayer = randomItem(clothingItems.layers);
            randomOutfit.push(randomLayer);
        }

    }
    else {
        errorMessage = "You haven't added enough tops or dresses to make an outfit. Add more clothes or reduce filters.";
    }
    
    return { randomOutfit, errorMessage };
}
