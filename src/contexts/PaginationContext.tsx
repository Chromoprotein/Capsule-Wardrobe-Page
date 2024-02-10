import { createContext, useState, ReactNode, useContext } from "react";

interface PaginationContextType {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: (clothes: JSX.Element[]) => number;
    currentItems: (items: JSX.Element[]) => JSX.Element[];
}

interface PaginationContextProviderProps {
    children: ReactNode;
}

export const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export const PaginationContextProvider = ({ children }: PaginationContextProviderProps) => {
    
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5; // Perhaps make this changeable later

    // Calculate the total number of pages
    const totalPages = (clothes: JSX.Element[]) => Math.ceil(clothes.length / itemsPerPage);

    // Get the indexes of the first and last items on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Get an array of the items on the current page
    const currentItems = (clothes: JSX.Element[]) => clothes.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <PaginationContext.Provider value={{ currentPage, setCurrentPage, totalPages, currentItems }}>
            {children}
        </PaginationContext.Provider>
    );
};

// Custom hook to consume the context
export function usePaginationContext(): PaginationContextType {
  const context = useContext(PaginationContext);
  
  if (context === undefined) {
    throw new Error('usePaginationContext must be used within a PaginationContextProvider');
  }
  
  return context;
}