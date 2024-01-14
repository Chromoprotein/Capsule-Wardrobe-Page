import { useState, useContext } from "react";
import colors from "./ColorsArray";
import brands from "./brandsArray";
import category from "./categoryArray";
import ClothingCard from "./ClothingCard";
import { ClothingContext } from "./clothingContext";
import { Link } from "react-router-dom";

export default function MainPage() {
  
  const { clothes, setClothes } = useContext(ClothingContext);

  const [filters, setFilters] = useState({
    category: "",
    color: [],
    season: "",
    brand: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //*****FILTERS*****
  //Event handler for filters
  const handleFiltersChange = (event) => {
    //Options is for multiple colors
    const { name, value, options } = event.target;
    //Handle multiple color choices
    if (name === "color") {
      const selectedColors = Array.from(options) //Creates an array
        .filter(option => option.selected) //Checks that color is selected
        .map(option => option.value); //Makes an array of color values
      setFilters({ ...filters, [name]: selectedColors });
    //Handle other filters
    } else {
      setFilters({ ...filters, [name]: value });
    }
    setCurrentPage(1);

  };

  const resetFilters = () => {
    setFilters({ category: "", color: [], season: "", brand: "" });
    setCurrentPage(1);
  };

  // Function to check if all filters are empty for the reset filters button
  const areAllFiltersEmpty = () => {
    return Object.values(filters).every(value => 
      (Array.isArray(value) ? value.length === 0 : value === "")
    );
  };

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
    ));
  
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
        <Link to={`/submit`}><button type="button" className="bigButton blueButton" name="linkButton">Add Clothes</button></Link>
        <button className="bigButton greenButton" name="linkButton">Generate Outfits</button>

        <button className="bigButton" name="resetButton" onClick={resetFilters} disabled={areAllFiltersEmpty()}>
          Reset Filters
        </button>

        <select className="selectMenu" style={{ backgroundColor: filters.color.length !== 0 ? 'aquamarine' : 'white' }} multiple value={filters.color} name="color" onChange={handleFiltersChange}>
          <option value="" disabled selected>
            Color
          </option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>

        <select className="selectMenu" style={{ backgroundColor: filters.brand ? 'aquamarine' : 'white' }} value={filters.brand} name="brand" onChange={handleFiltersChange}>
          <option value="" disabled selected>
            Brand
          </option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <select className="selectMenu" style={{ backgroundColor: filters.category ? 'aquamarine' : 'white' }} value={filters.category} name="category" onChange={handleFiltersChange}>
          <option value="" disabled selected>
            Category
          </option>
          {category.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select className="selectMenu" style={{ backgroundColor: filters.season ? 'aquamarine' : 'white' }} value={filters.season} name="season" onChange={handleFiltersChange}>
          <option value="" disabled selected>
            Season
          </option>
          <option value="winter">Winter</option>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
          <option value="autumn">Autumn</option>
        </select>
      </div>

      <div className="clothingCardContainer">
        {currentItems}
      </div>

      {/* Pagination Controls */}
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

    </>
  );
}