export default function PaginationControls({ goToPreviousPage, currentPage, pageNumbers, paginate, goToNextPage, totalPages }) {
    
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
        <button className="mediumButton" onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </nav>
    );
};