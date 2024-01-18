import { useContext } from "react";
import { PaginationContext } from "./PaginationContext";

export default function PaginationControls({ clothes }) {
    
  const { currentPage, setCurrentPage, totalPages } = useContext(PaginationContext);

  // Calculate the total pages 
  // Takes the filtered and mapped clothes array
  const myTotalPages = totalPages(clothes);

  // Go to any page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to the next page
  const goToNextPage = () => {
      setCurrentPage((prevCurrentPage) => Math.min(prevCurrentPage + 1, myTotalPages));
  };

  // Go to the previous page
  const goToPreviousPage = () => {
      setCurrentPage((prevCurrentPage) => Math.max(prevCurrentPage - 1, 1));
  };

  // Render page numbers
  const pageNumbers = Array.from({ length: myTotalPages }, (_, index) => index + 1);

    return (
      <nav className="paginationButtonNav">
        <button className="mediumButton" onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        {pageNumbers.map((number) => (
          <button key={number} className={number === currentPage ? 'mediumButton greenButton' : 'mediumButton'} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
        <button className="mediumButton" onClick={goToNextPage} disabled={currentPage === myTotalPages}>
          Next
        </button>
      </nav>
    );
};