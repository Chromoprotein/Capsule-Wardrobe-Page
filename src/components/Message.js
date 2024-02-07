export default function Message({ children, animate, onClose }) {

    // Classes for modals
    const animateClass = animate ? "success-animation" : "";
    const modalStyle = animate ? "modalStyle" : "";

    return (
    <div className={`${animateClass} ${modalStyle}`}>
        <div className="messageContent">
            {children}
            {onClose && <button className="xButton" onClick={onClose}>X</button>}
        </div>
    </div>
    );
}