import { ReactNode } from "react";

interface ButtonProps {
    isDisabled?: boolean;
    children: ReactNode;
    actionType?: string;
    eventHandler?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    isSuccess?: boolean;
}

export default function Button({ isDisabled, children, actionType, eventHandler, isSuccess}: ButtonProps) {

    // Action type can be: submit, delete, or undefined

    // Classes
    const disabledOrIdleClass = isDisabled ? "disabledStyle" : "idleStyle";
    const dangerClass = actionType === "delete" ? "dangerButton" : '';
    const submitClass = actionType === "submit" ? "specialButton" : '';

    // Button type
    const buttonType = actionType === "submit" ? "submit" : "button";

    // Event handler
    const onClick = eventHandler && eventHandler;

    // Checkmark and animation
    const checkmark = isSuccess && <span className="success-animation"> &#x2714;</span>;
    
    return (
        <button 
            className={`bigButton 
            ${disabledOrIdleClass} 
            ${dangerClass} 
            ${submitClass}`}
            type={buttonType} 
            disabled={isDisabled} 
            onClick={onClick}
        >
            {children} 
            {checkmark}
        </button>
    );
}