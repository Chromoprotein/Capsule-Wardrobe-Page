import { Link } from "react-router-dom";

export default function MainMenu() {
    return (
        <>
            <Link to={`/submit`}><button type="button" className="bigButton blueButton" name="linkButton">Add Clothes</button></Link>
            <Link to={`/generate`}><button className="bigButton greenButton" name="linkButton">Generate Outfits</button></Link>
        </>
    );
};