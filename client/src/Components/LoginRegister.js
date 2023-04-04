import { Box, Button, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton,FormHelperText } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { ifUserAuthorized } from '../Redux/actions';
import { setUser, setUserById } from '../Redux/actions';
import logo from '../logo.png';
import axios from 'axios';

const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LoginRegister = (props) => {
    const dispatch = useDispatch();
    const title = props.title
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        setMsg('')
    }, [title])

      // @mui library for password input
      const [showPassword, setShowPassword] = useState(false);
      const handleClickShowPassword = () => setShowPassword((show) => !show);
      const handleMouseDownPassword = (e) => e.preventDefault();
  

    const handleAction = async (id) => {
        console.log(id)
        if(password !== '' && !/\s+/.test(password) && regex.test(email)){
            if(id === 'login'){
                console.log("in login")
                    try{
                        const {data} = await axios.post('/login',{email,password})
                        console.log("data in LoginRegister  in func",data)
                        dispatch(ifUserAuthorized(true,data.accessToken))
                        dispatch(setUserById(data.userID,data.email))
                        setMsg(data.msg)
                        navigate(`/cabinet/${data.userID}`)
                    } catch (err){
                        console.log(err.data.msg);
                        dispatch(ifUserAuthorized(false))
                        setMsg(err.res.data.msg)
                    }
            }
            if(id === 'register'){
                if(password === password2 ){
                try {
                    const res = await axios.post('/register', {email,password})
                    console.log(res.data)
                    //setAccessToken
                    // localStorage.setItem("token",JSON.stringify(res.data))
                    setMsg(res.data.msg)
                    navigate('/login')
                } catch (err) {
                    console.log(err.res.data.msg);
                    setMsg(err.res.data.msg)
                }
            }
        }

        }
        
    }


    return (
        <section className='flex_row container' >{msg}

            <Box sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50%', bgcolor: "primary.main", height: '80vh',
            }}>
                <img src={logo} alt='logo' className='logo_card' />
            </Box>

            <Box component="form" noValidate='off'
                sx={{
                    width: { xs: "90vw", md: "50%", lg: "50%" },
                    height: '80vh',
                    border: 1,
                    borderColor: 'secondary.main',
                    bgcolor: 'background',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <h1>{title === 'login' ? "Log In" : "Register"}</h1>

                <TextField sx={{ m: 1, width: '25ch', bgcolor: 'white' }} id='email' label="Enter email" variant="outlined"
                    error={email === "" ? false : (!regex.test(email))}
                    helperText={email === "" || regex.test(email) ? "" : "Incorrect entry."}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())} />

                <FormControl sx={{ m: 1, width: '25ch', bgcolor: 'white' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        error={/\s+/.test(password)}
                        
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end" sx={{bgcolor:"transparent"}}>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                    <FormHelperText  sx={{color:"red",display : /\s+/.test(password)? "flex" : "none"}}>Password can't contain spaces</FormHelperText>
                </FormControl>

                {title === 'register' && (
                    <FormControl sx={{ m: 1, width: '25ch', bgcolor: 'white' }} variant="outlined"                                         
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Repeat password</InputLabel>
                        <OutlinedInput
                            id="password2"
                            error={password !== password2 || /\s+/.test(password)}
                            // helperText={password===password2 ? '' : "Password doesn't match."}

                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setPassword2(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Repeat password"
                        />
                        <FormHelperText  sx={{ bgcolor:"transparent", color:"red", display : password===password2? "none" : "flex"}}>Password doesn't match</FormHelperText>

                    </FormControl>
                )}
                <Button sx={{ m: 3 }} variant="contained" size="large" onClick={() => handleAction(title)}>{title}</Button>

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