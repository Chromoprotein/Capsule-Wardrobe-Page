import { Link } from "react-router-dom";
import Button from "./Button";

export default function MainMenu() {
    return (
        <>
            <Link to={`/generate`}>
                <Button children="Generate Outfit" />
            </Link>
            <Link to={`/submit`}>
                <Button children="Add Clothes" />
            </Link>
            <Link to={`/outfits`}>
                <Button children="Saved Outfits" />
            </Link>
        </>
    );
};