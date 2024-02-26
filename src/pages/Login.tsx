import { auth, provider } from "../config/firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"
export const Login =()=>{
    const navigate = useNavigate();
    const siginInWithGoogle = async()=>{
        const result = await signInWithPopup(auth, provider)
        console.log(result);
        navigate("/")
    }
    return(
        <div>
            <h1>sign in with your google account</h1>
            <button onClick={siginInWithGoogle}>Sign In</button>
        </div>
    )
}