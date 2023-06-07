import { Avatar, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateUserImage } from "../../Redux/actions";

// import ImageKit from "imagekit";
import { IKImage, IKContext, IKUpload } from 'imagekitio-react'



const MyAvatar = ({ user }) => {
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();

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
      };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "15%" }}>
            <Avatar alt={user.first_name || user.email} src={user.avatar || '#'} onClick={() => changeAvatar()} sx={{ width: "100px", height: "100px" }} />
        
            {/* {
               isEdit && <input type="file" id="avatar" name="avatar"
                accept="image/png, image/jpeg" onChange={(e) => changeAvatar(e)}></input>
            }  */}
          

            <IKContext
            publicKey={publicKey} 
            urlEndpoint={urlEndpoint} 
            transformationPosition="path"
            authenticationEndpoint={authenticationEndpoint} >
                

            {/* // Image component */}
            <IKImage path="/default-image.jpg" transformation={[{
                "height": "300",
                "width": "400"
            }]} />

            {/* // Image upload */}
            <IKUpload 
            fileName={`avatar-${user.id}`} 
            useUniqueFileName={true}
            overwriteFile={true}
            onError={onError}
            onSuccess={onSuccess}
            folder={"/avatars"}
            />
            </IKContext>
            
        </Box>
    )
}

export default MyAvatar