import dress from './dress.png';
import skirt from './skirt.png';
import shirt from './shirt.png';
import sweater from './sweater.png';
import jacket from './jacket.png';
import pants from './pants.png';
import tights from './tights.png';
import socks from './socks.png';
import leggings from './leggings.png';
import cardigan from './cardigan.png';
import { Link } from 'react-router-dom';

export default function ClothingCard(props) {
  const costPerWear = (
    props.clothingProp.cost / props.clothingProp.wearCount
  ).toFixed(2);

  const images = {
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

  const placeholder = images[props.clothingProp.category];

  const spacer = <span> &#8226; </span>;

  return (
    <div className="clothingCard hoverEffect">
      <Link to={`/edit/${props.clothingProp.id}`}>
      <img src={placeholder} alt={props.clothingProp.category} className="clothingImage placeholderImage" />
      <div className="clothingTextWrapper">
        {props.clothingProp.category} {spacer} {props.clothingProp.brand} {spacer}
        {props.clothingProp.color} {spacer} {props.clothingProp.season} {spacer}
        {props.clothingProp.size} {spacer} {props.clothingProp.formality} {spacer}
        CPW:{" "}
        {props.clothingProp.wearCount !== 0 ? (
          <span>{costPerWear} </span>
        ) : "N/A" }
      </div>
      </Link>
    </div>
  );
}
