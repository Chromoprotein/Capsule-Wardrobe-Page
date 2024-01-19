export const randomizeOutfit = (clothesForOutfitGeneration) => {

    let errorOccurred = false;

    // Function that makes arrays for different categories
    const filterArray = (array, ...queries) => {
        return array.filter((item) => queries.includes(item.category));
    };

    // Generic randomizing function that takes an array and returns an item
    const randomItem = (arr) => {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const topsAndDresses = filterArray(clothesForOutfitGeneration, "shirt", "dress", "sweater");
    const hosiery = filterArray(clothesForOutfitGeneration, "leggings", "tights", "socks");
    const bottoms = filterArray(clothesForOutfitGeneration, "skirt", "pants");
    const shirts = filterArray(clothesForOutfitGeneration, "shirt");
    const layers = filterArray(clothesForOutfitGeneration, "jacket", "cardigan");

    // Save clothing pieces here for the outfit
    const randomOutfit = [];

    // Choose a random top or a dress
    if(topsAndDresses.length > 0) {
        const randomTop = randomItem(topsAndDresses);
        randomOutfit.push(randomTop);

        //If the selected is a dress, choose leggings, tights, or socks
        if(randomTop.category === 'dress' && hosiery.length > 0) {
            const randomHosiery = randomItem(hosiery);
            randomOutfit.push(randomHosiery);
        }
        else if (bottoms.length > 0) { //If the selected is a top, choose a skirt or pants
            const randomBottom = randomItem(bottoms);
            randomOutfit.push(randomBottom);
        }
        else {
            errorOccurred = true;
        }

        //If the first piece was a sweater, put a shirt under it
        if(randomTop.category === 'sweater' && shirts.length > 0) {
            const randomLayer = randomItem(shirts);
            randomOutfit.push(randomLayer);
        }
        else if (layers.length > 0) { //Else, choose a different layering piece like a cardigan
            const randomLayer = randomItem(layers);
            randomOutfit.push(randomLayer);
        }
        else {
            errorOccurred = true;
        }

    }
    else {
        errorOccurred = true;
    }
    
    return { randomOutfit, errorOccurred };
}
