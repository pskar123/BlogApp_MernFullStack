import React,{useState} from 'react';
import { Box, Button, Typography, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authAction } from '../store';

 const Auth = () => {
  const dispath = useDispatch();
 const naviagte=useNavigate();
  const [inputs,setInput]=useState({
    name:"",
    email:"",
    password:""
  });
  const [isSignup,setIsSignup]= useState(false);
  const handleChange = (e) =>{
    setInput((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  };
  const sendRequest = async (type="login")=>{
   const res=await  axios.post(`http://localhost:8000/api/user/${type}`,{
    name: inputs.name,
      email: inputs.email,
      password : inputs.password
    }).catch(err=>console.log(err));
    const data =  await res.data;
    console.log(data); 
    return data;
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(inputs);
    if(isSignup){
      sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id)).then(()=>dispath(authAction.login())).then(()=>naviagte("/blogs")).then((data)=>console.log(data));
    }else{
      sendRequest().then((data)=>localStorage.setItem("userId",data.user._id)).then(()=>dispath(authAction.login())).then(()=>naviagte("/blogs")).then((data)=>console.log(data));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={500}
          display="flex"
          flexDirection="column"
          alignitem="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant='h2' padding={3} textAlign='center'>{isSignup? "sIGNUP":"Login"}</Typography>
        { isSignup && <TextField name="name" onChange={handleChange} value={inputs.name} placeholder='Name' margin='normal' />}
          <TextField name="email"  onChange={handleChange} value={inputs.email}  type={'email'} placeholder='Email' margin='normal' />
          <TextField name="password" onChange={handleChange} value={inputs.password}  type={'password'} placeholder='Password' margin='normal' />
          <Button type='submit'  variant="contained" sx={{ borderRadius: 3 ,marginTop:3}} color='warning'>Submit</Button>
          <Button onClick={()=>setIsSignup(!isSignup)} sx={{ borderRadius: 3,marginTop:3 }}>Change to {isSignup ? "Login" : "Signup"}</Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;       