import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {collection, getDocs, doc, addDoc, query, serverTimestamp, orderBy} from "firebase/firestore";
import {db} from "../Firebase/firebase";


export const addNewPostThunk = createAsyncThunk(
    'user/addNewPostThunk',
    async (data) => {

        const docRef = await addDoc(collection(db, "post"), {
            countOfLikes: 0,
            countOfCom: 0,
            date: serverTimestamp(),
            text: data.data.text,
            userImg: data.data.userImg,
            name: data.data.name,
            img: data.data.img

        })
    }
)


export const ThunkGetPost = createAsyncThunk(
    'Post/ThunkGetPost',
    async () => {

        const post = query(collection(db, "post"), orderBy('date', 'desc') )
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
        isPosting: false,
        isFetching: false,
        isSuccessPost: false,
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
        },
        setProgress: (state, action) => {

            state.isPosting = action.payload
        },
        setSuccessPost: (state) => {
            state.isSuccessPost = !state.isSuccessPost
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



export const getProgress = (state) => {
    return state.PostSlice.isPosting
}


export const getSuccessPost = (state) => {
    return state.PostSlice.isSuccessPost
}

export const {setLikeAC, setPostNull, setProgress, setSuccessPost} = PostSlice.actions

export default PostSlice.reducer
