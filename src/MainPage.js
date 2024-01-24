import { useContext, useState } from "react";

import ClothingCard from "./ClothingCard";
import { ClothingContext } from "./ClothingContext";
import ClothingFilters from "./ClothingFilters";
import { FilterContext } from "./FilterContext";
import { PaginationContext } from "./PaginationContext";
import PaginationControls from "./PaginationControls";
import logo from "./logo.png";
import MainMenu from "./MainMenu";

export default function MainPage() {
  
  // clothes = original clothing array
  const { clothes } = useContext(ClothingContext);

  // filteredClothes = function that applies filters on the clothes array
  const { filteredClothes } = useContext(FilterContext);

  // currentItems = function that slices the clothes/outfits array for pagination purposes
  const { currentItems } = useContext(PaginationContext);
  
  // Apply filters on clothes and map them
  const mapClothes = filteredClothes(clothes)
    .map((piece) => (
      <div key={piece.id}>
        <ClothingCard clothingProp={piece} />
      </div>
    )
  );

  // Pagination
  const paginatedItems = currentItems(mapClothes);

  return (
    <div class="mainPageWrapper">

      <div class="navbarWrapper">
        <img src={logo} className="logoImage" alt="My Capsule Wardrobe"/>
        <div className="navbarButtonsWrapper">
          {/*Navigation buttons for adding clothes and generating outfits*/}
          <MainMenu/>
          {/*Menu where you can choose filters for clothes*/}
          <ClothingFilters />
        </div>
      </div>

      <div className="mainContentWrapper">
        {paginatedItems.length > 0 ? (
          <>
            {/*The currently displayed clothes*/}
            <div className="clothingCardContainer">
              {paginatedItems}
            </div>

            {/*Next, previous, and page number buttons. Takes an array of filtered clothes*/}
            <PaginationControls clothes={mapClothes} />
          </>
        ) : (
          "No clothes saved. Try reducing filters."
        )}
      </div>

    </div>
  );
}