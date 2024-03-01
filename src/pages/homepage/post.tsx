import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { DB, auth } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { PostData } from "./Home"
import { useEffect, useState } from "react"
interface Props{
    post:PostData,
}

interface Like{
    likeId:string;
    userId: string
}
export const Post= (props: Props)=>{
    const {post}= props;

    const [likeAmount, setLikeAmount] = useState<Like[] | null>(null)

    const [user] = useAuthState(auth)
    const likesRef = collection(DB, "Like") //get collection from database

    const likeDoc = query(likesRef, where("postid", "==", post.id)) 

    const getLikes = async()=>{ //get the data from data base
        const data = await getDocs(likeDoc)
        // console.log(data.docs.map((doc)=> ({...doc.data(), id: doc.id}))); to check from data
        setLikeAmount(data.docs.map((doc)=> ({userId: doc.data().userId, likeId:doc.id})))
    }



    const addLike =async()=>{ // to save the data if you click on like and send it to database
        try{
        const newDoc= await addDoc(likesRef, { 
            userId: user?.uid,
            postid: post.id,
        })

        if(user){
        setLikeAmount((prev)=> prev ? [...prev, {userId: user?.uid, likeId:newDoc.id}] : [{userId: user?.uid, likeId:newDoc.id}])
         //to render the like you do at same moment without refresh the page
        }

    } catch(err){
        console.log(err);
        
    }
    } ;

    
    const deleteLike =async()=>{ // to save the data if you click on like and send it to database
        try{
            //
            const likeToDeleteQuery = query(likesRef,
                where("postid", "==", post.id), 
                where("userId", "==", user?.uid));

            const dataToDelete = await getDocs(likeToDeleteQuery) 

            const likeToDelete = doc(DB ,"Like", dataToDelete.docs[0].id)
            
        await deleteDoc(likeToDelete)

        if(user){
        // setLikeAmount((prev)=> prev ? [...prev, {userId: user?.uid}] : [{userId: user?.uid}])

         //to render the like you do at same moment without refresh the page
        setLikeAmount((prv)=> prv && prv?.filter((like)=> like.likeId !== dataToDelete.docs[0].id))
        }

    } catch(err){
        console.log(err);
        
    }
    } ;

    const hasLiked = likeAmount?.find((like)=> like.userId === user?.uid) // fn => check user and like to remove like 

    useEffect(()=>{
        getLikes() 
    }, [])
    
    return(
        <div>
            <h1>{post.title}</h1>
            <h1>{post.description}</h1>
            <h1>@{post.username}</h1>
            <button onClick={hasLiked ? deleteLike : addLike}> {hasLiked ? <> &#128078; </>: <>&#128077; </>}</button>
            { likeAmount && <p> Likes: {likeAmount.length}</p>}
        </div>
    )
}


