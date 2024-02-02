import colors from "./dummyData/ColorsArray";
import { formality } from "./dummyData/formalityArray";
import { useContext } from "react";
import { FilterContext } from "./contexts/FilterContext";

export default function ClothingFilters() {
    
    const { filters, handleFiltersChange, resetFilters, resetButtonState } = useContext(FilterContext);

    return (
        <>

            <div className={filters.color.length !== 0 ? 'selectedStyle bigButton checkboxContainer' : 'bigButton idleStyle checkboxContainer'}>
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

            <select className={filters.formality ? 'bigButton selectedStyle' : 'bigButton idleStyle'} value={filters.formality} name="formality" onChange={handleFiltersChange}>
            <option value="" disabled selected>
                Formality
            </option>
            {formality.map((formality) => (
                <option key={formality} value={formality}>
                {formality}
                </option>
            ))}
            </select>

            <select className={filters.season ? 'bigButton selectedStyle' : 'bigButton idleStyle'} value={filters.season} name="season" onChange={handleFiltersChange}>
            <option value="" disabled selected>
                Season
            </option>
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="autumn">Autumn</option>
            </select>

            <button className={resetButtonState ? "bigButton disabledStyle" : "bigButton idleStyle"} name="resetButton" onClick={resetFilters} disabled={resetButtonState}>
            Reset Filters
            </button>
            
        </>
    );
};