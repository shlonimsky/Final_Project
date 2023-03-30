import { Box, Button, TextField, FormControl,InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


const LoginRegister = (props) => {
    const title = props.title
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState(false)

    // const validateEmail = () => {
    //     const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //     return regex.test(email) ? 
    //     if (emailRegex.test(email)) {
    //     console.log("Valid email address");
    //     } else {
    //     console.log("Invalid email address");
    //     }
    // }

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
        <section>
            <div className="logo_card">Logo will be here</div>
            <div>
                <Box component="form" noValidate='off' 
                 sx={{
                    // width: {
                    //   xs: 100, // theme.breakpoints.up('xs')
                    //   sm: 200, // theme.breakpoints.up('sm')
                    //   md: 300, // theme.breakpoints.up('md')
                    //   lg: 400, // theme.breakpoints.up('lg')
                    //   xl: 500, // theme.breakpoints.up('xl')
                    // },
                    border : 1,
                    m : 1,
                  }}
                >
                   <h1>{title}</h1>
                    <TextField sx={{m: 1, width: '25ch'}} id='email' label="Enter email" variant="outlined"
                    error={!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)}
                    onChange={(e) => setEmail(e.target.value)}/>

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password"
                        >Password</InputLabel>
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
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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
                            <Button variant="contained" onClick={() => handleAction()}>{title}</Button>

                           <div>
                {
                title == 'register' 
                ? <Link to='/login'>Login</Link> 
                : <Link to='/register'>Register</Link>
                }
            </div>

                </Box>

            </div>
        </section>
    )
}

export default LoginRegister