import { auth } from "../config/firebase"
import { Link } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"
export const Navbar =()=>{
    const [user] = useAuthState(auth)
    const userSignOut = async ()=>{
        await signOut(auth)
    }
    return(
        <div className="navbar">
            <div className="pages">
                <Link to={"/"}> Home </Link>
                { !user ?
                <Link to={"/Login"}> Login </Link>
                :
                <Link to={"/AddPost"}> Add Post </Link>
                }
            </div>
            { user &&
            <div className="userdetails">
                <h1>{user?.displayName}</h1>
                <img src={user?.photoURL || "" } alt = "" width="30" height="30"/>
                <button onClick={userSignOut}> sign out</button>
            </div>
            }

        </div>
    )
}