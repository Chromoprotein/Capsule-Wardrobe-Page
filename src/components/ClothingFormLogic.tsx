import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Button from './Button';
import ClothingForm from './ClothingForm';
import useReturn from '../utils/useReturn';
import { v4 as uuidv4 } from 'uuid';
// npm install --save-dev @types/uuid
import { useClothingContext } from '../contexts/ClothingContext';
import { usePaginationContext } from '../contexts/PaginationContext';
import { ClothingProp } from './interfaces/interfaces';

export default function ClothingFormLogic() {

    // Context that stores the clothes
    const { clothes, setClothes } = useClothingContext();

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
            wearCount: 0,
            id: "",
        }
    const [formState, setFormState] = useState<ClothingProp>(individualPiece as ClothingProp);

    // Pagination context
    const { setCurrentPage } = usePaginationContext();
    // For the form submission success message
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSuccessDelete, setIsSuccessDelete] = useState(false);
    // Return to front page
    const returnToFrontPage = useReturn();

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        setFormState((prevState) => ({ ...formState, [name]: value }));
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Check if any files were uploaded
        if (e.target.files && e.target.files[0]) {
            // Create a URL for the uploaded file
            const uploadedImage = URL.createObjectURL(e.target.files[0]);
            // Update the state with the new image
            setFormState((prevState) => ({ ...formState, img: uploadedImage }));
        }
    };

    const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
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

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const updatedClothes = clothes.filter(piece => piece.id !== id);
        setClothes(updatedClothes);
        setCurrentPage(1);
        setIsSuccessDelete(true);
        
        returnToFrontPage();
    };

    //Submit action
    const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        formState.id = uuidv4();
        const newClothingObject = {...formState};
        
        setClothes([...clothes, newClothingObject]);

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