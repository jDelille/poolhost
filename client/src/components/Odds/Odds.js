import React, { useState, useEffect } from "react";
import NFL from "../Gamebar/Nfl";
import "./Odds.css";

function Odds() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/gamebar`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.sports[0].leagues[0].events);
      });
  }, [data]);

  return (
    <>
      <NFL />
      <div className="odds-container">
        {data?.map((item) => {
          return (
            <div className="odds-game-box">
              {/* home team */}
              <div className="ht-odds">
                <div className="team-odds">
                  {/* team logo */}
                  <div className="name-logo">
                    <img
                      className="team-logo-picks"
                      src={`../icons/${item.competitors[0].abbreviation}.svg`}
                      alt="logo"
                    />
                    {/* team name */}
                    <h1 className="odds-name">
                      {item.odds.homeTeamOdds?.team?.abbreviation}
                    </h1>
                  </div>
                  {/* favorite or underdog */}
                  <div className="fav-underdog">
                    {item.odds.homeTeamOdds.favorite ? (
                      <div className="badge">
                        <h3 className="favorite">FAV</h3>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {/* home team odds  */}
                <div className="odds">
                  <h1> {item.odds.home.moneyLine} </h1>
                  <h1> {item.odds.homeTeamOdds.spreadOdds} </h1>
                  <h1> O {item.odds.overUnder} </h1>
                </div>
              </div>
              {/* road team */}
              <div className="rt-odds">
                <div className="team-odds">
                  {/* team logo */}
                  <div className="name-logo">
                    <img
                      className="team-logo-picks"
                      src={`../icons/${item.competitors[1].abbreviation}.svg`}
                      alt="logo"
                    />
                    {/* team name  */}
                    <h1 className="odds-name">
                      {item.odds.awayTeamOdds?.team?.abbreviation}
                    </h1>
                  </div>
                  {/* favorite or underdog */}
                  <div className="fav-underdog">
                    {item.odds.awayTeamOdds.favorite ? (
                      <div className="badge">
                        <h3 className="favorite">FAV</h3>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {/* road team odds  */}
                <div className="odds">
                  <h1>{item.odds.away.moneyLine}</h1>
                  <h1> {item.odds.awayTeamOdds.spreadOdds} </h1>
                  <h1> U {item.odds.overUnder} </h1>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Odds;
