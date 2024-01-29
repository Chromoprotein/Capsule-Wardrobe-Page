import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ClothingContext } from './ClothingContext';
import DeleteButton from './DeleteButton';
import ClothingForm from './ClothingForm';
import { PaginationContext } from './PaginationContext';

export default function EditClothing() {

    // Get the URL id
    const { id } = useParams();
    // Turn it into a number
    const numericId = +id;

    // Context that stores the clothes
    const { clothes, setClothes } = useContext(ClothingContext);

    const { setCurrentPage } = useContext(PaginationContext);

    // Get the displayed clothing piece by the URL id
    const individualPiece = clothes.find(obj => obj.id === numericId);
    
    const [formState, setFormState] = useState(individualPiece);
    
    const navigate = useNavigate();

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setFormState((prevState) => ({ ...formState, [name]: value }));
    }

    const handleEdit = (event) => {
        event.preventDefault();
        const updatedClothes = clothes.map(piece => {
            if(piece.id ===  formState.id) {
                return formState;
            }
            else {
                return piece;
            }
        })
        setClothes(updatedClothes);
        // Navigate to the main page
        navigate('/');
    }

    const handleDelete = (event) => {
        try {
            const updatedClothes = clothes.filter(piece => piece.id !== numericId);
            setClothes(updatedClothes);
            setCurrentPage(1);
            
            // Navigate to the main page
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>

            <ClothingForm handleClothingSubmit={handleEdit} newClothing={formState} handleClothesFormChange={handleFormChange} />

            <DeleteButton handleDelete={handleDelete} />

        </div>
    );
};