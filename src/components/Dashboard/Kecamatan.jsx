import React, { useState, useEffect } from 'react';
import Tipe from "../../data/Kec.json";
import {
  CircularProgress,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Tipehak = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from tipehak.json
    setTimeout(() => {
      setData(Tipe.data); // Extracting data array from imported JSON
      setIsLoading(false);
    }, 200); // Simulating a 2-second delay for data fetching
  }, []);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};



  return (
    <div>
      {isLoading ? (
        <CircularProgress style={{ margin: '50px auto', display: 'block' }} />
      ) : (
        <ResponsiveContainer width="100%" height={440}>
          <BarChart data={data} style={{ margin: '0 auto', marginTop: '30px' }} barSize={20}>
            <XAxis dataKey="kecamatan" angle={-45} textAnchor="end" interval={0} />
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                padding: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }}
              formatter={(value) => numberWithCommas(value)}
            />
            <Legend verticalAlign="bottom" wrapperStyle={{ paddingBottom: "20px", paddingTop: "80px"}} />
            <Bar dataKey="jumlah" stackId="a" fill="#0288d1" name="Jumlah BT" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default Tipehak;
