export default function ResetButton({ resetButtonState, resetFilters }) {
    return (
        <button className={resetButtonState ? "bigButton disabledStyle" : "bigButton idleStyle"} name="resetButton" onClick={resetFilters} disabled={resetButtonState}>
            Reset Filters
        </button>
    );
}