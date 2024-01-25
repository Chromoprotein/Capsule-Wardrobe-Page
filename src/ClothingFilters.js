import colors from "./ColorsArray";
import { formality } from "./formalityArray";
import { useContext } from "react";
import { FilterContext } from "./FilterContext";

export default function ClothingFilters() {
    
    const { filters, handleFiltersChange, resetFilters, resetButtonState } = useContext(FilterContext);

    return (
        <>

            <div className={filters.color.length !== 0 ? 'activeBackground bigButton checkboxContainer' : 'bigButton checkboxContainer  hoverEffect'}>
                {colors.map((color) => (
                    <div key={color}>
                        <label class="formControl">
                            <input
                                type="checkbox"
                                name="color"
                                value={color}
                                checked={filters.color.includes(color)}
                                onChange={handleFiltersChange}
                                style={{backgroundColor: color}}
                                className={color === "black" ? "whiteCheckmark" : "blackCheckmark"}
                            />
                        </label>
                        
                    </div>
                ))}
            </div>

            <select className={filters.formality ? 'bigButton activeBackground' : 'bigButton hoverEffect'} value={filters.formality} name="formality" onChange={handleFiltersChange}>
            <option value="" disabled selected>
                Formality
            </option>
            {formality.map((formality) => (
                <option key={formality} value={formality}>
                {formality}
                </option>
            ))}
            </select>

            <select className={filters.season ? 'bigButton activeBackground' : 'bigButton hoverEffect'} value={filters.season} name="season" onChange={handleFiltersChange}>
            <option value="" disabled selected>
                Season
            </option>
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="autumn">Autumn</option>
            </select>

            <button className="bigButton hoverEffect" name="resetButton" onClick={resetFilters} disabled={resetButtonState}>
            Reset Filters
            </button>
            
        </>
    );
};