import React, {useState} from "react";
import {BsHeartFill, BsThreeDots} from "react-icons/bs";
import {MdOutlineModeComment} from "react-icons/md";
import {NavLink} from "react-router-dom";



const PostItem = (props) => {
    const [liked, setLiked] = useState(false);


    return(
        <div className="box item_post-box">
            <div className="block_info-post">
                <div className="top_info">
                    <div>
                        <div className="profile_box-img">
                            <img className="img img_person-post" src={props.imgUser} alt=""/>
                        </div>

                    <div className="box_text-post">
                            <NavLink className="post_Username" to={"/" + props.userName} >{props.userName}</NavLink>
                            <p>{props.data}</p>
                        </div>
                    </div>
                    <div className="box dots_block">
                        <BsThreeDots   color="#c8cfd8" />
                    </div>
                </div>
                <p className="text_info">
                    {
                        props.text
                    }
                </p>
            </div>
            <div className="photo_post">
                {
                    props.img ?  <img className="img_post" src={props.img} alt="post_img"/> : null
                }
            </div>


            <div className="bottom__posts">
                <div  >
                    <BsHeartFill onClick={() => {
                        setLiked((val) => !val)
                        props.setLikeThunk(props.id, liked);
                    }}
                                 size="25" color={liked ?  '#1877f2' : '#acb5c3'}/>
                    <p>{props.likeCount}</p>
                </div>
                <div>
                    <MdOutlineModeComment size={26}/>
                </div>
            </div>
        </div>
    )
}


export default PostItem;