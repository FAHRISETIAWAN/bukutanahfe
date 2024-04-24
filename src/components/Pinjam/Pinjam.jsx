import React, { useState, useEffect } from 'react';
import { CircularProgress,Select, MenuItem, FormControl, InputLabel, TextField, Button, Table, TableHead, TableBody, TableRow, TableCell,TableContainer,Paper  } from "@mui/material";
import ChartCard from "../shared/ChartCard";
import PageTitle from "../shared/PageTitle";
import Pegawai from "../../data/pegawai.json";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pinjam = () => {
    const [namaPeminjam, setNamaPeminjam] = useState('');
    const [nomorHak, setNomorHak] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);
    const [pinjamClicked, setPinjamClicked] = useState(false); 
    const [tglPinjam, setTglPinjam] = useState(null)
    const [kembaliClicked, setKembaliClicked] = useState(false); 
    const [tglKembali, setTglKembali] = useState(null);
    const [history, setHistory] = useState(null);
    const [petugasList, setPetugasList] = useState([]); 
    const [namaPetugas, setNamaPetugas] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const beUrl = process.env.REACT_APP_BE

    const fetchDataPetugas = async () => {
        try {
            const responsePetugas = await axios.get(`${beUrl}/api/v1/pgsql/getPetugas`);
            setPetugasList(responsePetugas.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        setNamaPetugas(localStorage.getItem('namaPegawai'))
        fetchDataPetugas();
    }, []);


    const fetchData = async (nomorHak) => {
        try {
          
            const response = await axios.get(`${beUrl}/api/v1/pgsql/searchNomorhak?nomorhak=${nomorHak}`);
            setIsLoading(true);
            return response.data.data;   
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false)
            return null;
        }
    };

    const searchHistory = async (nomorHak) => {
        try {
          
            const response = await axios.get(`${beUrl}/api/v1/pgsql/searchSubmit?nomorhak=${nomorHak}&namapeminjam=${namaPeminjam}`);
            setIsLoading(true);
            return response.data.data; 
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false)
            return null;
        }
    };

    const handleSubmit = async () => {
        if (!namaPeminjam || !nomorHak) {
            toast.error('Harap lengkapi semua bidang');
            return;
        }
        setIsLoading(true); 
        const searchData = await fetchData(nomorHak);
        const search = await searchHistory(nomorHak);

        if (searchData) {
            setFetchedData(searchData);

            if(search) {
                setHistory(search)
            } else{
                setHistory([{
                    tglpinjam: null,
                    tglkembali: null
                }])
            }
        } else {
            console.log('Failed to fetch data from API');
        }
        
        setSubmitted(true);
        setIsLoading(false); 
    };

    
    const handlePinjam = async () => {

        if (!submitted) {
            toast.error('Mohon submit data terlebih dahulu');
            return;
        }
        const postData = {
            namapetugas: namaPetugas,
            namapeminjam: namaPeminjam,
            nomorhak: nomorHak     
        };

        try {
            const response = await axios.post(`${beUrl}/api/v1/pgsql/pinjam`, postData);
            setTglPinjam(response.data.data[0].tglpinjam)
            // console.log('POST request successful:', response);
            toast.success('BT Berhasil Dipinjam');
           
        } catch (error) {
            console.error('Error sending POST request:', error);
            toast.error('BT Dalam Proses Peminjaman');
           
        }
    };

    const handleKemabali = async () => {
        if (!submitted) {
            toast.error('Mohon submit data terlebih dahulu');
            return;
        }
        const putData = {
            namapetugas: namaPetugas,
            namapeminjam: namaPeminjam,
            nomorhak: nomorHak, 
            tglpinjam: history[0]?.tglpinjam    
        };
    
        try {
            const response = await axios.put(`${beUrl}/api/v1/pgsql/kembali`, putData);
            setTglKembali(response.data.data[0].tglkembali)
            // console.log('PUT request successful:', response);
            toast.success('BT Berhasil Dikembalikan');
        } catch (error) {
            console.error('Error sending PUT request:', error);
            toast.error('Nama Peminjam Tidak Sesuai');
        }
    };
    
 

    const handlePeminjamChange = (event) => {
        setNamaPeminjam(event.target.value);
        setSubmitted(false);
    };



    const handleNomorHakChange = (event) => {
        setNomorHak(event.target.value.toUpperCase());
        setSubmitted(false);
    };


    const pnsEmployees = Pegawai.data.filter((pegawai) => pegawai.STATUSPEGAWAI === 'PNS');

    return (
        <div className="grid gap-6 mt-5 mb-6 grid-cols-1 xl:grid-cols-1">
            <PageTitle>Peminjaman Buku Tanah</PageTitle>
            <ChartCard>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className="grid gap-6 mb-6 md:grid-cols-1">
                       
                       <form>
                           <TextField
                               variant="outlined"
                               fullWidth
                               value={localStorage.getItem('namaPegawai')}
                               disabled
                           />
                       </form>
                   </div>

                    <FormControl fullWidth>
                        <InputLabel id="select-label">Pilih Peminjam</InputLabel>
                        <Select
                            labelId="select-label"
                            value={namaPeminjam}
                            onChange={handlePeminjamChange}
                            variant="outlined"
                            label="Pilih Peminjam"
                            MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
                        >
                            <MenuItem value="">Pilih Peminjam</MenuItem>
                            {pnsEmployees.map((pegawai, index) => (
                                <MenuItem key={index} value={pegawai.NAMA}>{pegawai.NAMA}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
             
                    <div className="grid gap-6 mb-6 md:grid-cols-1">
                       
                        <form style={{ marginTop: '30px' }}>
                            <TextField
                                label="Nomor Hak"
                                variant="outlined"
                                fullWidth
                                value={nomorHak}
                                onChange={handleNomorHakChange}
                            />
                        </form>
                    </div>
        
                
                 <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                 <Button variant="contained" color="primary" style={{ marginTop: '30px' }} onClick={handleSubmit}>Submit</Button>
                </div>
                <ToastContainer position="top-right" />
            </ChartCard>
            
            <ChartCard>
            {!submitted && (
            <h6 className="text-center text-sm xl:text-lg font-medium">
                Silahkan Cari Buku Tanah Terlebih Dahulu
            </h6>
              )}
         {submitted && isLoading && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                    <CircularProgress />
                </div>
            )}
            {submitted && !isLoading && (
            <React.Fragment>
            <TableContainer component={Paper} style={{ marginTop: '20px'  }}>
                <Table>
                    <TableHead>
                        <TableRow>                       
                            <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Pemegang Hak</TableCell>
                            <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Nomor Hak</TableCell>
                            <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>NIB</TableCell>
                            <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Luas Tertulis</TableCell>
                            <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Status BT</TableCell>
                            <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Nama Desa</TableCell>
                            <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Kecamatan</TableCell>
                            <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Tanggal Pinjam</TableCell>
                            <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Tanggal Kembali</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {fetchedData && fetchedData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.pemeganghak}</TableCell>
                            <TableCell>{row.nomorhak}</TableCell>
                            <TableCell align='center'>{row.nib}</TableCell>
                            <TableCell align='center'>{row.luastertulis}</TableCell>
                            <TableCell align='center'>{row.statusbt}</TableCell>
                            <TableCell align='center'>{row.namadesa}</TableCell>
                            <TableCell align='center'>{row.kecamatan}</TableCell>
                            <TableCell align='center'>{tglPinjam !== null ? tglPinjam : (history[0]?.tglpinjam !== null ? new Date(history[0]?.tglpinjam).toLocaleDateString() : "-")}</TableCell>
                            <TableCell align='center'>{tglKembali !== null ? tglKembali : (history[0]?.tglkembali !== null ? new Date(history[0]?.tglkembali).toLocaleDateString() : "-")}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>

                  
                </Table>
                </TableContainer>
           
                 <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                 <Button variant="contained" color="primary" style={{ marginTop: '30px', marginLeft: '10px' }} onClick={() => { setPinjamClicked(true); handlePinjam(); }}>Pinjam</Button>
                 <Button variant="contained" color="primary" style={{ marginTop: '30px', marginLeft: '10px' }} onClick={() => { setKembaliClicked(true); handleKemabali(); }}>Kembali</Button>
                </div>
                </React.Fragment>
            )}
             
            </ChartCard>
            
        </div>
   
    );
}

export default Pinjam;
