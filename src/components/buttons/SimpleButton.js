export default function SimpleButton({ text, eventHandler }) {
    return (
        <button type="button" className="bigButton idleStyle" onClick={eventHandler}>{text}</button>
    );
}