import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {DataStore} from "aws-amplify";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../Firebase/firebase";


export const ThunkGetStories = createAsyncThunk(
    'story/ThunkGetStories',
    async () => {
        const story = collection(db, "story")
        let stories = await getDocs(story)

        return stories.docs
    }
)


const storySlice = createSlice({
    name: 'story',

    initialState: {
        story: [],
        isFetching: false
    },

    reducers: {
        setNullStory: (state) => {
            state.story = []
        }
    },

    extraReducers: {
        [ThunkGetStories.pending]: (state) => {
            state.isFetching = true
        },
        [ThunkGetStories.fulfilled]: (state, action) => {
            state.isFetching = false
            state.story = action.payload.map((d) => {
                return d.data()

            })
        }
    }

})


export const {setNullStory} = storySlice.actions

export default storySlice.reducer