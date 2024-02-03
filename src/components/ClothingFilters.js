import colors from "../dummyData/ColorsArray";
import { formality } from "../dummyData/formalityArray";
import { useContext } from "react";
import { FilterContext } from "../contexts/FilterContext";
import { seasons } from "../dummyData/seasonsArray";
import { ColorPicker, SelectMenu } from "./FormComponents";
import ResetButton from "./buttons/ResetButton";

export default function ClothingFilters() {
    
    const { filters, handleFiltersChange, resetFilters, resetButtonState } = useContext(FilterContext);

    return (
        <>

            <ColorPicker type="checkbox" menuState={filters.color} colorsArray={colors} eventHandler={handleFiltersChange} />

            <SelectMenu name="formality" menuState={filters.formality} inputArray={formality} eventHandler={handleFiltersChange}/>

            <SelectMenu name="season" menuState={filters.season} inputArray={seasons} eventHandler={handleFiltersChange}/>

            <ResetButton resetButtonState={resetButtonState} resetFilters={resetFilters} />
            
        </>
    );
};