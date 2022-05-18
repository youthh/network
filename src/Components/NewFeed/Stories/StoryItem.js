import React from 'react'



const StoryItem = (props) => {


    return (
        <div className="story__item">
            <div className="over"/>
            <img className="story_img" src={props.photo} />
                <div className="block">
                <div className="person_img_stor">
                    <div>
                        <img src={props.img}
                             className="img img_story-pers" alt=""/>
                    </div>
                </div>
            </div>
            <div className="block_name">
                <h5 className="user_story-name">{props.userName}</h5>
            </div>

        </div>
    )

}


export default StoryItem;