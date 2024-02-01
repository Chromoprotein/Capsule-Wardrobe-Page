import { ClothingContext } from "./ClothingContext";
import { useContext, useState } from "react";
import ClothingForm from "./ClothingForm";
import useReturn from "./useReturn";
import { v4 as uuidv4 } from 'uuid';

export default function SubmitClothing() {

  const { clothes, setClothes } = useContext(ClothingContext);

  //State for adding new clothing
  const [newClothing, setNewClothing] = useState({
      category: "",
      brand: "",
      color: "",
      size: "",
      season: "",
      cost: 0})
  
  const returnToFrontPage = useReturn();

  // For the form submission message
  const [actionType, setActionType] = useState("");

  //Handles the form change
  const handleClothesFormChange = (event) => {
    const { name, value } = event.target;

    setNewClothing((prevNewClothing) => ({ ...newClothing, [name]: value }));
  }

  //Submit action
  const handleClothingSubmit = (event) => {
    event.preventDefault();
    const newId = uuidv4();
    const newClothingObject = {id: newId, wearCount: 0, ...newClothing};
    
    setClothes((prevClothes) => ([...clothes, newClothingObject]));

    setActionType("submit");

    returnToFrontPage();
  }

    return (
      <>
        <ClothingForm handleClothingSubmit={handleClothingSubmit} newClothing={newClothing} handleClothesFormChange={handleClothesFormChange} actionType={actionType} />
      </>
    );
};