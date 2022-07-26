import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {collection, getDocs, doc, addDoc, query, serverTimestamp, orderBy, where} from "firebase/firestore";
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
    async (data) => {
        debugger
        let posts;
        let followPosts = []
        let tab = data.postValue
        if (tab === 'following') {
            const post = collection(db, "post")
            for (const i of data.followingUser) {
                const q = query(post, where('name', "==", i), orderBy('date', 'desc'))
                followPosts.push((await getDocs(q)).docs)
            }
            return {followPosts, tab}
        } else {
            const post = query(collection(db, "post"), orderBy('date', 'desc'))
            posts = await getDocs(post)
        }

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
        followingPost: []
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
            state.followingPost = [];
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
            debugger
            state.isFetching = false
            if (action.payload.tab === 'following') {

                state.followingPost = action.payload.followPosts.map((d) => {

                    return d.map((i) => {
                        return i.data()
                    })

                })
            } else {
                state.newPost = action.payload.map((d) => {
                    return d.data()
                })
            }
        },

    }
})


export const getProgress = (state) => {
    return state.PostSlice.isPosting
}


export const getSuccessPost = (state) => {
    return state.PostSlice.isSuccessPost
}

export const getFollowingPost = (state) => {
    return state.PostSlice.followingPost
}


export const {setLikeAC, setPostNull, setProgress, setSuccessPost} = PostSlice.actions

export default PostSlice.reducer
