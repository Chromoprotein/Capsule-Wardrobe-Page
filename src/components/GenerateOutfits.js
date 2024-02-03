import { ClothingContext } from "../contexts/ClothingContext";
import { useContext, useState } from "react";
import { FilterContext } from "../contexts/FilterContext";
import ClothingFilters from "./ClothingFilters";
import ClothingCard from "./ClothingCard";
import { outfitsRandomizer } from "../utils/outfitsRandomizer";
import { OutfitContext } from "../contexts/OutfitsContext";
import BackButton from "./buttons/BackButton";
import SimpleButton from "./buttons/SimpleButton";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";

export default function GenerateOutfits() {

    // State for the randomly generated outfit
    const [outfit, setOutfit] = useState([]);
    // State for randomly generated outfits saved by the user
    const { savedOutfits, setSavedOutfits } = useContext(OutfitContext);

    const [errorMessage, setErrorMessage] = useState("");

    // State for the all clothing pieces array
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

    // Display the generated outfit
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
        <div class="mainPageWrapper">
            <div class="navbarWrapper">
                <Link to="/"><img src={logo} className="logoImage idleStyle" alt="My Capsule Wardrobe"/></Link>
                <ClothingFilters />
                <BackButton />
            </div>

            <div className="mainContentWrapper">
                <div className="clothingCardContainer">
                    <SimpleButton text="Generate Outfit" eventHandler={handleGenerateOutfit} />
                    {/*If an outfit has been generated, show the save button*/}
                    {outfit.length > 0 && 
                    <SimpleButton text="Save Outfit" eventHandler={saveOutfit} />
                    }
                </div>

                <div className="clothingCardContainer">
                    {/*Show the outfit or error message as applicable*/}
                    {errorMessage.length !== 0 ? <div>{errorMessage}</div> : mapOutfit}
                </div>

            </div>



        </div>
    );
}