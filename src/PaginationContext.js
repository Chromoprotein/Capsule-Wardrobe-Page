import { createContext, useState } from "react";

export const PaginationContext = createContext();

export const PaginationContextProvider = ({ children }) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    return (
        <PaginationContext.Provider value={{ currentPage, setCurrentPage, itemsPerPage }}>
            {children}
        </PaginationContext.Provider>
    );
};