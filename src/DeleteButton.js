export default function DeleteButton({handleDelete}) {
    return (
        <div className="formWrapper">
            <p>- - Danger zone - - Delete permanently</p>
            <button type="button" className="bigButton dangerButton" onClick={handleDelete}>Delete</button>
        </div>
    );
}