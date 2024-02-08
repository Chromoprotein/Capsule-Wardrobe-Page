import BackButton from "./BackButton";
import colors from "../dummyData/ColorsArray";
import { formality } from "../dummyData/formalityArray";
import category from "../dummyData/categoryArray";
import { SelectMenu, InputField, ColorPicker } from "./FormComponents";
import { seasons } from "../dummyData/seasonsArray";
import { sizes } from "../dummyData/sizesArray";
import Button from "./Button";
import { FormProps } from "./interfaces/interfaces";

export default function ClothingForm({ handleClothingSubmit, newClothing, handleClothesFormChange, isSuccess, handleImageChange }: FormProps) {

    // Submit button
    const isDisabled = !Object.values(newClothing).every(value => value);

    return (
      <div className="formWrapper">
        <form onSubmit={handleClothingSubmit}>

          <div>
            <input 
              type="file" 
              id="file-upload" 
              style={{ display: 'none' }} 
              onChange={handleImageChange} 
            />
            <label htmlFor="file-upload" className={newClothing.img ? 'bigButton selectedStyle' : 'bigButton idleStyle'}>
              Upload Image
            </label>
            {newClothing.img && <img src={newClothing.img} alt="Uploaded" className="clothingImage placeholderImage" />}
          </div>

          <SelectMenu name="category" menuState={newClothing.category} inputArray={category} eventHandler={handleClothesFormChange}/>

          <SelectMenu name="formality" menuState={newClothing.formality} inputArray={formality} eventHandler={handleClothesFormChange}/>

          <SelectMenu name="season" menuState={newClothing.season} inputArray={seasons} eventHandler={handleClothesFormChange}/>

          <SelectMenu name="size" menuState={newClothing.size} inputArray={sizes} eventHandler={handleClothesFormChange}/>

          <ColorPicker type="radio" menuState={newClothing.color} colorsArray={colors} eventHandler={handleClothesFormChange} />

          <InputField name="brand" menuState={newClothing.brand} eventHandler={handleClothesFormChange} type="text" placeholder="Brand A"/>

          <InputField name="cost" menuState={newClothing.cost} eventHandler={handleClothesFormChange} type="number" placeholder="10"/>

          <Button isDisabled={isDisabled} children="Submit" actionType="submit" isSuccess={isSuccess} />
    
        </form>

          <BackButton/>

      </div>         
    );
}