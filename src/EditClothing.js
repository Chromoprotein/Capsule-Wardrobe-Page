import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ClothingContext } from './clothingContext';
import { Link } from 'react-router-dom';

export default function EditClothing() {

    const { id } = useParams();
    const { clothes, setClothes } = useContext(ClothingContext);

    const individualPiece = clothes.find(obj => obj.id == id);
    const [formState, setFormState] = useState(individualPiece);
    
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
        console.log(formState);
        console.log(updatedClothes);
        console.log(clothes)
        setClothes(updatedClothes);
    }

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
            <Link to={`/`} name="deleteButton" className="smallButton blueButton">Return</Link>
        </div>
    );
};