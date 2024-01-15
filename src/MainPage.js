import { useContext } from "react";

import ClothingCard from "./ClothingCard";
import { ClothingContext } from "./clothingContext";
import ClothingFilters from "./ClothingFilters";
import { FilterContext } from "./filterContext";
import { PaginationContext } from "./PaginationContext";
import PaginationControls from "./PaginationControls";
import MainMenu from "./MainMenu";

export default function MainPage() {
  
  const { clothes, setClothes } = useContext(ClothingContext);

  const { filters, setFilters, handleFiltersChange, resetFilters, resetButtonState, setResetButtonState } = useContext(FilterContext);

  // Pagination state
  const { currentPage, setCurrentPage, itemsPerPage } = useContext(PaginationContext);
  
  const filteredClothes = clothes
    .filter(
      (piece) =>
        (filters.category ? piece.category === filters.category : true) &&
        (filters.color.length ? filters.color.includes(piece.color) : true) &&
        (filters.season ? piece.season === filters.season : true) &&
        (filters.brand ? piece.brand === filters.brand : true)
    )
    .map((piece) => (
      <div key={piece.id}>
        <ClothingCard clothingProp={piece} />
      </div>
    )
  );
  
  //*****PAGINATION*****
  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredClothes.length / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClothes.slice(indexOfFirstItem, indexOfLastItem);

  // Change page function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Functions to handle previous and next page
  const goToNextPage = () => {
    setCurrentPage((prevCurrentPage) => Math.min(prevCurrentPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevCurrentPage) => Math.max(prevCurrentPage - 1, 1));
  };

  // Render page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <h1 className="title">My Capsule Wardrobe</h1>

      <div className="selectMenuWrapper">
        <MainMenu/>

        <ClothingFilters filters={filters} resetButtonState={resetButtonState} resetFilters={resetFilters} handleFiltersChange={handleFiltersChange} />
      </div>

      <div className="clothingCardContainer">
        {currentItems}
      </div>

      <PaginationControls goToPreviousPage={goToPreviousPage} currentPage={currentPage} pageNumbers={pageNumbers} paginate={paginate} goToNextPage={goToNextPage} totalPages={totalPages} />
    </>
  );
}