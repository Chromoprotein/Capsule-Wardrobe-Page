import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ClothingContext } from './ClothingContext';
import DeleteButton from './DeleteButton';
import ClothingForm from './ClothingForm';
import { PaginationContext } from './PaginationContext';
import useReturn from './useReturn';

export default function EditClothing() {

    // Get the URL id
    const { id } = useParams();

    // Context that stores the clothes
    const { clothes, setClothes } = useContext(ClothingContext);

    // Pagination context
    const { setCurrentPage } = useContext(PaginationContext);

    // Get the displayed clothing piece by the URL id
    const individualPiece = clothes.find(obj => obj.id === id);
    // Info currently displayed in form
    const [formState, setFormState] = useState(individualPiece);

    // For the form submission message
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

    return (
        <div>

            <ClothingForm handleClothingSubmit={handleEdit} newClothing={formState} handleClothesFormChange={handleFormChange} actionType= {actionType} />

            <DeleteButton handleDelete={handleDelete} actionType= {actionType} />

        </div>
    );
};