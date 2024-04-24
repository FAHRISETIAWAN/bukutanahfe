import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartCard from "../components/shared/ChartCard";
import InfoCard from "../components/shared/InfoCard";

// import background from "../assets/images/background.png";
import PageTitle from "../components/shared/PageTitle";
import RoundIcon from "../components/shared/RoundIcon";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaRegChartBar } from "react-icons/fa";
import { FiPieChart } from "react-icons/fi";
import { MdPlayArrow } from "react-icons/md";
import { RiBook2Line } from "react-icons/ri";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";


import Kecamatan from "../components/Dashboard/Kecamatan";
import Status from "../components/Dashboard/Status";
import Tipepemilik from "../components/Dashboard/Tipepemilik";
import Produk from "../components/Dashboard/Produk";
import Tipehak from "../components/Dashboard/Tipehak";
import Linimasa from "../components/Dashboard/Linimasa";

const Dashboard = () => {

  const [selectedOption, setSelectedOption] = useState("TipeHak");
  const [peminjaman, setPeminjaman] = useState(0);
  const [kembali, setKembali] = useState(0);
  const [dipinjam, setDipinjam] = useState(0);
  const beUrl = process.env.REACT_APP_BE

  useEffect(() => {
    const fetchDataCard = async () => {
      try {
        const responsePinjam = await axios.get(`${beUrl}/api/v1/pgsql/jumlahPinjam`);
        const responseDipinjam = await axios.get(`${beUrl}/api/v1/pgsql/totalPinjam`);
        const responseKembali = await axios.get(`${beUrl}/api/v1/pgsql/totalKembali`);
        
        setPeminjaman(responsePinjam.data.data);
        setDipinjam(responseDipinjam.data.data);
        setKembali(responseKembali.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataCard();
  }, []);


  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const TotalBT = 458832;

  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case "TipeHak":
        return <Tipehak />;
      case "TipePemilik":
        return <Tipepemilik />;
      case "Produk":
        return <Produk />;
      default:
        return null;
    }
  };

  const renderSelectedTitle = () => {
    switch (selectedOption) {
      case "TipeHak":
        return "Buku Tanah Berdasarkan Tipe Hak";
      case "TipePemilik":
        return "Buku Tanah Berdasarkan Tipe Pemilik";
      case "Produk":
        return "Buku Tanah Berdasarkan Produk";
      default:
        return "";
    }
  };


  return (
    <div className="p-6">
      <PageTitle>Dashboard</PageTitle>
      <div className="grid gap-6 mb-2 grid-cols-1 xl:grid-cols-4">
        <InfoCard
          title="Total Buku Tanah"
          satuan=''
          value={TotalBT.toLocaleString('id-ID')}
        >
          <RoundIcon
            icon={IoNewspaperOutline} 
            iconColorClass="text-[#6993FF]"
            bgColorClass="bg-[#BDCFFF]"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard
          title="Total Peminjaman"
          satuan='Buku Tanah'
          value={peminjaman.length > 0 ? peminjaman[0].jumlahpinjam: ''}
        >
          <RoundIcon
            icon={FaRegChartBar}
            iconColorClass="text-[#6993FF]"
            bgColorClass="bg-[#BDCFFF]"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard
          title="Total Dipinjam"
          satuan='Buku Tanah'
          value={dipinjam.length > 0 ? dipinjam[0].totaldipinjam: ''}
        >
          <RoundIcon
            icon={RiBook2Line}
            iconColorClass="text-[#6993FF]"
            bgColorClass="bg-[#BDCFFF]"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard
          title="Total Dikembalikan"
          satuan='Buku Tanah'
          value={kembali.length > 0 ? kembali[0].totalkembali: ''}
        >
          <RoundIcon
            icon={FiPieChart}
            iconColorClass="text-[#6993FF]"
            bgColorClass="bg-[#BDCFFF]"
            className="mr-4"
          />
        </InfoCard>
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <ChartCard>
        <h6 className="text-left text-sm xl:text-lg font-medium">
            Jumlah BT di Tingkat Kecamatan
          </h6>
        <Kecamatan/>
        </ChartCard>
        <ChartCard>
        <h6 className="text-left text-sm xl:text-lg font-medium">
            Perbandingan BT Berdasarkan Status Bidang
          </h6>
      <Status/>
        </ChartCard>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-1">
        <ChartCard>
        <h6 className="text-left text-sm xl:text-lg font-medium">
            Linimasa Peminjaman Dalam 7 Hari
          </h6>
        <Linimasa/>
        </ChartCard>
      </div>

      <div className="grid gap-6 mt-5 mb-6 grid-cols-1 xl:grid-cols-2">
      <ChartCard className="flex items-center">
          <div className="relative mr-4">
            <RoundIcon
              icon={MdPlayArrow}
              iconColorClass="text-[#fff]"
              bgColorClass="bg-[#0288d1]"
            />
            <span className="absolute inset-0 flex items-center justify-center text-sm xl:text-lg font-medium text-white">Buku Tanah Berdasarkan Tipe</span>
          </div>
        </ChartCard>

        <ChartCard>
          <FormControl fullWidth>
          <InputLabel id="select-label">Pilih Tipe</InputLabel>
          <Select
            labelId="select-label"
            value={selectedOption}
            onChange={handleSelectChange}
            variant="outlined"
            label="Pilih Tipe"
          >
            <MenuItem value="TipeHak">Tipe Hak</MenuItem>
            <MenuItem value="TipePemilik">Tipe Pemilik</MenuItem>
            <MenuItem value="Produk">Produk</MenuItem>
          </Select>
        </FormControl>
        </ChartCard>  
      </div>
 

      <div className="grid gap-6 mt-5 mb-6 grid-cols-1 xl:grid-cols-1">
      <ChartCard>
          <h6 className="text-left text-sm xl:text-lg font-medium">
            {renderSelectedTitle()}
          </h6> 
          {renderSelectedComponent()}
        </ChartCard>  
      </div>
    </div>
  );
};

export default Dashboard;
