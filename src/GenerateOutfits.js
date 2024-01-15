import { ClothingContext } from "./clothingContext";
import { useContext } from "react";
import { FilterContext } from "./filterContext";
import ClothingFilters from "./ClothingFilters";

export default function GenerateOutfits() {

    const { clothes, setClothes } = useContext(ClothingContext);
    const { filters, setFilters, handleFiltersChange, resetFilters, resetButtonState, setResetButtonState } = useContext(FilterContext);

    return (
        <div>
            <ClothingFilters filters={filters} resetButtonState={resetButtonState} resetFilters={resetFilters} handleFiltersChange={handleFiltersChange} />
        </div>
    );
}