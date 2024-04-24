import React from "react";
import { useEffect } from "react";
import Petugas from "../../components/Pegawai/Pegawai";
import { useHistory } from 'react-router-dom';

const Peminjaman = () => {
  const history = useHistory();

  useEffect(() => {
    if(localStorage.getItem("role") !== 'admin'){
      history.push("/dashboard")
    }
    document.title = "Simpan Pinjam - Petugas";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="p-6">
      <Petugas/>
    </div>
  );
};

export default Peminjaman;
