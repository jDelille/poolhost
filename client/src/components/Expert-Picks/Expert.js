import React, { useState, useEffect, useRef } from "react";
import "./Expert.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { auth } from "../Firebase/firebase";
import firebase from "firebase";
import Leaderboard from "./Leaderboard";

gsap.registerPlugin(ScrollTrigger);

export default function Expert() {
  const [data, setData] = useState();
  const [matches, setMatches] = useState([]);
  const [newData, setNewData] = useState([]);
  const [userPicks, setUserPicks] = useState([]);
  const [currentPicks, setCurrentPicks] = useState([]);
  const [signedInPicks, setSignedInPicks] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [week, setWeek] = useState([]);
  const [gameLabels, setGameLabels] = useState([]);

  useEffect(() => {
    fetch(`/expert`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.picks);
      });
  }, []);

  useEffect(() => {
    fetch(`/gamebar`)
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data.sports[0].leagues[0].events);
      });
  }, []);

  let array = [];

  console.log(schedule);

  useEffect(() => {
    schedule.forEach((v) => {
      array.push({
        summary: v.summary,

        homeTeam: v.competitors[0].abbreviation,
        homeDisplayName: v.competitors[0].displayName,
        homeRecord: v.competitors[0].record,
        homeScore: v.competitors[0].score,
        homeTeamFavorite: v.odds.homeTeamOdds.favorite,
        homeMoneyLine: v.odds.homeTeamOdds.moneyLine,
        homeSpread: v.odds.homeTeamOdds.spreadOdds,

        awayTeam: v.competitors[1].abbreviation,
        awayDisplayName: v.competitors[1].displayName,
        awayRecord: v.competitors[1].record,
        awayScore: v.competitors[1].score,
        awayTeamFavorite: v.odds.awayTeamOdds.favorite,
        awayMoneyLine: v.odds.awayTeamOdds.moneyLine,
        awaySpread: v.odds.awayTeamOdds.spreadOdds,

        status: v.status,
      });
      let newArr = [...new Set(array)];
      setWeek(newArr);
    });
  }, []);

  // let weekArr = []

  // useEffect(() => {
  //   weekArr.push([...week])

  //   console.log(weekArr)
  //   setGameLabels(...weekArr)

  // }, [])

  useEffect(() => {
    fetch(`/gamebar`)
      .then((res) => res.json())
      .then((data) => {
        setMatches(data.sports[0].leagues[0].events);
      });
  }, []);

  // get data from firestore collection onto page
  async function getStuff() {
    let db = firebase.firestore();
    const userUID = auth.currentUser.uid;
    let things = await db.collection("users").get();
    return things.docs.map((doc) => setNewData(doc.data()));
  }

  //get data from the user picks array in collection
  function fetchPicks() {
    let db = firebase.firestore();
    let usersEmail = auth.currentUser.email;
    const userUID = auth.currentUser.uid;
    db.collection("users")
      .where("email", "==", usersEmail)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setSignedInPicks(doc.data());
        });
      });
  }

  // get data from other users
  async function countPicks() {
    let db = firebase.firestore();
    const userUID = auth.currentUser.uid;
    let things = await db.collection("users").doc(userUID);
    setCurrentPicks(things);
  }

  const addPicks = () => {
    let db = firebase.firestore();
    db.collection("games").doc().set({
      week,
    });
  };

  // function getWeeklyGames() {
  //   let db = firebase.firestore()
  //   let things = db.collection('games').get()

  // }

  // get current user picks
  function getAllData() {
    let db = firebase.firestore();
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        let users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        setUserPicks(users);
      });
  }

  // get current games
  async function getAllGames() {
    let db = firebase.firestore();
    await db
      .collection("games")
      .get()
      .then(function (querySnapshot) {
        let matchups = [];
        querySnapshot.forEach((doc) => {
          matchups.push(doc.data());
        });
        setGameLabels(matchups);
      });

    // let games = []
    // games.push(gameLabels)
    // setGameLabels(games)
  }

  let finalArr = [];

  finalArr.push(gameLabels);

  // add useEffect to avoid infinite loop
  useEffect(() => {
    getStuff();
    fetchPicks();
    getAllData();
    countPicks();
    getAllGames();
  }, []);

  const label = useRef();

  return (
    <>
      <div className="expert-page">
        <Leaderboard />
        <div className="pick-chart">
          <div className="show-picks">
            <div className="expert-labels-container" ref={label}>
              <div className="labels">
                <div className="ex-labels">
                  <h1> User </h1>
                </div>
              </div>
              <div className="expert-labels-games">
                {/* map through the matches data to get logos */}
                {gameLabels[0]?.week?.map((item) => {
                  return (
                    <>
                      <div className="display-games-week">
                        <h4
                          className={
                            item?.homeScore > item?.awayScore
                              ? "winner"
                              : item?.homeScore < item?.awayScore
                              ? "loser"
                              : "home-label"
                          }
                        >
                          {" "}
                          {item?.homeTeam}{" "}
                        </h4>
                        <p className="at-symbol"> @ </p>
                        <h4
                          className={
                            item?.awayScore > item?.homeScore
                              ? "winner"
                              : item?.awayScore < item?.homeScore
                              ? "loser"
                              : "away-label"
                          }
                        >
                          {" "}
                          {item?.awayTeam}{" "}
                        </h4>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            {/* CURRENT USER picks populated with picks from data */}
            <div className="expert-picks-container">
              <div className="user-bar">
                <div className="expert-info">
                  <div className="expert-name">
                    <h1 className="affiliation"> Your Picks </h1>
                  </div>
                </div>
                <div className="expert-picked-teams">
                  <div className="no-picks-list">
                    <h6 className="no-team-logo-picks"> - </h6>
                    <h6 className="no-team-logo-picks"> - </h6>
                    <h6 className="no-team-logo-picks"> - </h6>
                    <h6 className="no-team-logo-picks"> - </h6>
                    <h6 className="no-team-logo-picks"> - </h6>
                    <h6 className="no-team-logo-picks"> - </h6>
                    <h6 className="no-team-logo-picks"> - </h6>
                    <h6 className="no-team-logo-picks"> - </h6>
                    <h6 className="no-team-logo-picks"> - </h6>
                    <h6 className="no-team-logo-picks"> - </h6>
                    <h6 className="no-team-logo-picks"> - </h6>
                    <h6 className="no-team-logo-picks"> - </h6>
                    <h6 className="no-team-logo-picks"> - </h6>
                    <h6 className="no-team-logo-picks"> - </h6>
                    <h6 className="no-team-logo-picks"> - </h6>
                    <h6 className="no-team-logo-picks"> - </h6>
                  </div>
                  {signedInPicks?.picks?.map((item, index) => {
                    if (index !== 0) {
                      return (
                        <div
                          className={
                            item === "missed" ? "hide" : "show-user-pick"
                          }
                        >
                          <img
                            className={"team-logo-picks"}
                            src={`../icons/${item}.svg`}
                            alt="logo"
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              {/* SHOW ALL USER PICKS */}
              {userPicks.map((item) => {
                return (
                  <>
                    <div className="expert-bar">
                      <div className="expert-info">
                        <div className="expert-name">
                          {item.displayName ? (
                            <h1 className="affiliation"> {item.displayName}</h1>
                          ) : (
                            <h1 className="affiliation email-display">
                              {item.email}
                            </h1>
                          )}
                        </div>
                      </div>
                      <div className="expert-picked-teams">
                        <div className="no-picks-list">
                          <h6 className="no-team-logo-picks"> - </h6>
                          <h6 className="no-team-logo-picks"> - </h6>
                          <h6 className="no-team-logo-picks"> - </h6>
                          <h6 className="no-team-logo-picks"> - </h6>
                          <h6 className="no-team-logo-picks"> - </h6>
                          <h6 className="no-team-logo-picks"> - </h6>
                          <h6 className="no-team-logo-picks"> - </h6>
                          <h6 className="no-team-logo-picks"> - </h6>
                          <h6 className="no-team-logo-picks"> - </h6>
                          <h6 className="no-team-logo-picks"> - </h6>
                          <h6 className="no-team-logo-picks"> - </h6>
                          <h6 className="no-team-logo-picks"> - </h6>
                          <h6 className="no-team-logo-picks"> - </h6>
                          <h6 className="no-team-logo-picks"> - </h6>
                          <h6 className="no-team-logo-picks"> - </h6>
                          <h6 className="no-team-logo-picks"> - </h6>
                        </div>

                        {item.picks?.map((item, index) => {
                          if (index !== 0) {
                            return (
                              <div
                                className={
                                  item === item?.isInteger
                                    ? "hide"
                                    : "show-user-pick"
                                }
                              >
                                <img
                                  className="team-logo-picks"
                                  src={`../icons/${item}.svg`}
                                  alt="logo"
                                />
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
