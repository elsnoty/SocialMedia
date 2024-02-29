import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { DB, auth } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { PostData } from "./Home"
import { useEffect, useState } from "react"
interface Props{
    post:PostData,

}

export const Post= (props: Props)=>{
    const {post}= props;

    const [likeAmount, setLikeAmount] = useState<number | null>(null)

    const [user] = useAuthState(auth)
    const likesRef = collection(DB, "Likes")

    const likeDoc = query(likesRef, where("postid", "==", post.id))

    const getLikes = async()=>{
        const data = await getDocs(likeDoc)
        // console.log(data.docs.map((doc)=> ({...doc.data(), id: doc.id}))); to check from data
        setLikeAmount(data.docs.length)
    }

    useEffect(()=>{
        getLikes()
    }, [])
    const addLike =async()=>{
        await addDoc(likesRef, { 
            userId: user?.uid,
            postid: post.id,
        })
    }
    return(
        <div>
            <h1>{post.title}</h1>
            <h1>{post.description}</h1>
            <h1>@{post.username}</h1>
            <button onClick={addLike}> &#128077;</button>
            { likeAmount && <p> Likes: {likeAmount}</p>}
        </div>
    )
}