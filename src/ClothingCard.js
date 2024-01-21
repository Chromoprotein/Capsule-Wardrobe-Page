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

  return (
    <div className="clothingCard">
      <img src={placeholder} alt={props.clothingProp.category} className="clothingImage" />
      <div className="clothingTextWrapper">
        {props.clothingProp.category} | {props.clothingProp.brand} |{" "}
        {props.clothingProp.color} | {props.clothingProp.season} |{" "}
        {props.clothingProp.size} | {props.clothingProp.formality}{" "}
        | Cost per wear:{" "}
        {props.clothingProp.wearCount !== 0 ? (
          <span>{costPerWear} </span>
        ) : "N/A" }
        <br />
        <Link to={`/edit/${props.clothingProp.id}`}><button type="button" name="deleteButton" className="smallButton blueButton">Edit</button></Link>
      </div>
    </div>
  );
}
