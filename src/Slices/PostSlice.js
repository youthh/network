import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {collection, getDocs, doc } from "firebase/firestore";
import {db} from "../Firebase/firebase";


export const ThunkGetPost = createAsyncThunk(
    'Post/ThunkGetPost',
    async () => {

        const post = collection(db, "post")
        let posts =  await getDocs(post)

        return posts.docs
    }
)

export const ThunkSetLike = createAsyncThunk(
    'Post/ThunkSetLike',
    async (data) => {



    }
)


const PostSlice = createSlice({
    name: 'Post',

    initialState: {
        isFetching: false,
        newPost: [],
    },

    reducers: {
        setLikeAC: (state, data) => {

            state.newPost.map((post) => {
                if (post.id === data.payload.data) {
                    data.payload.liked ? post.likeCount-- : post.likeCount++
                }
            })
        },
        setPostNull: (state) => {
            state.newPost = [];
        }
    },

    extraReducers: {
        [ThunkGetPost.pending]: (state) => {
            state.isFetching = true
        },
        [ThunkGetPost.fulfilled]: (state, action) => {
            state.isFetching = false
            state.newPost = action.payload.map((d) => {
                return d.data()

            })
        },

    }
})


export const {setLikeAC, setPostNull} = PostSlice.actions

export default PostSlice.reducer
