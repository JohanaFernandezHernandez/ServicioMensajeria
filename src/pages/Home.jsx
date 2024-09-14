import React from "react";
import { useParams } from "react-router-dom";
import {Navbar }from "../components/Navbar";

export const Home = () => {
  const { cfskey, cfstoken } = useParams();

  return (
  <div>
    <Navbar/>

  </div>
  );
};
