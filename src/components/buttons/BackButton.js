import { Link } from "react-router-dom";

export default function BackButton() {
    return (
        <Link to={`/`}><button type="button" name="deleteButton" className="bigButton idleStyle">Return</button></Link>
    );
};