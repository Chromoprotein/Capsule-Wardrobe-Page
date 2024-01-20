import { OutfitContext } from "./OutfitsContext";
import { useContext } from "react";
import BackButton from "./BackButton";
import ClothingCard from "./ClothingCard";
import PaginationControls from "./PaginationControls";
import { PaginationContext } from "./PaginationContext";

export default function SavedOutfits() {

    // saved outfits
    const { savedOutfits } = useContext(OutfitContext);

    // currentItems = function that slices the clothes/outfits array for pagination purposes
    const { currentItems } = useContext(PaginationContext);

    // Map the outfits
    // "savedOutfits" is an array of arrays (outfits) which contain objects (clothing pieces)
    const mapOutfits = savedOutfits.map((outfit, index) => (
        <div key={`outfit-${index}`} className="clothingCardContainer outfitCardContainer">
            {outfit.map(piece => (
                <div key={piece.id}>
                    <ClothingCard clothingProp={piece} />
                </div>
            ))}
        </div>
    ));

    // Pagination
    const paginatedItems = currentItems(mapOutfits);

    return(
        <div>
            
            <BackButton/>

            <div className="clothingCardContainer">
                {paginatedItems}
            </div>

            {/*Next, previous, and page number buttons. Takes an array of filtered clothes*/}
            <PaginationControls clothes={mapOutfits} />
        </div>
    );
}