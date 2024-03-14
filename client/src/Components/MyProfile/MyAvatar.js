import { Avatar, Box, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateUserImage } from "../../Redux/actions";

// import ImageKit from "imagekit";
import { IKImage, IKContext, IKUpload } from 'imagekitio-react'



const MyAvatar = ({ user }) => {
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const inputRefTest = useRef(null);
    const ikUploadRefTest = useRef(null);

    const publicKey = "public_SZZWi2y0FSQ+d9ha463+dyHJGwE="
    const urlEndpoint = "https://ik.imagekit.io/helperapp"
    const authenticationEndpoint = 'http://localhost:5001/sdk/imagekit/auth'

    const changeAvatar = () => {
        console.log("edit avatar");
        console.log(user);
        // console.log({...user,avatar: "jbjkbjkbnjkn" });

    }
    // https://ik.imagekit.io/helperapp/path/to/myimage.jpg

    const onError = err => {
        console.log("Error", err);
      };
      
      const onSuccess = res => {
        console.log("Success", res);
        const avatar = res.url
        dispatch(updateUserImage({...user,avatar }))
        setIsEdit(false)
      };
      const onUploadProgress = progress => {
        console.log("Progress", progress);
      };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', marginBottom: "15%" }}>
            <Avatar alt={user.first_name || user.email} src={user.avatar || '#'} onClick={() => changeAvatar()} sx={{ width: "100px", height: "100px" }} />
            {user.first_name && !isEdit && <Typography variant="p"  sx={{'&:hover': {cursor: 'pointer', color: 'secondary.main'}}} onClick={() => setIsEdit(true)}>Edit avatar </Typography>}
        
            {/* {
               isEdit && <input type="file" id="avatar" name="avatar"
                accept="image/png, image/jpeg" onChange={(e) => changeAvatar(e)}></input>
            }  */}
          

            {isEdit &&  <Box sx={{ display: "flex", justifyContent: "center", flexDirection: 'column',}}>
            <IKContext
            
            publicKey={publicKey} 
            urlEndpoint={urlEndpoint} 
            transformationPosition="path"
            authenticationEndpoint={authenticationEndpoint} >
                

            {/* // Image component */}
            {/* <IKImage path="/default-image.jpg" transformation={[{
                "height": "300",
                "width": "400"
            }]} /> */}

            {/* // Image upload */}
            <IKUpload 
            fileName={`avatar-${user.id}`} 
            useUniqueFileName={true}
            onError={onError}
            onSuccess={onSuccess}
            onUploadProgress={onUploadProgress}
            folder={`/avatars/${user.id}`}
            inputRef={inputRefTest}
          ref={ikUploadRefTest}
            />
        {/* {inputRefTest && <button onClick={() => inputRefTest.current.click()}>Upload</button>} */}
        {/* {ikUploadRefTest && <button onClick={() => ikUploadRefTest.current.abort()}>Abort request</button>} */}
      
            </IKContext>
            {isEdit && <Typography variant="p" sx={{'&:hover': {cursor: 'pointer', color: 'secondary.main'}}} onClick={() => setIsEdit(false)}>Cancel </Typography>}

            </Box>
            }
            
        </Box>
    )
}

export default MyAvatar