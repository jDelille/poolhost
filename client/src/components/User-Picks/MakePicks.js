import React, { useEffect, useState } from "react";
import Loader from "../Loading/Loading";
import firebase from "firebase";
import { auth } from "../Firebase/firebase";
import { Link } from "react-router-dom";

import "./MakePicks.css";

export default function MakePicks({
  setPick,
  counter,
  setCounter,
  setGame,
  addPicks,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userPicks, setUserPicks] = useState("");
  const [showUserPicks, setShowUserPicks] = useState(false);

  useEffect(() => {
    fetch(`/gamebar`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.sports[0].leagues[0].events);
        setLoading(true);
      });
  }, []);

  const [gameLabels, setGameLabels] = useState([]);

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
  }

  // get current user picks
  function fetchPicks() {
    let db = firebase.firestore();
    let usersEmail = auth.currentUser.email;
    db.collection("users")
      .where("email", "==", usersEmail)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setUserPicks(doc.data());
        });
      });
  }

  const [testing, setTesting] = useState([]);

  function pickCollection() {
    let db = firebase.firestore();
    const userUID = auth.currentUser.uid;
    db.collection("users")
      .doc(userUID)
      .collection("picks")
      .doc("user_picks")
      .get()
      .then(function (value) {
        setTesting(value.data()["game"]);
      });
  }

  console.log(testing);

  useEffect(() => {
    fetchPicks();
    pickCollection();
  }, []);

  useEffect(() => {
    getAllGames();
  }, []);

  console.log(gameLabels);

  //remove Picks
  function removePicks() {
    const userUID = auth.currentUser.uid;
    let db = firebase.firestore();
    db.collection("users").doc(userUID).update({
      picks: firebase.firestore.FieldValue.delete(),
    });
    db.collection("users")
      .doc(userUID)
      .collection("picks")
      .doc("user_picks")
      .update({
        game: [],
      });
  }

  let games = gameLabels[0]?.week[counter];
  let filteredGames = [];

  filteredGames.push(games);

  console.log(filteredGames);

  console.log(counter);

  return counter < 16 ? (
    <div className="picks-container">
      {loading && counter < 16 && testing.length < 17 ? (
        filteredGames?.map((item) => {
          return (
            <>
              <div className="game-row">
                {/* <h1 className="matchup-name">{item?.name}</h1> */}
                <div className="matchup-content">
                  <p className="game-summary">{item.summary}</p>
                  <div className="ht-matchup">
                    <p className="display-name">{item?.homeDisplayName}</p>
                    <img
                      className="team-logo-picks game-pick"
                      src={`../icons/${item?.homeTeam}.svg`}
                      alt="logo"
                    />
                    {item.status === "post" ? (
                      <p className="show-score"> {item?.homeScore} </p>
                    ) : (
                      <button
                        className="select-btn"
                        onClick={() => {
                          setPick(item?.homeTeam);
                          setGame({
                            team: item?.homeTeam,
                            displayName: item?.homeDisplayName,
                            record: item?.homeRecord,
                            favorite: item?.homeTeamFavorite,
                            summary: item?.summary,
                          });
                          setCounter(counter + 1);
                        }}
                      >
                        {" "}
                        {item?.homeTeam}
                      </button>
                    )}

                    <p className="picks-record">{item?.homeRecord}</p>
                    <div className="odds">
                      <p> {item.homeTeam} Odds: </p>

                      {item.homeTeamFavorite ? (
                        <p>
                          {" "}
                          Favorite: <span className="odds-span">True</span>{" "}
                        </p>
                      ) : (
                        <p>
                          {" "}
                          Favorite: <span className="odds-span">
                            False
                          </span>{" "}
                        </p>
                      )}
                      <p>
                        {" "}
                        Spread :{" "}
                        <span className="odds-span">{item.homeSpread}</span>
                      </p>
                      <p>
                        {" "}
                        MoneyLine:
                        <span className="odds-span">
                          {item.homeMoneyLine}
                        </span>{" "}
                      </p>
                    </div>
                  </div>
                  <div className="matchup-spread">
                    <p> VS </p>
                  </div>
                  <div className="rt-matchup">
                    <p className="display-name">{item?.awayDisplayName}</p>

                    <img
                      className="team-logo-picks game-pick"
                      src={`../icons/${item?.awayTeam}.svg`}
                      alt="logo"
                    />
                    {item.status === "post" ? (
                      <p className="show-score"> {item?.awayScore} </p>
                    ) : (
                      <button
                        className="select-btn"
                        onClick={() => {
                          setPick(item?.awayTeam);
                          setGame({
                            team: item?.awayTeam,
                            displayName: item?.awayDisplayName,
                            record: item?.awayRecord,
                            favorite: item?.awayTeamFavorite,
                            summary: item?.summary,
                          });
                          setCounter(counter + 1);
                        }}
                      >
                        {" "}
                        {item?.awayTeam}
                      </button>
                    )}
                    <p className="picks-record">{item?.awayRecord}</p>
                    <div className="odds">
                      <p> {item.awayTeam} Odds: </p>

                      {item.awayTeamFavorite ? (
                        <p>
                          {" "}
                          Favorite: <span className="odds-span">True</span>{" "}
                        </p>
                      ) : (
                        <p>
                          {" "}
                          Favorite: <span className="odds-span">
                            False
                          </span>{" "}
                        </p>
                      )}
                      <p>
                        {" "}
                        Spread :{" "}
                        <span className="odds-span">{item.awaySpread}</span>
                      </p>
                      <p>
                        {" "}
                        MoneyLine:
                        <span className="odds-span">
                          {item.awayMoneyLine}
                        </span>{" "}
                      </p>
                    </div>
                  </div>
                </div>
                {item.status === "post" ? (
                  <button
                    onClick={() => {
                      setPick(counter);
                      setCounter(counter + 1);
                    }}
                    className={item.status === "post" ? "skip-btn" : "hide"}
                  >
                    You missed this game. Click to skip
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          );
        })
      ) : (
        <div className="picks-summary">
          <div className="picks-btn-container">
            <button
              onClick={() => {
                fetchPicks();
                setShowUserPicks(true);
              }}
              className="review-btn"
            >
              {" "}
              Click to review your picks{" "}
            </button>
          </div>
          <div className="review-box">
            <div className="rb-title"></div>
            <div className="rb-icons">
              {showUserPicks ? (
                testing.map((item, index) => {
                  if (index !== 0) {
                    return (
                      <div className="review-pick-box">
                        <div className="top">
                          <div className="team-summary">
                            <p className="picked-summary"> {item.summary}</p>
                            {item.favorite ? (
                              <p className="favorite"> favorite </p>
                            ) : (
                              <p className="underdog"> underdog </p>
                            )}
                          </div>
                        </div>
                        <div className="middle">
                          <div className="team-logo-name">
                            <img
                              className="team-logo-picks game-pick"
                              src={`../icons/${item.team}.svg`}
                              alt="logo"
                            />
                            <p className="name"> {item.displayName}</p>
                          </div>
                          <div className="team-record">
                            <p className="pick-record"> {item.record}</p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <p className="picks-confirm"> You're picks are locked in! </p>
              )}
            </div>
            <div className="other-options">
              <div className="reset-box">
                <p> Don't like your picks? </p>
                <Link to="/picks" onClick={removePicks} id="reset-btn">
                  {" "}
                  Reset Picks{" "}
                </Link>
              </div>
              <div className="save-box">
                <p> Satisfied with your picks? </p>
                <Link to="/expert-picks" className="link-picks" id="pool-btn">
                  View Pool
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="picks-summary">
      <div className="picks-btn-container">
        <button
          onClick={() => {
            fetchPicks();
            setShowUserPicks(true);
          }}
          className="review-btn"
        >
          {" "}
          Click to review your picks{" "}
        </button>
      </div>
      <div className="review-box">
        <div className="rb-title"></div>
        <div className="rb-icons">
          {showUserPicks ? (
            testing.map((item, index) => {
              if (index !== 0) {
                return (
                  <div className="review-pick-box">
                    <div className="top">
                      <div className="team-summary">
                        <p className="picked-summary"> {item.summary}</p>
                        {item.favorite ? (
                          <p className="favorite"> favorite </p>
                        ) : (
                          <p className="underdog"> underdog </p>
                        )}
                      </div>
                    </div>
                    <div className="middle">
                      <div className="team-logo-name">
                        <img
                          className="team-logo-picks game-pick"
                          src={`../icons/${item.team}.svg`}
                          alt="logo"
                        />
                        <p className="name"> {item.displayName}</p>
                      </div>
                      <div className="team-record">
                        <p className="pick-record"> {item.record}</p>
                      </div>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <p className="picks-confirm"> You're picks are locked in! </p>
          )}
        </div>
        <div className="other-options">
          <div className="reset-box">
            <p> Don't like your picks? </p>
            <Link to="/picks" onClick={removePicks} id="reset-btn">
              {" "}
              Reset Picks{" "}
            </Link>
          </div>
          <div className="save-box">
            <p> Satisfied with your picks? </p>
            <Link to="/expert-picks" className="link-picks" id="pool-btn">
              View Pool
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
