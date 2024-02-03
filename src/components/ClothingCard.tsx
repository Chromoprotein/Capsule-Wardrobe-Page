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

type ClothingCategory = 'dress' | 'skirt' | 'shirt' | 'sweater' | 'jacket' | 'pants' | 'tights' | 'socks' | 'leggings' | 'cardigan';

interface ClothingProp {
  cost: number;
  wearCount: number;
  category: ClothingCategory;
  id: number;
  brand: string;
  color: string;
  season: string;
  size: string;
  formality: string;
}

interface ClothingCardProps {
  clothingProp: ClothingProp;
}

export default function ClothingCard({ clothingProp }: ClothingCardProps) {

  const { cost, wearCount, category, id, brand, color, season, size, formality } = clothingProp;

  const costPerWear = (cost / wearCount).toFixed(2);

  // Record constructs an object shape
  // Keys: an union of string literals (ClothingCategory)
  // Type: type of the values (strings which are the photos)
  const images: Record<ClothingCategory, string> = {
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
  const placeholder = images[category];

  const spacer = <span> &#8226; </span>;

  return (
    <div className="clothingCard idleStyle">
      <Link to={`/edit/${id}`}>
      <img src={placeholder} alt={category} className="clothingImage placeholderImage" />
      <div className="clothingTextWrapper">
        {category} {spacer} {brand} {spacer}
        {color} {spacer} {season} {spacer}
        {size} {spacer} {formality} {spacer}
        CPW:{" "}
        {wearCount !== 0 ? (
          <span>{costPerWear} </span>
        ) : "N/A" }
      </div>
      </Link>
    </div>
  );
}
