import React  from 'react'
import './AddPost.style.css'
import {useSelector} from "react-redux";



const AddPost = () => {
    let img = useSelector(state => state.userSlice.user.img)

    return (
        <div className="box box_post-add">
            <div>
                <img src={img}
                     className="img" alt="person"/>
                <input placeholder="What`s new Alex?" type="text"/>
            </div>
            <button className="btn btn_addPost">Post it!</button>
        </div>
    )
}



export  default  AddPost