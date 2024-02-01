import { useNavigate } from "react-router-dom";

export default function useReturn() {
    const navigate = useNavigate();
    return () => { 
        setTimeout(() => {
            navigate('/');
        }, 3000);
    }
}