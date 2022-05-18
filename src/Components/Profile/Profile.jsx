import React from "react";
import './Profile.style.css'
import {useSelector} from "react-redux";
import {Avatar} from "@mui/material";


const Profile = () => {

    let name = useSelector(state => state.userSlice.user.name)
    let img = useSelector(state => state.userSlice.user.img)

    return (
        <div className="box box_profile">
            <div className="inner_box-profile">
               <div className="box_avata_profile">
                   {
                       img ? <img className="img" src={img} alt="pers"/>
                           :  <Avatar  sx={{ bgcolor: "#1877f2" }}>E</Avatar>
                   }
               </div>
                <div className="box_profile-content">
                    <h4 className="name_user">{name}</h4>
                </div>
            </div>
        </div>
    )
}



export  default  Profile