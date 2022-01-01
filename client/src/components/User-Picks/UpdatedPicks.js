import React, { useEffect, useState } from "react";
import Loader from "../Loading";
import firebase from "firebase";
import { auth } from "../Firebase/firebase";
import { Link } from "react-router-dom";
import "./UpdatedPicks.css";
import UserPicks from "./UserPicks";

function UpdatedPicks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState("");
 

  useEffect(() => {
    fetch(`/gamebar`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.sports[0].leagues[0].events);
        setLoading(true);
      });
  }, []);

  console.log(data);
  console.log(team)

  return (
    <div className="pick-sheet">
      {data.map((item, index) => {
        return (
          <div className="pick-sheet-bar" id={index}>
            <p onClick={() => setTeam(item.competitors[0].displayName[index])}> {item.competitors[0].displayName}</p>
            <p> {item.competitors[1].displayName}</p>
          </div>
        );
      })}
    </div>
  );
}

export default UpdatedPicks;
