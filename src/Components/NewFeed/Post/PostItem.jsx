import React, {useState} from "react";
import {BsHeartFill, BsThreeDots} from "react-icons/bs";
import {MdOutlineModeComment} from "react-icons/md";
import {NavLink} from "react-router-dom";




const PostItem = ({imgUser, userName, date, text, img, id,
                      likeCount,
                      user,
                      setLike}) => {


    return(
        <div className="box item_post-box">
            <div className="block_info-post">
                <div className="top_info">
                    <div>
                        <div className="profile_box-img">
                            <img className="img img_person-post" src={imgUser} alt=""/>
                        </div>

                    <div className="box_text-post">
                            <NavLink className="post_Username" to={"/" + userName} >{userName}</NavLink>
                            <p>{date}</p>
                        </div>
                    </div>
                    <div className="box dots_block">
                        <BsThreeDots   color="#c8cfd8" />
                    </div>
                </div>
                <p className="text_info">
                    {
                        text
                    }
                </p>
            </div>
            <div className="photo_post">
                {
                    img ?  <img className="img_post" src={img} alt="post_img"/> : null
                }
            </div>


            <div className="bottom__posts">
                <div  >
                    <BsHeartFill onClick={() => setLike(id, userName,  user.name, likeCount)}
                                 size="25" color={likeCount.includes(user.name) ?  '#1877f2' : '#acb5c3'}/>
                    <p>{likeCount.length}</p>
                </div>
                <div>
                    <MdOutlineModeComment size={26}/>
                </div>
            </div>
        </div>
    )
}


export default PostItem;