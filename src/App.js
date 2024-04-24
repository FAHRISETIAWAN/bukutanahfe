import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Routes from "./routes/Routes";
import { Toaster } from "react-hot-toast";

const App = ({ handleLogout }) => {
  return (
    <div className="flex flex-row h-screen">
      <Sidebar/> 
      <div className="flex flex-col flex-1 w-full">
      <Header handleLogout={handleLogout}  />
        <main className="h-full overflow-y-auto bg-background">
          <div className="container grid mx-auto">
            <Routes />
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
