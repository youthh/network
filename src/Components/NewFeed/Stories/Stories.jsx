import React, {useEffect} from "react";
import './Stories.style.css'
import {HiPlusSm} from "react-icons/hi";
import {useDispatch, useSelector} from "react-redux";
import StoryItem from "./StoryItem";
import {setNullStory, ThunkGetStories} from "../../../Slices/storySlice";
import {CircularProgress} from "@mui/material";

const Stories = () => {
    let dispatch = useDispatch();
    let story = useSelector((state) => state.storySlice.story)
    let isFetching = useSelector((state) => state.storySlice.isFetching)

    useEffect(() => {
        dispatch(ThunkGetStories());

        /*return () => {
            dispatch(setNullStory())
        }*/
    }, [])

    return (
        <div>
            <div className="block__stories">

                {

                    isFetching ? <CircularProgress/>   :
                       <>
                           <div className="story__item">
                               <div className="over"/>
                               <img className="story_img" src="https://images.pexels.com/photos/112116/pexels-photo-112116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="story"/>
                               <div className="block_stories_box">
                                   <div className="block_add">
                                       <div>
                                           <div className="add">
                                               <HiPlusSm color="#388af3" size={19}/>
                                           </div>
                                       </div>
                                   </div>
                                   <h5 className="title_story">Add Story</h5>
                               </div>

                           </div>
                           {
                               story.map((s , key) => {

                                   return <StoryItem key={key}
                                                     userName={s.name}
                                                     img={s.img}
                                                     photo={s.storyPhoto}  />
                               })
                           }
                       </>
                }

            </div>

        </div>
    )
}



export default Stories;