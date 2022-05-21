import React from "react";
import './Profile.style.css'
import {useSelector} from "react-redux";
import {Avatar} from "@mui/material";


const Profile = () => {

    let user = useSelector(state => state.userSlice.user)

    return (
        <div className="box box_profile">
            <div className="inner_box-profile">
               <div className="box_avata_profile">
                   {
                       user.img ? <img className="img" src={user.img} alt="pers"/>
                           :  <Avatar  sx={{ bgcolor: "#1877f2" }}></Avatar>
                   }
               </div>
                <div className="box_profile-content">
                    <h4 className="name_user">{user.name}</h4>
                </div>
            </div>
        </div>
    )
}



export  default  Profile