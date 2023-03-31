import { Box, Button, TextField, FormControl,InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';
import logo from '../logo.png'

const LoginRegister = (props) => {
    const title = props.title
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        setMsg('')
    },[title])

    const handleAction = () => {

        console.log("click")
    }
    

    // @mui library for password input
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };


    return (
        <section className='flex_row container' >

                <Box sx = {{display: { xs: 'none', md: 'flex' },                    
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent : 'center',
                    width : '50%', bgcolor: "primary.main", height : '80vh',
}}>
                <img src={logo} alt='logo' className='logo_card'/>
                </Box>

                <Box component="form" noValidate='off' 
                 sx={{
                width: { xs: "90vw", md: "50%", lg: "50%" }, 
                   height : '80vh',
                    border : 1,
                    borderColor: 'secondary.main',
                    bgcolor : 'background',
                    p : 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent : 'center',
                  }}
                >
                   <h1>{title==='login' ? "Log In" : "Register"}</h1>

                    <TextField sx={{m: 1, width: '25ch', bgcolor : 'white'}} id='email' label="Enter email" variant="outlined"
                    error={ email === ""? false : (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))}
                    helperText={ email==="" ||  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
                    ? "" : "Incorrect entry."}
                    onChange={(e) => setEmail(e.target.value)}/>

                    <FormControl sx={{ m: 1, width: '25ch',bgcolor : 'white' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                        
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                            />
                        </FormControl>
                        { title === 'register' && (
                            <FormControl sx={{ m: 1, width: '25ch', bgcolor : 'white' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                id="password2"
                                error={ password !== password2}
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setPassword2(e.target.value)}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                    />
                            </FormControl>
                        )}
                            <Button sx={{m:3}} variant="contained" size="large" onClick={() => handleAction()}>{title}</Button>

                           <div>
                {
                title == 'register' 
                ? <Link to='/login'>Login</Link> 
                : <Link to='/register'>Register</Link>
                }
            </div>

                </Box>

            {/* </div> */}
        </section>
    )
}

export default LoginRegister