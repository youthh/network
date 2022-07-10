import React, {useEffect, useRef, useState} from 'react'
import './AddPost.style.css'
import {useDispatch, useSelector} from "react-redux";
import {
    addNewPostThunk,
    getProgress,
    getSuccessPost,
    setProgress,
    setSuccessPost,
    ThunkGetPost
} from "../../../Slices/PostSlice";
import {getUser} from "../../../Slices/userSlice";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {CircularProgress, Snackbar} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import {styled} from "@mui/material/styles";


const AddPost = (props) => {
    let reff = useRef()
    let [image, setImg] = useState(null);
    const img = useSelector(state => state.userSlice.user.img)
    const isProgress = useSelector(state => getProgress(state))
    const isSuccess = useSelector(state => getSuccessPost(state))
    const user = useSelector(state => getUser(state))
    const dispatch = useDispatch()
    const [open, setOpen] = useState(isSuccess);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImg(e.target.files[0]);
        }
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setSuccessPost())
        setOpen(false);
    };

    const Input = styled('input')({
        display: 'none',
    });

    const addPost = () => {

        let storage = getStorage();
        let refer = ref(storage, `user/${user.name}/${image.name}`)
        let uploadTask = uploadBytesResumable(refer, image);
        uploadTask.on('state_changed',
            (snapshot) => {

                if (!isProgress) {
                    dispatch(setProgress(true))
                }
            },
            (err) => {
            },
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    let data = {
                        name: user.name,
                        userImg: user.img,
                        img: url,
                        text: reff.current.value
                    }


                    dispatch(addNewPostThunk({data})).then(() => {
                        setOpen(true);
                        dispatch(setProgress(false))
                        dispatch(ThunkGetPost())
                        dispatch(setSuccessPost())
                    })

                });
            }
        )


    }


    return (
        <div className="add_post_container">
            <div className="box box_post-add">
                <div>
                    <img src={img}
                         className="img" alt="person"/>
                    <input ref={reff} placeholder="What`s new Alex?" type="text"/>
                </div>
                <div>
                    <label htmlFor="contained-button-file">
                        <Input onChange={(e) => handleChange(e)} className="btn btn_post"
                               accept="image/*" id="contained-button-file" multiple type="file"/>
                        <Button disabled={!!isProgress} className="btn btn_post" variant="contained" component="span">
                            Upload
                        </Button>
                    </label>
                    <Button disabled={!!isProgress} onClick={() => addPost()} className="btn btn_post right"
                            variant="contained">
                        {
                            isProgress ? <CircularProgress color="inherit" size={23}/> : 'Post it!'
                        }
                    </Button>
                </div>


            </div>

            {
                isSuccess ?
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                            Post successfully added
                        </Alert>
                    </Snackbar>
                    : null
            }
        </div>
    )
}


export default AddPost;