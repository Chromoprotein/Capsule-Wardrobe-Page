import colors from "./ColorsArray";
import brands from "./brandsArray";
import category from "./categoryArray";

export default function ClothingFilters({ filters, resetButtonState, resetFilters, handleFiltersChange }) {
    console.log(filters)
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

            <select className="selectMenu" style={{ backgroundColor: filters.brand ? 'aquamarine' : 'white' }} value={filters.brand} name="brand" onChange={handleFiltersChange}>
            <option value="" disabled selected>
                Brand
            </option>
            {brands.map((brand) => (
                <option key={brand} value={brand}>
                {brand}
                </option>
            ))}
            </select>

            <select className="selectMenu" style={{ backgroundColor: filters.category ? 'aquamarine' : 'white' }} value={filters.category} name="category" onChange={handleFiltersChange}>
            <option value="" disabled selected>
                Category
            </option>
            {category.map((category) => (
                <option key={category} value={category}>
                {category}
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