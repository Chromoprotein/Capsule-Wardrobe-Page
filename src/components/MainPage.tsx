import ClothingCard from "./ClothingCard";
import ClothingFilters from "./ClothingFilters";
import PaginationControls from "./PaginationControls";
import logo from "../img/logo.png";
import MainMenu from "./MainMenu";
import { Link } from "react-router-dom";
import Message from "./Message";
import { usePaginationContext } from "../contexts/PaginationContext";
import { useFilterContext } from "../contexts/FilterContext";
import { useClothingContext } from "../contexts/ClothingContext";
import { ClothingProp } from "./interfaces/interfaces";

export default function MainPage() {
  
  // clothes = original clothing array
  const { clothes } = useClothingContext();

  // filteredClothes = function that applies filters on the clothes array
  const { filteredClothes } = useFilterContext();

  // currentItems = function that slices the clothes/outfits array for pagination purposes
  const { currentItems } = usePaginationContext();
  
  // Apply filters on clothes and map them
  const mapClothes: JSX.Element[] = filteredClothes(clothes)
    .map((piece: ClothingProp) => (
      <div key={piece.id}>
        <ClothingCard clothingProp={piece} />
      </div>
    )
  );

  // Pagination
  const paginatedItems: JSX.Element[] = currentItems(mapClothes);

  return (
    <div className="mainPageWrapper">

      <div className="navbarWrapper">
        <Link to="/"><img src={logo} className="logoImage idleStyle" alt="My Capsule Wardrobe"/></Link>
        {/*Navigation buttons for adding clothes and generating outfits*/}
        <MainMenu/>
        {/*Menu where you can choose filters for clothes*/}
        <ClothingFilters />
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
          <Message children="No clothes available. Add clothes or reduce filters."/>
        )}
      </div>

    </div>
  );
}