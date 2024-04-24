import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../pages/Auth";
import Dashboard from './../pages/Dashboard';
import Peminjaman from "../pages/Pinjam/Peminjaman";
import History from "../pages/Pinjam/History";
import Petugas from "../pages/Pegawai/Petugas";



const Routes = () => {
  return (
    <Switch>
      <Route exact path="/Auth" component={Auth} />
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/pinjam/peminjaman" component={Peminjaman} />
      <Route exact path="/pinjam/history" component={History} />
      <Route exact path="/pegawai/petugas" component={Petugas} />
    </Switch>
  );
};

export default Routes;
