import { OutfitContext } from "../contexts/OutfitsContext";
import { useContext, useState } from "react";
import BackButton from "./BackButton";
import ClothingCard from "./ClothingCard";
import PaginationControls from "./PaginationControls";
import { PaginationContext } from "../contexts/PaginationContext";
import Button from "./Button";
import { ClothingContext } from "../contexts/ClothingContext";

export default function SavedOutfits() {

    // saved outfits
    const { savedOutfits, setSavedOutfits } = useContext(OutfitContext);
    const [isSuccess, setIsSuccess] = useState(false);

    // currentItems = function that slices the clothes/outfits array for pagination purposes
    const { currentItems } = useContext(PaginationContext);

    // Clothing state for updating wear counts
    const { clothes, setClothes } = useContext(ClothingContext);

    // Delete outfit
    const handleDelete = (indexToDelete) => {
        const updatedOutfits = savedOutfits.filter((_, index) => index !== indexToDelete);
        setSavedOutfits(updatedOutfits);

        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
        }, 3000);
        setSavedOutfits(updatedOutfits);
    };

    // Increment wear count by mapping the clothes array and checking if the outfit part's ID matches with the clothing's ID.
    // If they match, return the clothing with incremented wearCount. If they don't match, return the unaltered clothing.
    const handleWear = (outfit) => {
        const updatedClothes = clothes.map(clothesPart => {
            const match = outfit.find(outfitPart => clothesPart.id === outfitPart.id);
            if (match) {
                return { ...clothesPart, wearCount: clothesPart.wearCount + 1 };
            }
            return clothesPart;
        });
        setClothes(updatedClothes);
    }

    // Display the outfits by matching outfit piece IDs with clothing objects from the clothes array. Returns an array of objects
    // savedOutfits = array of arrays
    // outfitArray = a single array
    // outfitPiece = an ID
    const outfitsById = savedOutfits.map(outfitArray => {
        return outfitArray.map(outfitPiece => {
            return clothes.find(clothingPiece => clothingPiece.id === outfitPiece);
        })
    });

    // Map the outfits
    const mapOutfits = outfitsById.map((outfit, index) => (
        <div key={`outfit-${index}`} className="clothingCardContainer outfitContainer">
            {outfit.map(piece => (
                <div key={piece.id}>
                    <ClothingCard clothingProp={piece} />
                </div>
            ))}
            <div>
                <Button children="+1 Wear" eventHandler={() => handleWear(outfit)}/>
                <Button children="Delete" actionType="delete" eventHandler={() => handleDelete(index)}/>
            </div>
        </div>
    ));

    // Pagination
    const paginatedItems = currentItems(mapOutfits);

    return(
        <div className="mainContentWrapper">
            
            <BackButton/>

            {isSuccess && <div className="message success-animation"><p>Outfit deleted!</p></div>}
            
            {paginatedItems.length > 0 ?
            (
                <>
                    {paginatedItems}
                    <PaginationControls clothes={mapOutfits} />
                </>
            )
            : <div class="message">No outfits saved</div>}
            
        </div>
    );
}