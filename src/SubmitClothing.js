import { ClothingContext } from "./ClothingContext";
import { useContext, useState } from "react";
import BackButton from "./BackButton";
import colors from "./ColorsArray";
import { formality } from "./formalityArray";
import category from "./categoryArray";
import { useNavigate } from "react-router-dom";

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

  // Submit button
  const isDisabled = !(newClothing.category && newClothing.season && newClothing.formality && newClothing.color && newClothing.brand && newClothing.cost && newClothing.size);

    return (
      <div className="formWrapper">
        <form onSubmit={handleClothingSubmit}>

          <div class="formInputContainer">
            <select className={newClothing.category ? "bigButton selectedStyle" : "bigButton idleStyle"} value={newClothing.category} name="category" onChange={handleClothesFormChange}>
              <option value="" disabled selected>
                  Category
              </option>
              {category.map((category) => (
                  <option key={category} value={category}>
                  {category}
                  </option>
              ))}
            </select>
          </div>

          <div class="formInputContainer">
            <select className={newClothing.formality ? "bigButton selectedStyle" : "bigButton idleStyle"} value={newClothing.formality} name="formality" onChange={handleClothesFormChange}>
              <option value="" disabled selected>
                  Formality
              </option>
              {formality.map((formality) => (
                  <option key={formality} value={formality}>
                  {formality}
                  </option>
              ))}
            </select>
          </div>

          <div class="formInputContainer">
            <select className={newClothing.season ? "bigButton selectedStyle" : "bigButton idleStyle"} value={newClothing.season} name="season" onChange={handleClothesFormChange}>
              <option value="" disabled selected>
                  Season
              </option>
              <option value="winter">Winter</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="autumn">Autumn</option>
            </select>
          </div>

          <div class="formInputContainer">
            <select className={newClothing.size ? "bigButton selectedStyle" : "bigButton idleStyle"} value={newClothing.size} name="size" onChange={handleClothesFormChange}>
              <option value="" disabled selected>
                  Size
              </option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>

          <div className={newClothing.color ? "formInputContainer bigButton selectedStyle checkboxContainer" : "formInputContainer bigButton idleStyle checkboxContainer"}>
              {colors.map((color) => (
                  <div key={color}>
                      <label class="formControl">
                          <input
                              type="radio"
                              name="color"
                              value={color}
                              checked={newClothing.color === color}
                              onChange={handleClothesFormChange}
                              style={{backgroundColor: color}}
                              className={color === "black" ? "whiteCheckmark" : "blackCheckmark"}
                          />
                      </label>
                  </div>
              ))}
          </div>

          <div className="formInputContainer">
            <div className={newClothing.brand ? "textInputContainer selectedStyle" : "textInputContainer"}>
              <label>Brand: </label>
              <input className="textInputStyle" type="text" name="brand" value={newClothing.brand} onChange={handleClothesFormChange} />
            </div>
          </div>

          <div className="formInputContainer">
            <div className={newClothing.cost ? "textInputContainer selectedStyle" : "textInputContainer"}>
              <label>Cost: </label>
              <input className="textInputStyle" type="number" name="cost" value={newClothing.cost} onChange={handleClothesFormChange} />
            </div>
          </div>

          <div className="formInputContainer">
            <button className={isDisabled ? "bigButton disabledStyle" : "bigButton idleStyle"} type="submit" disabled={isDisabled}>Submit New Piece</button>
          </div>

        </form>

        <div className="formInputContainer">
          <BackButton/>
        </div>

      </div> 
    );
};