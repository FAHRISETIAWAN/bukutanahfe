import React, { useState, useEffect } from 'react';
import Tipe from "../../data/status.json";
import {
  CircularProgress,
} from '@mui/material';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const Status = () => {
    const [cartdata, setCartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data from tipehak.json
        setTimeout(() => {
            setCartData(Tipe.data); // Extracting data array from imported JSON
            setIsLoading(false);
        }, 200); // Simulating a 2-second delay for data fetching
    }, []);

    // Function to determine fill color based on status
    const getStatusColor = (status) => {
        return status === 'Terpetakan' ? '#00dffc' : '#0288d1';
    };

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <div>
            {isLoading ? ( // Tampilkan CircularProgress jika isLoading true
                <CircularProgress style={{ margin: '50px auto', display: 'block' }} />
            ) : (
                <ResponsiveContainer width="100%" height={470}>
                    <PieChart width={650} >
                        <Pie
                            data={cartdata}
                            dataKey="jumlah"
                            nameKey="statusbidang"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            label={(entry) => numberWithCommas(entry.value)}
                        >
                            {cartdata.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getStatusColor(entry.statusbidang)} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                borderRadius: '8px',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                                padding: '8px',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)'
                            }}
                            formatter={(value) => numberWithCommas(value)}
                             />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export default Status;
