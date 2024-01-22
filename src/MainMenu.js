import { Link } from "react-router-dom";

export default function MainMenu() {
    return (
        <>
            <Link to={`/generate`}><button className="bigButton blueButton" name="linkButton">Generate Outfits</button></Link>
            <Link to={`/submit`}><button type="button" className="bigButton" name="linkButton">Add Clothes</button></Link>
            <Link to={`/outfits`}><button className="bigButton" name="linkButton">Saved Outfits</button></Link>
        </>
    );
};