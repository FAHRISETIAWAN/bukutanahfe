import React, { useState } from 'react';
import { styled } from '@mui/system';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import logo from '../assets/images/book.png';
import axios from 'axios';


const FormContainer = styled('div')({
  marginTop: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start', 
  justifyContent: 'center', 
  height: '80vh', 
  paddingLeft: '80px', 
});

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const beUrl = process.env.REACT_APP_BE

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      axios.get(`${beUrl}/api/v1/pgsql/login?email=${username}&nipbaru=${password}`)
      .then(({data}) =>{
        if(data?.data[0]?.status === 'aktif'){

          if(data?.data[0] && data?.data[0]?.role === 'admin'){
            localStorage.setItem("role", "admin")
            axios.get(`${beUrl}/api/v1/pgsql/searchPetugas?nipbaru=${data?.data[0]?.nipbaru}`).then((datas) => {
              localStorage.setItem('namaPegawai', datas?.data?.data[0]?.nama)
            })
            toast.success('Login berhasil!');
            history.push('/dashboard');
            handleLogin();
          } else{
            localStorage.setItem("role", "pegawai")
            axios.get(`${beUrl}/api/v1/pgsql/searchPetugas?nipbaru=${data?.data[0]?.nipbaru}`).then((datas) => {
              localStorage.setItem('namaPegawai', datas?.data?.data[0]?.nama)
            })
            toast.success('Login berhasil!');
            history.push('/dashboard');
            handleLogin();
          }
  
        } else if(data?.data[0] && data?.data[0]?.status !== 'aktif'){
          toast.error('Status akun tidak aktif.');
        } else{
          toast.error('Anda Belum Terdaftar Sebagai Petugas');
        }
      })
      .catch(() => {
        toast.error('Anda Belum Terdaftar Sebagai Petugas');
      })
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Terjadi kesalahan saat mencoba login. Silakan coba lagi.');
    }
  };
  

  const backgroundImageStyle = {
    backgroundImage: `url(${require('../assets/images/bgs.png')})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100vh',
  };

  return (
    <div style={backgroundImageStyle}>
      <FormContainer style={{ marginTop: 'auto', marginBottom: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '50px' }}>
          <img src={logo} alt="Logo" style={{ width: '45px', height: '45px', marginRight: '8px' }} />
          <div>
            <p style={{ fontSize: '16px' }} >
              Simpan Pinjam
            </p>
          </div>
        </div>
        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
          Login Aplikasi
        </Typography>
        <Typography variant="h7" color="text.secondary">
          Silahkan masuk untuk memulai aplikasi
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            autoComplete="username"
            sx={{ width: '70%', marginTop: '30px', }} 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            autoComplete="current-password"
            sx={{ width: '70%' }} 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
       <Button
          type="submit"
          fullWidth
          variant="contained"
          color="info"
          sx={{ height: '50px', width: '70%', marginTop: '80px' }}
        >
          Login
        </Button>

        </form>
        <ToastContainer position="top-right" />
      </FormContainer>
    </div>
  );
};

export default Login;
