import {useForm} from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { addDoc, collection} from "firebase/firestore"
import { DB} from "../../config/firebase"
import { auth } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
export interface DataForm {
    title: string,
    description:string,
    
}

export const AddForm = ()=>{
    const navigate = useNavigate();
    
    const schema = yup.object().shape({
        title: yup.string().required("You Should Put a Title"),
        description: yup.string().required("You Should Put a description")
    })

    const { register, handleSubmit, formState: {errors}, } = useForm({
        resolver: yupResolver(schema),
    })

    const [user] = useAuthState(auth)
    const postsRef = collection(DB, "posts")
    const onaddPost= async (data: DataForm)=>{
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid
        })
        navigate("/")
    }

    return(
        <form onSubmit={handleSubmit(onaddPost)}>
            <input placeholder="title.." {...register("title")} className="title-post"/>
            <p style={{color: "red"}}>{ errors.title?.message }</p>
            <textarea placeholder="description..." {...register("description")} className="description-post"/>
            <p style={{color: "red"}}>{ errors.description?.message }</p>
            <input type="submit" className="submit-form"/>
        </form>
    )
}