import { ClothingContext } from "./clothingContext";
import { useContext, useState } from "react";
import BackButton from "./BackButton";

export default function SubmitClothing() {
    const { clothes, setClothes } = useContext(ClothingContext);
    //State for add new clothing form
    const [newClothing, setNewClothing] = useState({
        category: "",
        brand: "",
        color: "",
        size: "",
        season: "",
        cost: 0})

  //*****ADD NEW CLOTHES*****

  //Handles the form change
  const handleAddClothesFormChange = (event) => {
    const { name, value } = event.target;

    setNewClothing((prevNewClothing) => ({ ...newClothing, [name]: value }));
  }

  //Submit action
  const handleAddNewClothingSubmit = (event) => {
    event.preventDefault();
    const newId = clothes.length;
    const newClothingObject = {id: newId, wearCount: 0, ...newClothing};
    
    setClothes((prevClothes) => ([...clothes, newClothingObject]));

    //Reset the form state
    setNewClothing({category: "",
    brand: "",
    color: "",
    size: "",
    season: "",
    cost: 0});
  }

    return (
      <div>
        <form onSubmit={handleAddNewClothingSubmit}>
          Category: <input type="text" name="category" value={newClothing.category} onChange={handleAddClothesFormChange} />
          Season: <input type="text" name="season" value={newClothing.season} onChange={handleAddClothesFormChange} />
          Size: <input type="text" name="size" value={newClothing.size} onChange={handleAddClothesFormChange} />
          Color: <input type="text" name="color" value={newClothing.color} onChange={handleAddClothesFormChange} />
          Brand: <input type="text" name="brand" value={newClothing.brand} onChange={handleAddClothesFormChange} />
          Cost: <input type="number" name="cost" value={newClothing.cost} onChange={handleAddClothesFormChange} />
          <button type="submit">Add New Piece</button>
        </form>
        <BackButton/>
      </div> 
    );
};