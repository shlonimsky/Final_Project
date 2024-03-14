import { Avatar, Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SearchResult = ({helpers, tasks}) => {
    const navigate = useNavigate();
    const params = useParams().title;
    console.log("params ",params);

    useEffect(() => {
        // console.log(params);
    }, [useParams])

    useEffect(() => {
        // console.log(helpers);
    },[helpers]);
// console.log(helpers, tasks);
    return(
        <Box >
            {
              params === "helper" && (!helpers || helpers.length === 0 ? <div>Not found</div>  : 
               helpers.map(helper => 
               <Box key={helper.id} onClick={() => navigate(`/user/${helper.user_id}`)}>
                <Button>
                <Avatar src={helper.avatar ?  helper.avatar : "#"} alt={helper.first_name} />
                    <Typography >{helper.first_name}</Typography>
                </Button>
                  
               </Box>)
            )}
            {
               params==="task" && ( !tasks || tasks.length === 0 ? <div>Not found</div>  : 
                tasks.map(task => 
                <Box key={task.id} onClick={() => navigate(`/task/${task.id}`)}>
                     <Typography >{task.title}</Typography>
                </Box>)
            )}
        </Box>
    )
}

export default SearchResult