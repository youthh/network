import React, {useEffect} from 'react'
import "./Post.style.css"
import PostItem from "./PostItem";
import {getFollowingPost, setLikeAC, setPostNull, ThunkGetPost, ThunkSetLike} from "../../../Slices/PostSlice";
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress} from "@mui/material";
import {getFollowingUser} from "../../../Slices/userSlice";


const PostContainer = ({postValue, posts, isFetching, setLikeThunk, dispatch}) => {
    let followingPosts = useSelector(state => getFollowingPost(state))
    let followingUser = useSelector(state => getFollowingUser(state))


    useEffect(() => {

        dispatch(ThunkGetPost({followingUser, postValue}))
        return () => {
            dispatch(setPostNull())
        }

    }, [dispatch, followingUser, postValue])

    return (
        <div>
            {
                isFetching ? <CircularProgress/> :
                    postValue === 'all' ?
                        posts.map((p, index) => {

                            return <PostItem post={posts}
                                             isFollow={p.isFollow}
                                             key={index}
                                             userName={p.name}
                                             text={p.text}
                                             data={new Date(p.date.seconds * 1000).toLocaleString('PT')}
                                             likeCount={p.countOfLikes}
                                             comment={p.countOfCom}
                                             img={p.img}
                                             id={p.id}
                                             setLikeThunk={setLikeThunk}
                                             imgUser={p.userImg}
                            />
                        })
                        :
                        followingPosts.map((i) => {

                            return i.map((p, index) => {

                                return <PostItem post={posts}
                                                 key={index}
                                                 userName={p.name}
                                                 text={p.text}
                                                 data={new Date(p.date.seconds * 1000).toLocaleString('PT')}
                                                 likeCount={p.countOfLikes}
                                                 comment={p.countOfCom}
                                                 img={p.img}
                                                 id={p.id}
                                                 setLikeThunk={setLikeThunk}
                                                 imgUser={p.userImg}
                                />
                            })
                        })

            }
        </div>
    )
}


export default PostContainer;

