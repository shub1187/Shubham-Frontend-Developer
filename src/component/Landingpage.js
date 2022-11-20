import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Landingpage.css";
import { FaRocket } from "react-icons/fa";
import { ImRocket } from "react-icons/im";
import { BiRocket } from "react-icons/bi";
import { TbEngine } from "react-icons/tb";
import { AiOutlineLink } from "react-icons/ai";
function Landingpage() {
  const [data, setData] = useState([]);
  const [allRockets, setallRockets] = useState([]);
  const [show, setShow] = useState({});
  const [filteredRocket, setfilteredRocket] = useState([]);
  const getData = async () => {
    let response = await axios.get("https://api.spacexdata.com/v3/rockets");
    setData(response.data);
  };
  const rollData = async () => {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      arr.push(data[i].rocket_name);
    }
    setallRockets(arr);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    rollData();
  }, [data]);
  const handleRocket = (value) => {
    console.log(value);
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].rocket_name == value) {
        console.log("entered");
        arr.push(data[i]);
        break;
      }
    }
    setShow(arr[0]);
    console.log(show.flickr_images[0]);
  };
  const handleSelect = () => {
    let selected = document.getElementById("select").value;
    console.log(selected);
    let find;
    if (selected == "Active") {
      find = true;
    } else if (selected == "Inactive") {
      find = false;
    }
    let array1 = [];
    setfilteredRocket(array1);
    for (let i = 0; i < data.length; i++) {
      if (find == data[i].active) {
        array1.push(data[i]);
      }
    }
    console.log(array1);
    setallRockets(array1);
  };
  return (
    <Fragment>
      <div id="Outer">
        <div id="Navbar">
          <h1>
            <FaRocket /> SpaceX
          </h1>
          <div id="rockets">
            {allRockets.map((value) => {
              return (
                <div
                  id="#rocketnames"
                  onClick={() => {
                    handleRocket(value);
                  }}
                >
                  {value}
                </div>
              );
            })}
          </div>
        </div>
        <div id="main-body">
          <div id="left">
            <div id="img1">
              {show != undefined && (
                <img src={show.flickr_images[0]} alt="spaceship" />
              )}
            </div>
            <div id="img2">
              {show != undefined && (
                <img src={show.flickr_images[1]} alt="spaceship" />
              )}
            </div>
          </div>
          <div id="right">
            <div id="header">
              {show != undefined && (
                <div>
                  <h1>
                    <ImRocket /> {show.rocket_name}
                  </h1>
                  <p>{show.description}</p>
                </div>
              )}
            </div>
            <div id="info">
              <div id="basic">
                <h1 className="headings">
                  <BiRocket /> Rocket Info.
                </h1>
                {show != undefined && (
                  <div className="cards">
                    <p className="row">
                      <strong>Cost per Launch :</strong>
                      {show.cost_per_launch}
                    </p>
                    <p className="row">
                      <strong>Success Rate :</strong>
                      {show.success_rate_pct}
                    </p>
                    <p className="row">
                      <strong>First Flight :</strong>
                      {show.first_flight}
                    </p>
                    <p className="row">
                      <strong>Country :</strong>
                      {show.country}
                    </p>
                  </div>
                )}
              </div>
              <div id="engine">
                <h1 className="headings">
                  <TbEngine /> Engine Info.
                </h1>
                {show != undefined && (
                  <div className="cards">
                    <p className="row">
                      <strong>Company : </strong>
                      {show.company}
                    </p>
                    <p className="row">
                      <strong>Engine Stages: </strong>
                      {show.stages}
                    </p>
                    <p className="row">
                      <strong>Boosters : </strong>
                      {show.boosters}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div id="footer">
              <p>To know more checkout the the Link below</p>
              {show != undefined && (
                <p>
                  <strong>
                    <AiOutlineLink />
                    {show.wikipedia}
                  </strong>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Landingpage;
