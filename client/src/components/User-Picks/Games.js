import React, {useEffect, useState} from 'react'
import Loader from '../Loading'
import './UserPicks.css'


export default function Games({setPick, counter, setCounter, addPicks}) {
 const [data, setData] = useState([])
 const [loading, setLoading] = useState(false)
 const [team, setTeam] = useState('')

 useEffect(() => {
  fetch(`/gamebar`)
    .then((res) => res.json())
    .then((data) => {
        setData(data.sports[0].leagues[0].events)
        setLoading(true)
    })
}, [])

let games = data[counter]

let filteredGames = []

filteredGames.push(games)

 return (
  <div className="picks-container">
      <div className='left-col'>
      {loading ? 
        filteredGames?.map(item => {
            return (
              <>
            
					  <div className="game-row">
              <div className='top-bar'>
              {/* home team pick */}
              <div className="ht-picks">
              {/* set team colors */}
              <div className="colors"> 
               <div className="color home-color" style={{backgroundColor: `#${item?.competitors[0].alternateColor}`}}></div>
               <div className="color2 home-color2" style={{backgroundColor: `#${item?.competitors[0].color}`}}></div>
              </div>
              {/* team name & logo */}
                <div className="ht-logo pick-logo">
                  <h1 className="hometeam">{item?.competitors[0].abbreviation}</h1>
                  <img className="team-logo-picks game-pick" src={`../icons/${item?.competitors[0].abbreviation}.svg`} alt='logo'/>
                </div>
              </div>
              {/* <div className="space">
                <h6>{item?.odds.details}</h6>
                <h6>{item?.location}</h6>
                <h6>{item?.fullStatus.type.detail}</h6>
              </div> */}
              {/* away team pick */}
              <div className="rt-picks">
              {/* set team colors */}
              <div className="colors-away">
               <div className="away-color " style={{backgroundColor: `#${item?.competitors[1].alternateColor}`}}></div>
               <div className="away-color2 " style={{backgroundColor: `#${item?.competitors[1].color}`}}></div>
              </div>
              {/* team name & logo */}
                <div className="rt-logo pick-logo pick-logo-rt">
                  <img className="team-logo-picks game-pick" src={`../icons/${item?.competitors[1].abbreviation}.svg`} alt='logo'/>
                  <h1 className='awayteam'>{item?.competitors[1].abbreviation}</h1>
                </div> 
                
              </div>
              
            </div>
            </div>
            {/* <div className="bottom">
            <div className="home-news"> */}
             {/* select team btn */}
              {/* <div className="select-team">
                <button
                    className="select-btn"
                    onClick={() => {setPick(item.competitors[0].abbreviation); setCounter(counter+1)}}
                > {item?.competitors[0].displayName}</button>
              </div>
              <div className="jack">
                <div className="vegas-odds">
                  <h1 className="moneyline"> Moneyline: {item?.odds.away.moneyLine}</h1>
                  <h1 className="spread">Spread: {item?.odds.awayTeamOdds.spreadOdds}</h1>
                  <h1 className="over-odds">Over/Under: {item?.odds.overOdds}</h1>
                </div>
              </div>
              </div>
              <div className="away-news"> */}
              {/* select team btn */}
              {/* <div className="select-team">
                <button
                    className="select-btn away-btn"
                    onClick={() => {setPick(item.competitors[1].abbreviation); setCounter(counter+1); addPicks()}}
                > {item?.competitors[1].displayName}</button>
              </div>
              <div className="jack">
              <div className="away-odds">
                  <h1 className="moneyline"> Moneyline: {item?.odds.home.moneyLine}</h1>
                  <h1 className="spread">Spread: {item?.odds.homeTeamOdds.spreadOdds}</h1>
                  <h1 className="over-odds">Over/Under: {item?.odds.overOdds}</h1>
                </div>
                
              </div>
              </div>
            </div>
            </div> */}
        
            </>
				    )
            
          })
          :
          <Loader />
      }
         
      </div>
      
     </div>
 )
}
