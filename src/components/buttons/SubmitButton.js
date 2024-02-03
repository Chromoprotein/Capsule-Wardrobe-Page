export default function SubmitButton({ isDisabled, actionType }) {
    return (
        <button className={isDisabled ? "bigButton disabledStyle" : "bigButton idleStyle specialButton"} type="submit" disabled={isDisabled}>Submit {actionType === "submit" && <span>&#x2714;</span>}</button>
    );
}