import { OutfitContext } from "./OutfitsContext";
import { useContext } from "react";
import BackButton from "./BackButton";
import ClothingCard from "./ClothingCard.tsx";
import PaginationControls from "./PaginationControls";
import { PaginationContext } from "./PaginationContext";
import DeleteButton from "./DeleteButton";

export default function SavedOutfits() {

    // saved outfits
    const { savedOutfits, setSavedOutfits } = useContext(OutfitContext);

    // currentItems = function that slices the clothes/outfits array for pagination purposes
    const { currentItems } = useContext(PaginationContext);

    // Delete outfit event handler
    const handleDelete = (indexToDelete) => {
        const updatedOutfits = savedOutfits.filter((outfit, index) => index !== indexToDelete);
        setSavedOutfits(updatedOutfits);
    };

    // Map the outfits
    // "savedOutfits" is an array of arrays (outfits) which contain objects (clothing pieces)
    const mapOutfits = savedOutfits.map((outfit, index) => (
        <div key={`outfit-${index}`} className="clothingCardContainer outfitCardContainer">
            {outfit.map(piece => (
                <div key={piece.id}>
                    <ClothingCard clothingProp={piece} />
                </div>
            ))}
            <DeleteButton handleDelete={() => handleDelete(index)}/>
        </div>
    ));

    // Pagination
    const paginatedItems = currentItems(mapOutfits);

    return(
        <div>
            
            <BackButton/>

            {paginatedItems.length > 0 ?
            (
                <>
                    <div className="clothingCardContainer">
                        {paginatedItems}
                    </div>
                    <PaginationControls clothes={mapOutfits} />
                </>
            )
            : "No outfits saved"}
            
        </div>
    );
}