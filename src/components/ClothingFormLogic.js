import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ClothingContext } from '../contexts/ClothingContext';
import DeleteButton from './buttons/DeleteButton';
import ClothingForm from './ClothingForm';
import { PaginationContext } from '../contexts/PaginationContext';
import useReturn from '../utils/useReturn';
import { v4 as uuidv4 } from 'uuid';

export default function ClothingFormLogic() {

    // Context that stores the clothes
    const { clothes, setClothes } = useContext(ClothingContext);

    // Get the URL id when editing clothes
    const { id } = useParams();

    // Populate the form with a clothing piece based on the URL id or start with an empty form
    const individualPiece = id 
        ? clothes.find(obj => obj.id === id)
        : {
            category: "",
            brand: "",
            color: "",
            size: "",
            season: "",
            cost: 0,
            formality: "",
        }
    const [formState, setFormState] = useState(individualPiece);

    // Pagination context
    const { setCurrentPage } = useContext(PaginationContext);
    // For the form submission success message
    const [actionType, setActionType] = useState("");
    // Return to front page
    const returnToFrontPage = useReturn();

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setFormState((prevState) => ({ ...formState, [name]: value }));
    }

    const handleEdit = (event) => {
        event.preventDefault();
        setActionType("submit");

        const updatedClothes = clothes.map(piece => {
            if(piece.id ===  formState.id) {
                return formState;
            }
            else {
                return piece;
            }
        })
        setClothes(updatedClothes);
        returnToFrontPage();
    }

    const handleDelete = (event) => {
        event.preventDefault();
        setActionType("delete");

        const updatedClothes = clothes.filter(piece => piece.id !== id);
        setClothes(updatedClothes);
        setCurrentPage(1);
        
        returnToFrontPage();
    };

    //Submit action
    const handleAdd = (event) => {
        event.preventDefault();
        const newId = uuidv4();
        const newClothingObject = {id: newId, wearCount: 0, ...formState};
        
        setClothes((prevClothes) => ([...clothes, newClothingObject]));

        setActionType("submit");

        returnToFrontPage();
    }

    return (
      <>
        <ClothingForm handleClothingSubmit={id ? handleEdit : handleAdd} newClothing={formState} handleClothesFormChange={handleFormChange} actionType={actionType} />

        {id && <DeleteButton handleDelete={handleDelete} actionType= {actionType} />}
      </>
    );

}