import { createContext, useState, useContext } from "react";
import { PaginationContext } from "./PaginationContext";

export const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {

  const [filters, setFilters] = useState({
    category: "",
    color: [],
    season: "",
    brand: "",
  });

  const [resetButtonState, setResetButtonState] = useState(true);

  const { setCurrentPage } = useContext(PaginationContext);

    // Event handler for filters
    const handleFiltersChange = (event) => {
        const { name, value, checked } = event.target;

        let newFilters;
        if (name === "color") {
            let updatedColors;
            if (checked) {
                updatedColors = [...filters.color, value];
            } else {
                updatedColors = filters.color.filter(color => color !== value);
            }
            newFilters = { ...filters, [name]: updatedColors };
        } else {
            newFilters = { ...filters, [name]: value };
        }

        setFilters(newFilters);

        // empty filters = reset button disabled: true
        // filters are in use = reset button disabled: false
        const areAllFiltersEmpty = (filtersToCheck) => {
            return Object.values(filtersToCheck).every(value => 
                (Array.isArray(value) ? value.length === 0 : value === "")
            );
        };

        setResetButtonState(areAllFiltersEmpty(newFilters));

        // filter change returns to page 1
        setCurrentPage(1);
    };

    const resetFilters = () => {
        setFilters({ category: "", color: [], season: "", brand: "" });
        setResetButtonState(true);

        // filter change returns to page 1
        setCurrentPage(1);
    };

    // apply the filters to a clothing array
    const filteredClothes = (clothes) => {
        return clothes.filter(
            (piece) =>
            (filters.category ? piece.category === filters.category : true) &&
            (filters.color.length ? filters.color.includes(piece.color) : true) &&
            (filters.season ? piece.season === filters.season : true) &&
            (filters.brand ? piece.brand === filters.brand : true)
        );
    };
    
    return (
        <FilterContext.Provider value={{ filters, setFilters, handleFiltersChange, resetFilters, resetButtonState, setResetButtonState, filteredClothes }}>
            {children}
        </FilterContext.Provider>
    );
}