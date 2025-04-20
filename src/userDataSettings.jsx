import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
  Divider,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  CameraAlt as CameraIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { changefield } from './JS_script/allFetch';

const UserProfileEdit = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [editing, setEditing] = useState(false);
  
  const [userData, setUserData] = useState({
    id:localStorage.getItem("userId"),
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    course:localStorage.getItem("course"),
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'
  });


  const handleChange = (prop) => (event) => {
    setUserData({ ...userData, [prop]: event.target.value });
  };


  const handleSave = () => {
    // Here you would typically call an API to save the changes
    console.log('Saved:', userData);
    setEditing(false);
    changefield({"$set":{"name":userData.name,"course":userData.course,"email":userData.email,"dataUserId":userData.id}})
    .then(res=>{
        if(res.status === "OK"){
            console.log("data updated succefully")
        }
        else{
            console.log("unknown error occured ..",res.message)
        }
    }).catch(rej=>console.log("sever error"))
  };

  return (
    <Box sx={{
      maxWidth: isMobile ? '100%' : 500,
      mx: 'auto',
      p: isMobile ? 1 : 2,
    }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            My Profile
          </Typography>
          {!editing ? (
            <Button
              startIcon={<EditIcon />}
              variant="outlined"
              onClick={() => setEditing(true)}
              size={isMobile ? 'small' : 'medium'}
            >
              Edit
            </Button>
          ) : (
            <Box>
              <Button
                variant="outlined"
                onClick={() => setEditing(false)}
                sx={{ mr: 1 }}
                size={isMobile ? 'small' : 'medium'}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                size={isMobile ? 'small' : 'medium'}
              >
                Save
              </Button>
            </Box>
          )}
        </Box>

        {/* Profile Picture */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={userData.profileImage}
            sx={{
              width: 50,
              height: 50,
              border: '2px solid',
              borderColor: 'primary.main'
            }}
          />
          {editing && (
            <Button
              startIcon={<CameraIcon />}
              variant="text"
              size="small"
              color="primary"
            >
              Change Photo
            </Button>
          )}
        </Box>

        {/* Form Fields */}
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="User ID"
            value={userData.id}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            variant={editing ? 'outlined' : 'filled'}
            size={isMobile ? 'small' : 'medium'}
          />

            <TextField
            label="Course"
            value={userData.course}
            fullWidth
            margin="normal"
            InputProps={{
            readOnly: true,
            }}
            variant={editing ? 'outlined' : 'filled'}
            size={isMobile ? 'small' : 'medium'}
        />
            <TextField
            label="Full Name"
            value={userData.name}
            onChange={handleChange('name')}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: !editing,
            }}
            variant={editing ? 'outlined' : 'filled'}
            size={isMobile ? 'small' : 'medium'}
          />

          <TextField
            label="Email"
            value={userData.email}
            onChange={handleChange('email')}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: !editing,
              type: 'email',
            }}
            variant={editing ? 'outlined' : 'filled'}
            size={isMobile ? 'small' : 'medium'}
          />

        </Box>

      </Paper>
    </Box>
  );
};

export  {UserProfileEdit};