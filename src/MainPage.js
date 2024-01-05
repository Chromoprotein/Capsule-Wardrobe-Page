import clothesArray from "./clothesArray";
import { useState, useEffect } from "react";
import colors from "./ColorsArray";
import brands from "./brandsArray";
import category from "./categoryArray";
import ClothingCard from "./ClothingCard";

export default function MainPage() {
  const [filters, setFilters] = useState({
    category: "",
    color: "",
    season: "",
    brand: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  const handleFiltersChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ category: "", color: "", season: "", brand: "" });
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const filteredClothes = clothesArray
    .filter(
      (piece) =>
        (filters.category ? piece.category === filters.category : true) &&
        (filters.color ? piece.color === filters.color : true) &&
        (filters.season ? piece.season === filters.season : true) &&
        (filters.brand ? piece.brand === filters.brand : true)
    )
    .map((piece) => (
      <div key={piece.id}>
        <ClothingCard clothingProp={piece} />
      </div>
    ));

  // Calculate pagination
  useEffect(() => {
    setTotalPages(Math.ceil(filteredClothes.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(filteredClothes.slice(startIndex, endIndex));
  }, [currentPage, filteredClothes, itemsPerPage]);

  return (
    <>
      <div>
        <button name="resetButton" onClick={resetFilters}>
          Reset Filters
        </button>

        <select name="color" onChange={handleFiltersChange}>
          <option value="" disabled selected>
            Color
          </option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>

        <select name="brand" onChange={handleFiltersChange}>
          <option value="" disabled selected>
            Brand
          </option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <select name="category" onChange={handleFiltersChange}>
          <option value="" disabled selected>
            Category
          </option>
          {category.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select name="season" onChange={handleFiltersChange}>
          <option value="" disabled selected>
            Season
          </option>
          <option value="winter">Winter</option>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
          <option value="autumn">Autumn</option>
        </select>
      </div>

      {paginatedData}

      <button onClick={goToPreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={goToNextPage}
        disabled={currentPage * itemsPerPage >= filteredClothes.length}
      >
        Next
      </button>
    </>
  );
}