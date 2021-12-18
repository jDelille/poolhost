import React, {useEffect, useState} from 'react'
import Loader from '../Loading'
import { Carousel } from 'react-responsive-carousel';

import './MakePicks.css'


export default function MakePicks({setPick, counter, setCounter, addPicks, endOfPicks, setEndOfPicks}) {
 const [data, setData] = useState([])
 const [loading, setLoading] = useState(false)
 const [team, setTeam] = useState('')
 const [selected, setSelected] = useState(false)

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

console.log(endOfPicks)

filteredGames.push(games)

console.log(filteredGames.name)





 return (
  <div className="picks-container">
      {loading && counter < 16?
        filteredGames?.map(item => {
            return (
              <>
            
		<div className="game-row">
            <h1 className="matchup-name">{item?.name}</h1>
            <div className="matchup-content">
                <div className="ht-matchup">
                    <img className="team-logo-picks game-pick" src={`../icons/${item?.competitors[0].abbreviation}.svg`} alt='logo'/>
                    <button
                        className="select-btn"
                        onClick={() => {setPick(item?.competitors[0].abbreviation); setCounter(counter+1)}}
                    > {item?.competitors[0].displayName}</button>
                </div>
                <div className='matchup-spread'>
                    {item?.odds.spread}
                </div>
                <div className="rt-matchup">
                    <img className="team-logo-picks game-pick" src={`../icons/${item?.competitors[1].abbreviation}.svg`} alt='logo'/>
                    <button
                        className="select-btn"
                        onClick={() => {setPick(item?.competitors[1].abbreviation); setCounter(counter+1)}}
                    > {item?.competitors[1].displayName}</button>
                </div>
                </div>
                
            </div>
       
      
       


       <div className='betting-odds'>
      
          <div className="vegas-odds">
            <div className="home-odds">
               <p className="ht-fav"> {item?.odds.homeTeamOdds.team.abbreviation} 
               <div className="fav-underdog-picks">
                        {item?.odds.homeTeamOdds?.favorite ? (
                            <div className="favorite-badge">
                                <h3 className='favorite'>FAV</h3>
                            </div>
                        ): (
                           <div className="underdog-badge">
                                <h3 className='underdog'>DOG</h3>
                            </div>
                        )}
                    </div>
                    </p>
               <p> Moneyline <br /> {item?.odds.homeTeamOdds.moneyLine} </p> 
               <p> Spread <br /> {item?.odds.homeTeamOdds.spreadOdds} </p>
               <p> Over/Under <br /> {item?.odds.overOdds}</p>
            </div>
            <div className="away-odds">
               <p className="rt-fav"> {item?.odds.awayTeamOdds.team.abbreviation} <br />
               <div className="fav-underdog-picks">
                        {item?.odds.awayTeamOdds?.favorite ? (
                            <>
                             
                            <div className="favorite-badge">
                            
                                <h3 className='favorite'>FAV</h3>
                            </div>
                            </>
                        ): (
                           <div className=" underdog-badge">
                                <h3 className='underdog'>DOG</h3>
                            </div>
                        )}
                    </div>
                    </p>
               <p> MoneyLine <br />{item?.odds.awayTeamOdds.moneyLine} </p> 
               <p> Spread <br /> {item?.odds.awayTeamOdds.spreadOdds} </p>
               <p> Over/Under <br /> {item?.odds.overOdds}</p>
            </div>
          </div>
       </div>

       <p className="attribution">Odds provided by {item?.odds.provider.name}</p>
       
       
           
        
            </>
            
				    )
            
          })
          :
          <Loader />
      }
         
      </div>
 )
}
