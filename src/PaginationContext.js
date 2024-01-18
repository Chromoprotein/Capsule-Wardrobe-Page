import { createContext, useState } from "react";

export const PaginationContext = createContext();

export const PaginationContextProvider = ({ children }) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Perhaps make this changeable later

    // Calculate the total number of pages
    const totalPages = (clothes) => Math.ceil(clothes.length / itemsPerPage);

    // Get the indexes of the first and last items on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Get an array of the items on the current page
    const currentItems = (clothes) => clothes.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <PaginationContext.Provider value={{ currentPage, setCurrentPage, totalPages, currentItems }}>
            {children}
        </PaginationContext.Provider>
    );
};