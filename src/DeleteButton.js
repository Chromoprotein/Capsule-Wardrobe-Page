export default function DeleteButton({handleDelete}) {
    return (
        <button type="button" className="smallButton dangerButton" onClick={handleDelete}>Delete</button>
    );
}