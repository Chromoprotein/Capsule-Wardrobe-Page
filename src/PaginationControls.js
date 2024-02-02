import { useContext } from "react";
import { PaginationContext } from "./contexts/PaginationContext";

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
  console.log("test")

    return (
      <nav className="paginationButtonNav">
        <button className={currentPage === 1 ? "mediumButton disabledStyle" : "mediumButton idleStyle"} onClick={goToPreviousPage} disabled={currentPage === 1}>
          <span>&#8592;</span>
        </button>
        {pageNumbers.map((number) => (
          <button key={number} className={currentPage === number ? "mediumButton selectedStyle" : "mediumButton idleStyle"} onClick={() => paginate(number)} disabled={currentPage === number}>
            {number}
          </button>
        ))}
        <button className={currentPage === myTotalPages ? "mediumButton disabledStyle" : "mediumButton idleStyle"} onClick={goToNextPage} disabled={currentPage === myTotalPages}>
          <span>&#8594;</span>
        </button>
      </nav>
    );
};