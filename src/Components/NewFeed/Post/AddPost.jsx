import React  from 'react'
import './AddPost.style.css'



const AddPost = () => {


    return (
        <div className="box box_post-add">
            <div>
                <img src="https://lh3.googleusercontent.com/a-/AOh14GitcOF1u_0Y6X6ZvjA08b4mY5kKYXHh5O3CUZf9Lw=s83-c-mo"
                     className="img" alt="person"/>
                <input placeholder="What`s new Alex?" type="text"/>
            </div>
            <button className="btn btn_addPost">Post it!</button>
        </div>
    )
}



export  default  AddPost