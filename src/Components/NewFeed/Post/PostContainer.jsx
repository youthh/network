import React from 'react'
import "./Post.style.css"
import PostItem from "./PostItem";

import {CircularProgress} from "@mui/material";


const PostContainer = ({posts, isFetching, user, setLike}) => {
    
    return (
        <div>
            {
                isFetching ? <CircularProgress/> :
                        posts.map((p, index) => {
                            return <PostItem setLike={setLike}
                                             key={index}
                                             userName={p.data.name}
                                             text={p.data.text}
                                             date={new Date(p.data.date.seconds * 1000).toLocaleString('PT')}
                                             likeCount={p.data.countOfLikes}
                                             comment={p.data.countOfCom}
                                             img={p.data.img}
                                             user={user}
                                             id={p.id}
                                             imgUser={p.data.userImg}
                            />
                        })
            }
        </div>
    )
}


export default PostContainer;

