import React, {useState} from 'react'
import "./Post.style.css"
import {BsHeartFill, BsSuitHeart, BsThreeDots} from "react-icons/bs";
import {MdOutlineModeComment} from "react-icons/md";


const PostContainer = (props) => {
    const [liked, setLiked] = useState(false);

    return (
        <div>
            <div className="box item_post-box">
                <div className="block_info-post">
                    <div className="top_info">
                        <div>
                            <img className="img img_person-post" src="https://lh3.googleusercontent.com/a-/AOh14GitcOF1u_0Y6X6ZvjA08b4mY5kKYXHh5O3CUZf9Lw=s83-c-mo" alt=""/>
                            <div className="box_text-post">
                                <h5>Lesha Vos</h5>
                                <p>12 hours ago</p>
                            </div>
                        </div>
                        <div className="box dots_block">
                            <BsThreeDots   color="#c8cfd8"/>
                        </div>
                    </div>
                    <p className="text_info">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
                <div className="photo_post">
                    <img className="img_post" src="https://i.pinimg.com/550x/41/9f/24/419f2424a552396724e83efd08f02f6e.jpg" alt="post_img"/>
                </div>


                <div className="bottom__posts">
                    <div  >
                        <BsHeartFill onClick={() => setLiked((val) => !val)}
                                     size="25" color={liked ?  '#1877f2' : '#acb5c3'}/>
                        <p>10</p>
                    </div>
                    <div>
                        <MdOutlineModeComment size={26}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export  default  PostContainer;

