import React, { Component } from "react";
import { useSelector } from "react-redux";

function ArtistRoute() {
  const accessToken = useSelector((state) => state.auth.token);

  return accessToken;
}

export default ArtistRoute;
