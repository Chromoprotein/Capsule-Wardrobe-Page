import dress from "src/dress.png";
import skirt from "src/skirt.png";
import shirt from "src/shirt.png";
import sweater from "src/sweater.png";
import jacket from "src/jacket.png";
import pants from "src/pants.png";
export default function ClothingCard(props) {
  const costPerWear = (
    props.clothingProp.cost / props.clothingProp.wearCount
  ).toFixed(2);
  //const placeholder = props.clothingProp.category + ".png"; fix this

  return (
    <div>
      <img src={placeholder} alt="Placeholder" />
      {props.clothingProp.category} | {props.clothingProp.brand} |{" "}
      {props.clothingProp.color} | {props.clothingProp.season} |{" "}
      {props.clothingProp.size}
      {props.clothingProp.wearCount !== 0 && (
        <span> | Cost per wear: {costPerWear}</span>
      )}
    </div>
  );
}
