import React, {useEffect} from 'react'
import "./Post.style.css"
import PostItem from "./PostItem";
import {setLikeAC, setPostNull, ThunkGetPost, ThunkSetLike} from "../../../Slices/PostSlice";
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress} from "@mui/material";


const PostContainer = (props) => {
    const dispatch = useDispatch();
    let posts = useSelector((state => state.PostSlice.newPost))
    let isFetching = useSelector((state => state.PostSlice.isFetching))


    const setLikeThunk = (data, liked) => {

        dispatch(ThunkSetLike({data, liked})).then(() => {
            dispatch(setLikeAC({data, liked}))
        });


    }

    useEffect(() => {

        dispatch(ThunkGetPost())

        // return () => {
        //     dispatch(setPostNull())
        // }

    }, [])

    return (
        <div>

            {
               isFetching ?  <CircularProgress   /> :
                   posts.map((p, index) => {

                       return <PostItem key={index}
                                        userName={p.name}
                                        text={p.text}
                                        data={new Date(p.date.seconds).toLocaleString("pt-BR")}
                                        likeCount={p.countOfLikes}
                                        comment={p.countOfCom}
                                        img={p.img}
                                        id={p.id}
                                        setLikeThunk={setLikeThunk}
                                        imgUser={p.userImg}
                       />
                   })
            }


        </div>
    )
}


export default PostContainer;

