"use client";

import React from "react";
import Image from "next/image";
import DataTable from "./components/DataTable";

const Home: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <DataTable />
    </main>
  );
};

export default Home;
