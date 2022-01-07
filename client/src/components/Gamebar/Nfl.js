import React, { useState, useEffect } from "react";
import "./NFL.css";
import { lightTheme, darkTheme, GlobalStyles } from "../Themes.js";
import styled, { ThemeProvider } from "styled-components";

export default function NFL() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/gamebar`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.sports[0].leagues[0].events);
      });
  }, []);

  let x = { data: data };
  let y = JSON.parse(JSON.stringify(x));

  const [theme, setTheme] = useState("light");
  const StyledApp = styled.div``;

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp className="gamebar">
        {y?.data?.map((item) => {
          return (
            <div className="game-box">
              <div className="ht">
                <div className="ht-logo">
                  <img
                    className="team-logo"
                    src={`../icons/${item.competitors[0].abbreviation}.svg`}
                    alt="logo"
                  />
                </div>
                <div className="team-initials">
                  <h1>{item.competitors[0].abbreviation}</h1>
                </div>
                <div className="fav-underdog">
                  {item.odds.homeTeamOdds?.favorite ? (
                    <div className="badge">
                      <h3 className="favorite">FAV</h3>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="record">
                  {item.fullStatus.type.description === "Scheduled" ? (
                    <h1>{item.competitors[0].record}</h1>
                  ) : (
                    <h1>{item.competitors[0].score}</h1>
                  )}
                </div>
              </div>

              <div className="rt">
                <div className="rt-logo">
                  <img
                    className="team-logo"
                    src={`../icons/${item.competitors[1].abbreviation}.svg`}
                    alt="logo"
                  />
                </div>
                <div className="team-initials">
                  <h1>{item.competitors[1].abbreviation}</h1>
                </div>
                <div className="fav-underdog">
                  {item.odds.awayTeamOdds?.favorite ? (
                    <div className="badge">
                      <h3 className="favorite">FAV</h3>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="record">
                  {item.fullStatus.type.description === "Scheduled" ? (
                    <h1>{item.competitors[1].record}</h1>
                  ) : (
                    <h1>{item.competitors[1].score}</h1>
                  )}
                </div>
              </div>
              <div className="time">
                <p className="game-time">{item.fullStatus.type.shortDetail}</p>
              </div>
            </div>
          );
        })}
      </StyledApp>
    </ThemeProvider>
  );
}
