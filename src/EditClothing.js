import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ClothingContext } from './ClothingContext';
import BackButton from './BackButton';
import DeleteButton from './DeleteButton';

export default function EditClothing() {

    // Get the URL id
    const { id } = useParams();
    // Turn it into a number
    const numericId = +id;

    // Context that stores the clothes
    const { clothes, setClothes } = useContext(ClothingContext);

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
    }

    const handleDelete = (event) => {
        try {
            const updatedClothes = clothes.filter(piece => piece.id !== numericId);
            setClothes(updatedClothes);
            
            // Navigate to the main page
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleEdit}>
                <input type="text" name="category" value={formState.category} onChange={handleFormChange}/>
                <input type="text" name="color"  value={formState.color} onChange={handleFormChange}/>
                <input type="text" name="brand"  value={formState.brand} onChange={handleFormChange}/>
                <input type="text" name="season"  value={formState.season} onChange={handleFormChange}/>
                <input type="text" name="size"  value={formState.size} onChange={handleFormChange}/>
                <input type="text" name="wearCount"  value={formState.wearCount} onChange={handleFormChange}/>
                <input type="text" name="cost"  value={formState.cost} onChange={handleFormChange}/>
                <button type="submit">Save Changes</button>
            </form>

            <DeleteButton handleDelete={handleDelete} />

            <BackButton/>
            </div>
    );
};