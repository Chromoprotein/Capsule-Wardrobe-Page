import { useState } from "react";
import BackButton from "./BackButton";
import ClothingCard from "./ClothingCard";
import PaginationControls from "./PaginationControls";
import Button from "./Button";
import Message from "./Message";
import resetStateWithDelay from "../utils/resetStateWithDelay";
import { usePaginationContext } from "../contexts/PaginationContext";
import { useOutfitContext } from "../contexts/OutfitsContext";
import { useClothingContext } from "../contexts/ClothingContext";
import { ClothingProp } from "./interfaces/interfaces";

export default function SavedOutfits() {

    // saved outfits
    const { savedOutfits, setSavedOutfits } = useOutfitContext();

    // success state for deleting
    const [isSuccess, setIsSuccess] = useState(false);
    // success state for wearing
    const [wearSuccess, setWearSuccess] = useState(false);

    // currentItems = function that slices the clothes/outfits array for pagination purposes
    const { currentItems } = usePaginationContext();

    // Clothing state for updating wear counts
    const { clothes, setClothes } = useClothingContext();

    // Delete outfit
    const handleDelete = (indexToDelete: number) => {
        const updatedOutfits = savedOutfits.filter((_, index) => index !== indexToDelete);
        setSavedOutfits(updatedOutfits);

        setIsSuccess(true);
        // Toggles the state after a timeout
        resetStateWithDelay(setIsSuccess);

        setSavedOutfits(updatedOutfits);
    };

    interface OutfitPart {
        id: string;
    }

    // Increment wear count by mapping the clothes array and checking if the outfit part's ID matches with the clothing's ID.
    // If they match, return the clothing with incremented wearCount. If they don't match, return the unaltered clothing.
    const handleWear = (outfit: OutfitPart[]) => {
        const updatedClothes = clothes.map((clothesPart: ClothingProp) => {
            const match = outfit.find((outfitPart) => clothesPart.id === outfitPart.id);
            if (match) {
                return { ...clothesPart, wearCount: clothesPart.wearCount + 1 };
            }
            return clothesPart;
        });
        setClothes(updatedClothes);
        setWearSuccess(true);
        // Resets the state after delay
        resetStateWithDelay(setWearSuccess);
    }

    // Display the outfits by matching outfit piece IDs with clothing objects from the clothes array. Returns an array of objects
    // savedOutfits = array of arrays
    // outfitArray = a single array
    // outfitPiece = an ID
    const outfitsById: (ClothingProp | undefined)[][] = savedOutfits.map(outfitArray => {
        return outfitArray.map(outfitPiece => {
            return clothes.find(clothingPiece => clothingPiece.id === outfitPiece);
        })
    });

    // Filter undefined and map outfits
    // outfitsById is an array of arrays containing clothing objects
    const mapOutfits = outfitsById.map((outfit, index) => (
        <div key={`outfit-${index}`} className="clothingCardContainer outfitContainer">
            {outfit
                .filter((piece): piece is ClothingProp => piece !== undefined)
                .map((piece) => (
                    <div key={piece.id}>
                        <ClothingCard clothingProp={piece} />
                    </div>
                ))
            }
            <div>
                <Button children="+1 Wear" eventHandler={() => handleWear(outfit.filter((piece): piece is ClothingProp => piece !== undefined))}/>

                <Button children="Delete" actionType="delete" eventHandler={() => handleDelete(index)}/>
            </div>
        </div>
    ));

    // Pagination
    const paginatedItems = currentItems(mapOutfits);

    // Close the message modal
    const onClose = () => {
        if(isSuccess) {
            setIsSuccess(false);
        }
        if(wearSuccess) {
            setWearSuccess(false);
        }
    }

    console.log(isSuccess)
    return(
        <>
        {isSuccess && <Message children="Outfit deleted!" animate={true} onClose={onClose} />}
        {wearSuccess && <Message children="Great choice! You set the outfit as worn +1 times!" animate={true} onClose={onClose} />}
        
        <div className="mainContentWrapper">

            <BackButton/>
            
            {paginatedItems.length > 0 ?
            (
                <>
                    {paginatedItems}
                    <PaginationControls clothes={mapOutfits} />
                </>
            )
            : <Message children="No outfits saved!"/>}
            
        </div>
        </>
    );
}