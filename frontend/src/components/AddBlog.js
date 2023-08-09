import React, {useState} from 'react'
import { Box, InputLabel,TextField,Typography,Button } from '@mui/material'
import axios from 'axios';
const labelStyle = {mb:2,mt:2,fontSize:'24px',fontWeight:'bold'}
const AddBlog = () => {
  const [inputs,setInput]=useState({
    title:"",
    description:"",
    imageURL:"",
  });
  const handleChange = (e)=>{
    setInput((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
    }));
  };
  const sendRequest = async ()=>{
    const res = await axios.post("http://localhost:8000/api/blog/add", {
      title: inputs.title,
      description: inputs.description,
      image : inputs.imageURL,
      user: localStorage.getItem("userId"),
    })
    .catch((err)=>console.log(err));
    const data=await res.data;
    return data;
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data)=> console.log(data));
  };
  return (
    <div style={{marginLeft: '400px', marginRight: '400px' }}>
      <form onSubmit={handleSubmit} marginTop={3}>
        <Box border={3} borderColor={"pink"} borderRadius= {10} boxShadow= "10px 10px 20px #ccc" padding={3} margin={3} display='flex' flexDirection={"column"} width={"80%"}>
          <Typography fontWeight={'bold'} padding={3} color="grey" variant='h2' textAlign={'center'}>Post Your Blogs</Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField name="title" onChange = {handleChange} value={inputs.title}/>
          <InputLabel sx={labelStyle}>Description</InputLabel>
          <TextField name="description" onChange = {handleChange} value={inputs.description} />
          <InputLabel sx={labelStyle}>ImageURL</InputLabel>
          <TextField name="imageURL" onChange = {handleChange} value={inputs.imageURL}/>
          <Button sx={{mt:2,borderRadius:4}} variant="contained" color='warning' type="submit">Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog
