import { createContext, useState, useContext, ReactNode } from "react";
import { PaginationContext } from "./PaginationContext";

// Types for our filters and context
interface FilterState {
  formality: string;
  color: string[];
  season: string;
}

interface FilterContextType {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  handleFiltersChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetFilters: () => void;
  resetButtonState: boolean;
  setResetButtonState: React.Dispatch<React.SetStateAction<boolean>>;
  filteredClothes: (clothes: ClothingItem[]) => ClothingItem[];
}

interface ClothingItem {
  formality: string;
  color: string;
  season: string;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterContextProviderProps {
  children: ReactNode;
}

export const FilterContextProvider = ({ children }: FilterContextProviderProps) => {

  const [filters, setFilters] = useState<FilterState>({
    formality: "",
    color: [],
    season: "",
  });

  const [resetButtonState, setResetButtonState] = useState<boolean>(true);

  const { setCurrentPage } = useContext(PaginationContext);

    // Event handler for filters
    const handleFiltersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = event.target;

        let newFilters: FilterState;
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
        const areAllFiltersEmpty = (filtersToCheck: FilterState) => {
            return Object.values(filtersToCheck).every(value => 
                (Array.isArray(value) ? value.length === 0 : value === "")
            );
        };

        setResetButtonState(areAllFiltersEmpty(newFilters));

        // filter change returns to page 1
        setCurrentPage(1);
    };

    const resetFilters = () => {
        setFilters({ formality: "", color: [], season: "" });
        setResetButtonState(true);

        // filter change returns to page 1
        setCurrentPage(1);
    };

    // apply the filters to a clothing array
    const filteredClothes = (clothes: ClothingItem[]) => {
        return clothes.filter(
            (piece) =>
            (filters.formality ? piece.formality === filters.formality : true) &&
            (filters.color.length ? filters.color.includes(piece.color) : true) &&
            (filters.season ? piece.season === filters.season : true)
        );
    };
    
    return (
        <FilterContext.Provider value={{ filters, setFilters, handleFiltersChange, resetFilters, resetButtonState, setResetButtonState, filteredClothes }}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterContextProvider');
  }
  return context;
}