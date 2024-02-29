import { getDocs, collection } from "firebase/firestore"
import { DB } from "../../config/firebase"
import { useEffect, useState } from "react"
import { Post } from "./post"

export interface PostData{
    id:string,
    title: string,
    description:string,
    userId:string,
    username:string,
}
export const Home =()=>{
    const [posts, setPosts] = useState<PostData[] | null>(null)

    const postref = collection(DB, "posts")

        const getpost = async ()=>{
            const data = await getDocs(postref);
            setPosts(data.docs.map((doc)=> ({...doc.data(), id: doc.id})) as PostData[]);
            
        };
        useEffect(()=>{
            getpost()
        }, []);
    return(
        <div>
            {posts?.map((post)=>
            <Post post={post}/>
            )}
        </div>
    )
}