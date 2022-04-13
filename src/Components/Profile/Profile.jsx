import React from "react";
import './Profile.style.css'


const Profile = () => {

    return (
        <div className="box box_profile">
            <div className="inner_box-profile">
                <img src="https://lh3.googleusercontent.com/a-/AOh14GitcOF1u_0Y6X6ZvjA08b4mY5kKYXHh5O3CUZf9Lw=s83-c-mo"
                     alt="ava" className="img img_profile"/>
                <div className="box_profile-content">
                    <h4 className="name_user">Alexey Valiavskiy</h4>
                    <h4 className="tag-name_user">@emotion</h4>
                </div>
            </div>
        </div>
    )
}



export  default  Profile