import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartCard from "../shared/ChartCard";
import PageTitle from "../shared/PageTitle";
import RoundIcon from "../shared/RoundIcon";
import InfoCard from "../shared/InfoCard";
import {
  TextField,Select, MenuItem, FormControl, InputLabel, CircularProgress,Table, TableBody, TableCell, TableContainer, TableRow, TableHead,Paper,Button
} from '@mui/material';
import { IoLogoBuffer } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Log = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sesuaiValue, setSesuaiValue] = useState(0);
    const [tidakSesuaiValue, setTidakSesuaiValue] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState('');
    const [pencarian, setPencarian] = useState('');
    const [inputType, setInputType] = useState(''); 
    const beUrl = process.env.REACT_APP_BE

    useEffect(() => {
      const fetchDataCard = async () => {
        try {
          const responseSesuai = await axios.get(`${beUrl}/api/v1/pgsql/durasiSesuai`);
          const responseTidakSesuai = await axios.get(`${beUrl}/api/v1/pgsql/durasiMelebihi`);
          
          setSesuaiValue(responseSesuai.data.data);
          setTidakSesuaiValue(responseTidakSesuai.data.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        }
      };
  
      fetchDataCard();
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          let apiUrl = `${beUrl}/api/v1/pgsql/history`;
          let params = {
            awal: (currentPage - 1) * 10,
            akhir: currentPage * 10
          };
    
          // Tambahkan kondisi untuk menentukan URL API berdasarkan status pencarian
          if (status === 'nama' && pencarian.trim() !== '') {
            apiUrl = `${beUrl}/api/v1/pgsql/searchHistoryByName`;
            params = { namapeminjam: pencarian };
          } else if (status === 'nomor' && pencarian.trim() !== '') {
            apiUrl = `${beUrl}/api/v1/pgsql/searchHistory`;
            params = { nomorhak: pencarian };
          }
    
          // Ubah URL API kembali ke utama jika pencarian kosong atau tidak diisi
          const response = await axios.get(apiUrl, { params });
    
          if (response.data.data.length === 0) {
            toast.error('Data tidak ditemukan');
          } else {
            setData(response.data.data);
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        }
      };
    
      fetchData();
    }, [currentPage, status, pencarian]);
    
    
  
    const handleNextPage = () => {
      setCurrentPage(prevPage => prevPage + 1);
    };
  
    const handlePrevPage = () => {
      setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleStatusChange = (event) => {
      setStatus(event.target.value);
      setInputType(event.target.value === 'nomor' ? 'number' : 'text');
  };

  const handlePencarianChange = (event) => {
    setPencarian(event.target.value);
};

  return (
    <div className="grid gap-6 mt-5 mb-6 grid-cols-1 xl:grid-cols-1">
    <PageTitle>History Peminjaman Buku Tanah</PageTitle>
    <div className="grid gap-6 mt-5 mb-6 grid-cols-1 xl:grid-cols-2">
    <InfoCard
          title="Sesuai Prosedur"
          satuan='Buku Tanah'
          value={sesuaiValue.length > 0 ? sesuaiValue[0].total: ''}
        >
        <RoundIcon
            icon={FaCheckCircle}
            iconColorClass="text-[#6993FF]"
            bgColorClass="bg-[#BDCFFF]"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard
          title="Melebihi Prosedur"
          satuan='Buku Tanah'
          value={tidakSesuaiValue.length > 0 ? tidakSesuaiValue[0].total: ''}
        >
          <RoundIcon
            icon={IoLogoBuffer}
            iconColorClass="text-[#6993FF]"
            bgColorClass="bg-[#BDCFFF]"
            className="mr-4"
          />
        </InfoCard>
    </div>
    <div className="grid gap-6 mt-1 mb-2 grid-cols-1 xl:grid-cols-1">
    <ChartCard>
    <div className="grid gap-6 mb-1 md:grid-cols-2">
        <FormControl fullWidth>
            <InputLabel id="select-label">Pilih Pencarian</InputLabel>
            <Select
                labelId="select-label"
                value={status}
                onChange={handleStatusChange}
                variant="outlined"
                label="Pilih Pencarian"
                MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
            >
            <MenuItem value="nama">Nama</MenuItem>
            <MenuItem value="nomor">Nomor Hak</MenuItem>
            </Select>
        </FormControl>
      <div className="grid gap-6 mb-1 md:grid-cols-1">            
          <form>
              <TextField
                  variant="outlined"
                  fullWidth
                  value={pencarian}
                  onChange={handlePencarianChange}
                  type={inputType} 
              />
          </form>
      </div>
    </div>
    <ToastContainer position="top-right" />
  </ChartCard>

    </div>
   
    <ChartCard>
   
       {isLoading ? ( 
        <CircularProgress style={{ margin: '50px auto', display: 'block' }} />
      ) : (
        <React.Fragment>
        <TableContainer component={Paper} style={{ marginTop: '10px'  }}>
        <Table>
          <TableHead>
              <TableRow>
              <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>No</TableCell>
              <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Nomor Hak</TableCell>
              <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Nama Petugas</TableCell>
              <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Nama Peminjam</TableCell>
              <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Tanggal Pinjam</TableCell>
              <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Tanggal Kembali</TableCell>
              <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Durasi (Hari)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                  {data.map((item, index) => {
                    const durasi = item.tglkembali ? item.durasi : Math.floor((new Date() - new Date(item.tglpinjam)) / (1000 * 60 * 60 * 24));
                    const backgroundColor = durasi <= 5 ? '#86e49d' : '#d893a3';
                    const textColor = durasi <= 5 ? '#006b21' : '#b30021';

                    return (
                      <TableRow key={index}>
                       <TableCell align="center">{(currentPage - 1) * 10 + index + 1}</TableCell>
                        <TableCell align="center">{item.nomorhak}</TableCell>
                        <TableCell align="center">{item.namapetugas}</TableCell>
                        <TableCell align="center">{item.namapeminjam}</TableCell>
                        <TableCell align="center">{new Date(item.tglpinjam).toLocaleDateString()}</TableCell>
                        <TableCell align="center">{item.tglkembali ? new Date(item.tglkembali).toLocaleDateString() : '-'}</TableCell>
                        <TableCell align="center" style={{ color: textColor, padding: '10px', width: '130px', height: '30px',  borderRadius: '30px' }}>
                          <span style={{  backgroundColor: backgroundColor, display: 'inline-block', width: '100%', borderRadius: '30px'}}>
                            {durasi}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>

          </Table>
      </TableContainer>
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <Button variant="contained" onClick={handlePrevPage} disabled={currentPage === 1}>Prev</Button>
              <span style={{ margin: '0 10px' }}>Page {currentPage}</span>
            <Button variant="contained" onClick={handleNextPage} disabled={data.length < 10}>Next</Button>
      </div>
 </React.Fragment>
)}
    </ChartCard>
    
</div>

  );
}
export default Log;