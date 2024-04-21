import dress from '../img/dress.png';
import skirt from '../img/skirt.png';
import shirt from '../img/shirt.png';
import sweater from '../img/sweater.png';
import jacket from '../img/jacket.png';
import pants from '../img/pants.png';
import tights from '../img/tights.png';
import socks from '../img/socks.png';
import leggings from '../img/leggings.png';
import cardigan from '../img/cardigan.png';
import { Link } from 'react-router-dom';
import { ClothingProp } from './interfaces/interfaces';

interface ClothingCardProps {
  clothingProp: ClothingProp;
}

export default function ClothingCard({ clothingProp }: ClothingCardProps) {

  const { cost, wearCount, category, id, brand, color, season, size, formality, img } = clothingProp; 

  const costPerWear = (cost / wearCount).toFixed(2);

  // Record constructs an object shape
  // Keys: an union of string literals (ClothingCategory)
  // Type: type of the values (strings which are the photos)
  const images: Record<string, string> = {
    dress,
    skirt,
    shirt,
    sweater,
    jacket,
    pants,
    tights,
    socks,
    leggings,
    cardigan
  };

  // The key is a clothing category, the value is an image
  const clothingPicture = img.length === 0 ? images[category] : img;

  const spacer = <span> &#8226; </span>;

  return (
    <div className="clothingCard idleStyle">
      <Link to={`/edit/${id}`}>
      <img src={clothingPicture} alt={category} className="clothingImage placeholderImage" />
      <div className="clothingTextWrapper">
        {category} {spacer} {brand} {spacer}
        {color} {spacer} {season} {spacer}
        {size} {spacer} {formality} {spacer} wears: {wearCount} {spacer}
        CPW:{" "}
        {wearCount !== 0 ? (
          <span>{costPerWear} </span>
        ) : "N/A" }
      </div>
      </Link>
    </div>
  );
}
