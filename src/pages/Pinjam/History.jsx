import React from "react";
import { useEffect } from "react";
import Log from "../../components/Pinjam/Log";

const History = () => {
  useEffect(() => {
    document.title = "Simpan Pinjam - History";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="p-6">
      <Log/>
    </div>
  );
};

export default History;
