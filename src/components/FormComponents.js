import capitalize from "../utils/capitalize";

export function SelectMenu({ name, menuState, inputArray, eventHandler }) {

    return (
        <select className={menuState ? 'bigButton selectedStyle' : 'bigButton idleStyle'} value={menuState} name={name} onChange={eventHandler}>
        <option value="" disabled selected>
            {capitalize(name)}
        </option>
        {inputArray.map((formality) => (
            <option key={formality} value={formality}>
            {capitalize(formality)}
            </option>
        ))}
        </select>
    );

};

export function InputField({ name, menuState, eventHandler, type, placeholder }) {
    return (
        <div className={menuState ? "bigButton selectedStyle" : "bigButton idleStyle"}>
            <label>{capitalize(name)} </label>
            <input className="textInputStyle" type={type} name={name} value={menuState} onChange={eventHandler} placeholder={placeholder} />
        </div>
    );
}

export function ColorPicker({ type, menuState, colorsArray, eventHandler }) {
    return (

        <div className={menuState.length !== 0 ? 'selectedStyle bigButton checkboxContainer' : 'bigButton idleStyle checkboxContainer'}>
            {colorsArray.map((color) => (
                <div key={color}>
                    <label class="formControl">
                        <input
                            type={type}
                            name="color"
                            value={color}
                            checked={menuState.includes(color)}
                            onChange={eventHandler}
                            style={{backgroundColor: color}}
                            className={color === "black" ? "whiteCheckmark" : "blackCheckmark"}
                        />
                    </label>
                </div>
            ))}
        </div>

    );
}