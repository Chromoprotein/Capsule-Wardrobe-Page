export default function DeleteButton({handleDelete, actionType}) {
    console.log(actionType)
    return (
        <div className="formWrapper">
            <p>- - Danger zone - - Delete permanently</p>
            <button type="button" className="bigButton dangerButton" onClick={handleDelete}>Delete {actionType === "delete" && <span>&#x2714;</span>}</button>
        </div>
    );
}