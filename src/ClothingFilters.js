import colors from "./ColorsArray";
import { formality } from "./formalityArray";
import { useContext } from "react";
import { FilterContext } from "./FilterContext";

export default function ClothingFilters() {
    
    const { filters, handleFiltersChange, resetFilters, resetButtonState } = useContext(FilterContext);

    return (
        <>
            <button className="bigButton" name="resetButton" onClick={resetFilters} disabled={resetButtonState}>
            Reset Filters
            </button>

            <div className="checkboxContainer" style={{ backgroundColor: filters.color.length !== 0 ? 'aquamarine' : 'white' }}>
                <label>
                    Color
                </label>
                {colors.map((color) => (
                    <div key={color}>
                        <input
                            type="checkbox"
                            name="color"
                            value={color}
                            checked={filters.color.includes(color)}
                            onChange={handleFiltersChange}
                        />
                        {color}
                    </div>
                ))}
            </div>

            <select className="selectMenu" style={{ backgroundColor: filters.formality ? 'aquamarine' : 'white' }} value={filters.formality} name="formality" onChange={handleFiltersChange}>
            <option value="" disabled selected>
                Formality
            </option>
            {formality.map((formality) => (
                <option key={formality} value={formality}>
                {formality}
                </option>
            ))}
            </select>

            <select className="selectMenu" style={{ backgroundColor: filters.season ? 'aquamarine' : 'white' }} value={filters.season} name="season" onChange={handleFiltersChange}>
            <option value="" disabled selected>
                Season
            </option>
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="autumn">Autumn</option>
            </select>
        </>
    );
};