import React, {useEffect} from "react"
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import "./ProfilePhotoItem.style.scss"

const ProfilePhotoItem = (props) => {
    return(
        <div className="profile_post_item">
            <a href="src/Components/Profile_Section/Profile_Post-page/ProfilePhotoItem#">
                <div className="overlay">
                    <div>
                        <p className="count">{props.likes}</p>
                        <FavoriteOutlinedIcon style={{color: '#1877f2'}}/>
                    </div>
                    <div>
                        <p className="count">{props.comment}</p>
                        <InsertCommentOutlinedIcon  style={{color: '#1877f2'}}/>
                    </div>
                </div>

                <div className="box_post_profile">
                    <img className="img_post_profile" src={props.imgPost} alt=""/>
                </div>
            </a>
        </div>
    )
}


export  default ProfilePhotoItem;