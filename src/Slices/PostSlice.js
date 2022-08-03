import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    collection,
    getDocs,
    doc,
    addDoc,
    query,
    serverTimestamp,
    orderBy,
    where,
    updateDoc,
    arrayRemove, arrayUnion
} from "firebase/firestore";
import {db} from "../Firebase/firebase";


export const addNewPostThunk = createAsyncThunk(
    'user/addNewPostThunk',
    async (data) => {

        const docRef = await addDoc(collection(db, "post"), {
            countOfLikes: [],
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

        let posts;
        let followPosts = []
        let tab = data.postValue
        if (tab === 'following') {
            const post = collection(db, "post")
            for (const i of data.followingUser) {
                const q = query(post, where('name', "==", i), orderBy('date', 'desc'))
                followPosts.push((await getDocs(q)).docs)
            }
            followPosts.flat(3)

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

        const post = doc(db, 'post', data.id);

        if (data.likes.includes(data.nameUser)){
            await updateDoc(post, {
                countOfLikes: arrayRemove(data.nameUser)
            });
        }
        else {
            await updateDoc(post, {
                countOfLikes: arrayUnion(data.nameUser)
            });
        }

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

                if (post.id === data.payload.id) {

                    post.data.countOfLikes.includes(data.payload.nameUser) ?
                        post.data.countOfLikes.pop(data.payload.nameUser) :
                        post.data.countOfLikes.push(data.payload.nameUser)
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

            if (action.payload.tab === 'following') {
                state.newPost = action.payload.followPosts.flat().map((d) => {

                    return {data: d.data(), id: d.id}
                })
            } else {
                state.newPost = action.payload.map((d) => {
                    return  {data: d.data(), id: d.id}
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
    return state.PostSlice.newPost
}


export const {setLikeAC, setPostNull, setProgress, setSuccessPost} = PostSlice.actions

export default PostSlice.reducer
