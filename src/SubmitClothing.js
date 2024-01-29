import { ClothingContext } from "./ClothingContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClothingForm from "./ClothingForm";

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

  const navigate = useNavigate();

  //*****ADD NEW CLOTHES*****

  //Handles the form change
  const handleClothesFormChange = (event) => {
    const { name, value } = event.target;

    setNewClothing((prevNewClothing) => ({ ...newClothing, [name]: value }));
  }

  //Submit action
  const handleClothingSubmit = (event) => {
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

    navigate('/');
  }

    return (
      <>
        <ClothingForm handleClothingSubmit={handleClothingSubmit} newClothing={newClothing} handleClothesFormChange={handleClothesFormChange} />
      </>
    );
};