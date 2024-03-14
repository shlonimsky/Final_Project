import { Badge, Box, Card, CardMedia } from "@mui/material"

const ImageList = ({imgs, stateChanger, editing}) => {


    const removeImage = (index) => {
        imgs.splice(index,1)
stateChanger([...imgs])

    }

    return(
        <Box sx={{display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap" }} m={1}>

        {editing 
        ? imgs.map((url, i) =>    
            < >
                    <a href={url} key={i}>
                <Card >
                <CardMedia
                    sx={{ height: 150, width: 150, border: 1, borderRadius: 2}}
                    image={url}
                    title="image"
                    />
                </Card>
                    </a>
                    <Badge key={i}
                    color="primary" 
                    badgeContent="X" 
                    sx={{position:"relative", left: -20, overflowX:1}}
                    onClick={() => removeImage(i)}
                ></Badge>
            </>
                    ) 
        : imgs.map((url, i) =>    
        <a href={url} key={i}>

                 <Card  >
                <CardMedia
                    sx={{ height: 150, width: 150, border: 1, borderRadius: 2}}
                    image={url}
                    title="image"
                    />
                </Card>
                    </a>
                )
        }

        
        </Box>
    )
}

export default ImageList