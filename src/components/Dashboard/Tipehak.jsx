import React, { useState, useEffect } from 'react';
import Tipe from "../../data/tipehak.json";
import {
  CircularProgress,Table, TableBody, TableCell, TableContainer, TableRow, TableHead,Paper
} from '@mui/material';


const Tipemilik = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      // Simulate fetching data from tipehak.json
      setTimeout(() => {
        setData(Tipe.data); // Extracting data array from imported JSON
        setIsLoading(false);
      }, 200); // Simulating a 2-second delay for data fetching
    }, []);
  
  
  return (
    <div>
       {isLoading ? ( // Tampilkan CircularProgress jika isLoading true
        <CircularProgress style={{ margin: '50px auto', display: 'block' }} />
      ) : (
        
        <TableContainer component={Paper} style={{ marginTop: '20px'  }}>
        <Table>
          <TableHead>
              <TableRow>
              <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>No</TableCell>
              <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Tipe Hak</TableCell>
              <TableCell align='center' style={{ backgroundColor: ' #0288d1', color: 'white' }}>Jumlah</TableCell>
               
                {/* Tambahkan lebih banyak TableCell sesuai kebutuhan */}
              </TableRow>
            </TableHead>
            <TableBody>
            {data.map((item, index) => (
                <TableRow key={index}>
                <TableCell align="center" >{index + 1}</TableCell>
                <TableCell  >{item.tipehak}</TableCell>
                <TableCell align="center" >{Math.round(item.jumlah).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</TableCell>
                </TableRow>
            ))}
          </TableBody>
          </Table>
      </TableContainer>
      
      )}
</div>

  );
}
export default Tipemilik;