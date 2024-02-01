import BackButton from "./BackButton";
import colors from "./ColorsArray";
import { formality } from "./formalityArray";
import category from "./categoryArray";
import SubmitButton from "./SubmitButton";

export default function ClothingForm({ handleClothingSubmit, newClothing, handleClothesFormChange, actionType }) {

      // Submit button
    const isDisabled = !(newClothing.category && newClothing.season && newClothing.formality && newClothing.color && newClothing.brand && newClothing.cost && newClothing.size);

    return (
      <div className="formWrapper">
        <form onSubmit={handleClothingSubmit}>

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

            <select className={newClothing.season ? "bigButton selectedStyle" : "bigButton idleStyle"} value={newClothing.season} name="season" onChange={handleClothesFormChange}>
              <option value="" disabled selected>
                  Season
              </option>
              <option value="winter">Winter</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="autumn">Autumn</option>
            </select>

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

          <div className={newClothing.color ? "bigButton selectedStyle checkboxContainer" : "bigButton idleStyle checkboxContainer"}>
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

            <div className={newClothing.brand ? "bigButton selectedStyle" : "bigButton idleStyle"}>
              <label>Brand: </label>
              <input className="textInputStyle" placeholder="Brand A" type="text" name="brand" value={newClothing.brand} onChange={handleClothesFormChange} />
            </div>

            <div className={newClothing.cost ? "bigButton selectedStyle" : "bigButton idleStyle"}>
              <label>Cost: </label>
              <input className="textInputStyle" type="number" name="cost" value={newClothing.cost} onChange={handleClothesFormChange} />
            </div>

            <SubmitButton isDisabled={isDisabled} actionType={actionType} />
    
        </form>

          <BackButton/>

      </div>         
    );
}