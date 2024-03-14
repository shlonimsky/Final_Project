import { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from 'react-redux';
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';
import { Avatar, Box, Button, CircularProgress, Typography } from "@mui/material";

const UploadImage = (props) => {
    const {title, img, stateChanger} = props
    // title=['task', 'portfolio']
    // img = ['url1', 'url2',...]
    //stateChanger = setImg
const [isLoading, setIsLoading] = useState(false)
    const inputRefTest = useRef(null);
    const ikUploadRefTest = useRef(null);


    const publicKey = "public_SZZWi2y0FSQ+d9ha463+dyHJGwE=";
    const urlEndpoint = "https://ik.imagekit.io/helperapp";
    const authenticationEndpoint = 'http://localhost:5001/sdk/imagekit/auth';


    const onError = err => {
        setIsLoading(false)
        console.log("Error", err);
      };
      
      const onSuccess = res => {
        setIsLoading(false)
        console.log("Success", res);
        stateChanger([res.url, ...img])
      };
      const onUploadProgress = progress => {
        setIsLoading(true)
      };

     
 
      return (
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: 'column'}}>
          

            {isLoading ? <CircularProgress/> : 
            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: 'column'}}>
                <IKContext
                publicKey={publicKey} 
                urlEndpoint={urlEndpoint} 
                transformationPosition="path"
                authenticationEndpoint={authenticationEndpoint} >
                    <IKUpload 
                    fileName={title === 'task' ? `tasks` : `portfolio`} 
                    useUniqueFileName={true}
                    onError={onError}
                    onSuccess={onSuccess}
                    onUploadProgress={onUploadProgress}
                    folder={title === 'task' ? `/tasks` : `/portfolio`}
                    inputRef={inputRefTest}
                    ref={ikUploadRefTest}
                    />

                    
                </IKContext>
            </Box>}
            
        </Box>
    )
}

export default UploadImage;


