import React from "react";
import { useEffect } from "react";
import Pinjam from "../../components/Pinjam/Pinjam";

const Peminjaman = () => {
  useEffect(() => {
    document.title = "Simpan Pinjam - Peminjaman";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="p-6">
      <Pinjam/>
    </div>
  );
};

export default Peminjaman;
