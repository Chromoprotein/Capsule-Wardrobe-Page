import { Link } from "react-router-dom";
import Button from "./Button";

export default function BackButton() {
    return (
        <Link to={`/`}>
            <Button children="Return" />
        </Link>
    );
};