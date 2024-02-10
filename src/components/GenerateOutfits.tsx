import { useState } from "react";
import ClothingFilters from "./ClothingFilters";
import ClothingCard from "./ClothingCard";
import { outfitsRandomizer } from "../utils/outfitsRandomizer";
import BackButton from "./BackButton";
import Button from "./Button";
import Message from "./Message";
import { useOutfitContext } from "../contexts/OutfitsContext";
import { useClothingContext } from "../contexts/ClothingContext";
import { useFilterContext } from "../contexts/FilterContext";

export default function GenerateOutfits() {

    // State for randomly generated outfits saved by the user
    const { savedOutfits, setSavedOutfits } = useOutfitContext();
    const [isSuccess, setIsSuccess] = useState(false);

    // State for the all clothing pieces array
    const { clothes } = useClothingContext();

    // Filter function for clothes
    const { filteredClothes } = useFilterContext();
    // Apply the filter on clothes
    const clothesForOutfitGeneration = filteredClothes(clothes);

    // State for the randomly generated outfit and for the error message
    // values: randomOutfit, errorMessage
    const [outfit, setOutfit] = useState(() => outfitsRandomizer(clothesForOutfitGeneration));

    // Generate random outfit
    const handleGenerateOutfit = () => {
        setIsSuccess(false);
        const { randomOutfit, errorMessage } = outfitsRandomizer(clothesForOutfitGeneration);

        setOutfit(prevOutfit => ({
            ...prevOutfit,
            errorMessage: errorMessage,
            randomOutfit: randomOutfit,
        }))
    };

    // Display the generated outfit
    const mapOutfit = outfit.randomOutfit
        .map((piece) => (
        <div key={piece.id}>
            <ClothingCard clothingProp={piece} />
        </div>
        )
    );

    const saveOutfit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const ids = outfit.randomOutfit.map(piece => piece.id);
        setSavedOutfits([...savedOutfits, ids]);
        setIsSuccess(true);
        console.log(ids)
    }

    return (
        <div className="mainPageWrapper">
            <div className="navbarWrapper">

                <ClothingFilters />

                <Button children="Re-generate Outfit" eventHandler={handleGenerateOutfit} />

                {/*If an outfit has been generated, show the save button*/}
                {outfit.errorMessage.length === 0 && 
                    <Button children="Save Outfit" isSuccess={isSuccess} eventHandler={saveOutfit} />
                }

                <BackButton />
            </div>

            <div className="mainContentWrapper">
                <div className="clothingCardContainer">
                    {/*Show the outfit or error message as applicable*/}
                    {outfit.errorMessage.length !== 0 ? <Message children={outfit.errorMessage} /> : mapOutfit}
                </div>
            </div>
        </div>
    );
}