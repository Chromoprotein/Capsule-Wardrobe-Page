import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ClothingContext } from '../contexts/ClothingContext.tsx';
import Button from './Button';
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
            img: "",
        }
    const [formState, setFormState] = useState(individualPiece);

    // Pagination context
    const { setCurrentPage } = useContext(PaginationContext);
    // For the form submission success message
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSuccessDelete, setIsSuccessDelete] = useState(false);
    // Return to front page
    const returnToFrontPage = useReturn();

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setFormState((prevState) => ({ ...formState, [name]: value }));
    }

    const handleImageChange = (e) => {
        // Check if any files were uploaded
        if (e.target.files && e.target.files[0]) {
            // Create a URL for the uploaded file
            const uploadedImage = URL.createObjectURL(e.target.files[0]);
            // Update the state with the new image
            setFormState((prevState) => ({ ...formState, img: uploadedImage }));
        }
    };

    const handleEdit = (event) => {
        event.preventDefault();
        setIsSuccess(true);

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

        const updatedClothes = clothes.filter(piece => piece.id !== id);
        setClothes(updatedClothes);
        setCurrentPage(1);
        setIsSuccessDelete(true);
        
        returnToFrontPage();
    };

    //Submit action
    const handleAdd = (event) => {
        event.preventDefault();
        const newId = uuidv4();
        const newClothingObject = {id: newId, wearCount: 0, ...formState};
        
        setClothes((prevClothes) => ([...clothes, newClothingObject]));

        setIsSuccess(true);

        returnToFrontPage();
    }

    return (
      <>
        <ClothingForm handleClothingSubmit={id ? handleEdit : handleAdd} newClothing={formState} handleClothesFormChange={handleFormChange} isSuccess={isSuccess} handleImageChange={handleImageChange} />

        <div className="mainContentWrapper">
            {id && <Button children="Delete" eventHandler={handleDelete} actionType="delete" isSuccess={isSuccessDelete} />}
        </div>
      </>
    );

}