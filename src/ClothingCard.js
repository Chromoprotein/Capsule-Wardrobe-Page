export default function ClothingCard(props) {

    const costPerWear = (props.clothingProp.cost / props.clothingProp.wearCount).toFixed(2);

    return (
      <div>
        {props.clothingProp.category} | {props.clothingProp.brand} |{" "}
        {props.clothingProp.color} | {props.clothingProp.season} |{" "}
        {props.clothingProp.size} 
        {props.clothingProp.wearCount !== 0 && (
          <span> | Cost per wear: {costPerWear}</span>
        )}
      </div>
    );
}