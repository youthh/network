import React from 'react'
import Stories from "./Stories/Stories";
import AddPost from "./Post/AddPost";
import PostContainer from "./Post/PostContainer";
import './NewFeed.st.css'

const NewFeedContainer = () => {


    return <div className="newFeedContainer">
        <Stories/>
        <AddPost/>
        <PostContainer/>
    </div>
}



export default NewFeedContainer;