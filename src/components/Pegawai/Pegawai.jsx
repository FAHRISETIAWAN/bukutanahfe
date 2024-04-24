import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Button, Table, TableHead, TableBody, TableRow, TableCell,TableContainer,Paper,CircularProgress   } from "@mui/material";
import ChartCard from "../shared/ChartCard";
import InfoCard from "../shared/InfoCard";
import PageTitle from "../shared/PageTitle";
import RoundIcon from "../shared/RoundIcon";
import Petugas from "../../data/pegawai.json";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const Pegawai = () => {
    const [namaPeminjam, setNamaPeminjam] = useState('');
    const [tableData, setTableData] = useState([]); 
    const [status, setStatus] = useState('');
    const [value, setValue] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const beUrl = process.env.REACT_APP_BE


    const fetchDataCard = async (namaPeminjam) => {
        try {
            const responseValue = await axios.get(`${beUrl}/api/v1/pgsql/searchPetugas?nipbaru=${namaPeminjam}`);
            setValue(responseValue.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchTableData(); 
    }, []);
    

    const fetchTableData = async () => {
        try {        
            const cardResponse = await axios.get(`${beUrl}/api/v1/pgsql/getPetugas2`);
            
            // Filter data status is not null
            const filteredData = cardResponse.data.data.filter(item => item.status !== null);
            setTableData(filteredData); 
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDataCard();
    }, []);
      
    const handleSubmit = async () => {
        try {
            await fetchDataCard(namaPeminjam);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleUpdate = async () => {
        try {

            if (!status) {
                toast.error('Status Petugas Harus Dipilih');
                return; 
            }
            // Kirim data ke endpoint untuk update dengan metode PUT
            await axios.put(`${beUrl}/api/v1/pgsql/updatePetugas`, { nipbaru: namaPeminjam, status: status });
            // Tampilkan pesan sukses
        
            if (status === "aktif") {
                toast.success('Petugas Berhasil Di Aktifkan');
            } else if (status === "non aktif") {
                toast.success('Petugas Berhasil Di Non Aktifkan');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            // Tampilkan pesan error
            toast.error('Update Petugas Gagal');
        }
    };


    const handlePeminjamChange = (event) => {
        setNamaPeminjam(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const pnsEmployees = Petugas.data.filter((Petugas) => Petugas.STATUSPEGAWAI === 'PNS');

    return (
        <div className="grid gap-6 mt-5 mb-6 grid-cols-1 xl:grid-cols-1">
        <PageTitle>Manajemen Petugas</PageTitle>
        <div className="grid gap-6  mb-6 grid-cols-1 xl:grid-cols-2">
             <div className="grid gap-6 mt-4  mb-6 md:grid-cols-1">
        <InfoCard
            title="Nama"
            satuan=''
            value={value && value.length > 0 ? String(value[0].nama) : ''}
        >
            <RoundIcon
                icon={FaUser} 
                iconColorClass="text-[#6993FF]"
                bgColorClass="bg-[#BDCFFF]"
                className="mr-4"
            />
        </InfoCard>
        <InfoCard
            title="NIP"
            satuan=''
            value={value && value.length > 0 ? String(value[0].nipbaru) : ''}
        >
            <RoundIcon
                icon={FaAddressCard} 
                iconColorClass="text-[#6993FF]"
                bgColorClass="bg-[#BDCFFF]"
                className="mr-4"
            />
        </InfoCard>
        <InfoCard
          title="Jabatan"
          satuan=''
          value={value && value.length > 0 ? String(value[0].namajabatan) : ''}
        >
          <RoundIcon
            icon={FaStar}
            iconColorClass="text-[#6993FF]"
            bgColorClass="bg-[#BDCFFF]"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard
          title="Status Pegawai"
          satuan=''
          value={value && value.length > 0 ? String(value[0].statuspegawai) : ''}
        >
          <RoundIcon
            icon={FaCheckCircle}
            iconColorClass="text-[#6993FF]"
            bgColorClass="bg-[#BDCFFF]"
            className="mr-4"
          />
        </InfoCard>
        </div>
            <ChartCard>
                <div className="grid gap-6 mb-6 md:grid-cols-1">
      
                    <FormControl fullWidth>
                        <InputLabel id="select-label">Pilih Petugas</InputLabel>
                        <Select
                            labelId="select-label"
                            value={namaPeminjam}
                            onChange={handlePeminjamChange}
                            variant="outlined"
                            label="Pilih Peminjam"
                            MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
                        >
                            <MenuItem value="">Pilih Peminjam</MenuItem>
                            {pnsEmployees.map((Petugas, index) => (
                                <MenuItem key={index} value={Petugas.NIPBARU}>{Petugas.NAMA}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div> 

                <div className="grid gap-6 mb-6 md:grid-cols-1">

                <FormControl fullWidth>
                        <InputLabel id="select-label">Status Petugas</InputLabel>
                        <Select
                            labelId="select-label"
                            value={status}
                            onChange={handleStatusChange}
                            variant="outlined"
                            label="Status Petugas"
                            MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
                        >
                            <MenuItem value="aktif">Aktif</MenuItem>
                            <MenuItem value="non aktif">Non Aktif</MenuItem>
                  
                        </Select>
                </FormControl>

                </div>
                 <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                 <Button variant="contained" color="primary" style={{ marginTop: '30px',marginLeft: '10px' }}  onClick={handleUpdate}>Update</Button>
                 <Button variant="contained" color="primary" style={{ marginTop: '30px',marginLeft: '10px' }} onClick={handleSubmit} >Submit</Button>
                 
                </div>
                <ToastContainer position="top-right" />
            </ChartCard>
            
        </div>
        <PageTitle>Daftar Petugas</PageTitle>
            <div className="grid gap-6  mb-6 grid-cols-1 xl:grid-cols-1">
            <ChartCard>
            {isLoading ? ( // Tampilkan CircularProgress jika isLoading true
                <CircularProgress style={{ margin: '50px auto', display: 'block' }} />
            ) : (
            <TableContainer component={Paper} style={{ marginTop: '10px'  }}>
                <Table>
                    <TableHead>
                        <TableRow>                       
                            <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>No</TableCell>
                            <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Nama Petugas</TableCell>
                            <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Status</TableCell>
                            <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Tanggal Aktif</TableCell>
                            <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Tanggal Non Aktif</TableCell>
                         
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((item, index) => (
                            <TableRow key={item.nipbaru}>
                            <TableCell align='center' >{index + 1}</TableCell>
                            <TableCell align='center' >{item.nama}</TableCell>
                            <TableCell align='center' >{item.status}</TableCell>
                            <TableCell align='center'>{item.tanggalaktif ? new Date(item.tanggalaktif).toLocaleDateString() : '-'}</TableCell>
                            <TableCell align='center'>{item.tanggalnonaktif ? new Date(item.tanggalnonaktif).toLocaleDateString() : '-'}</TableCell>
                    </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
                 )}
                 </ChartCard>
             </div>
        </div>
   
    );
}

export default Pegawai;
