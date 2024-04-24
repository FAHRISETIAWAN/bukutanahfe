import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import ChartCard from "../shared/ChartCard";
import moment from 'moment'; 
import {
    CircularProgress
  } from '@mui/material';

const Lapri = () => {
    const [cardData, setCardData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const beUrl = process.env.REACT_APP_BE
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${beUrl}/api/v1/pgsql/getLinimasa`);
                const sortedData = response.data.data.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
                setCardData(sortedData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        return () => {
        };
    }, []); 

    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY'); 
    };

    const formatTooltipLabel = (value) => {
        return formatDate(value); // Format date in tooltip
    };

    // const formatYAxisTick = (value) => {
    //     return Math.round(value); 
    // };

    return (
<div className="grid gap-6 mt-5 mb-6 grid-cols-1 xl:grid-cols-1">
    {isLoading ? ( 
            <CircularProgress style={{ margin: '50px auto', display: 'block' }} />
        ) : (
  <ChartCard>
      <ResponsiveContainer width="100%" height={600} > 
                <LineChart data={cardData}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="tanggal"  tickFormatter={formatDate} />
                <YAxis  />
                <Tooltip 
                        contentStyle={{
                        borderRadius: '8px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', 
                        padding: '8px', 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)'
                    }}
                    labelFormatter={formatTooltipLabel} 
                    />
                <Legend />
                <Line type="monotone" dataKey="jumlah" name="Jumlah" stroke="#0288d1" />
                 </LineChart>
         </ResponsiveContainer>  
     </ChartCard>
          )}
   </div>

    );
}

export default Lapri;
