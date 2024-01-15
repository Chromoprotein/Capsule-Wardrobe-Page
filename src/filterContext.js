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

  const { currentPage, setCurrentPage } = useContext(PaginationContext);

  //*****FILTERS*****
  //Event handler for filters
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

        //empty filters = reset button disabled true
        //not empty filters = reset button disabled false
        const areAllFiltersEmpty = (filtersToCheck) => {
            return Object.values(filtersToCheck).every(value => 
                (Array.isArray(value) ? value.length === 0 : value === "")
            );
        };

        setResetButtonState(areAllFiltersEmpty(newFilters));

        setCurrentPage(1);
    };

    const resetFilters = () => {
        setFilters({ category: "", color: [], season: "", brand: "" });
        setResetButtonState(true);
        setCurrentPage(1);
    };

    return (
        <FilterContext.Provider value={{ filters, setFilters, handleFiltersChange, resetFilters, resetButtonState, setResetButtonState }}>
            {children}
        </FilterContext.Provider>
    );
}