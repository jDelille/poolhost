import { createGlobalStyle } from "styled-components"

export const lightTheme = {
 background: '#f8f8f8',
 font: '#000',
 navbar: '#013369',
 gamebar: '#F9FAFD',
 dashboard: '#f8f8f8',
 picks: '#f8f8f8',
 topBar: '#f8f8f8',
 border: '#202020',
 onlineBox: '#fff',
 toggler: 'lightblue',
 switch: 'dodgerblue',
 menuFont: 'black',
 border_input: '1px solid lightgray',
 loginCard: '#F9FAFD',
 expertBar: '#fff',
 navboxFont: '#fff'
}

export const darkTheme = {
 background: '#000',
 navbar: '#181818',
 font: '#f8f8f8',
 gamebar: '#202020',
 dashboard: '#202020',
 picks: '#202020',
 topBar: '#181818',
 border: '#181818',
 onlineBox: '#000',
 toggler: '#013369',
 switch: 'dodgerblue',
 menuFont: 'white',
 border_input: '1px solid lightgray',
 loginCard: '#181818',
 expertBar: '#000',
 navboxFont: '#fff'

}

export const GlobalStyles = createGlobalStyle`
 body {
  background-color: ${(props) => props.theme.body}
 }
 .header {
  background-color: ${(props) => props.theme.navbar}
 }
 .gamebar {
  background-color: ${(props) => props.theme.gamebar};
  color: ${(props) => props.theme.font}
 }
 .dashboard,
 .picks-container,
 .left-col,
 .expert-page,
 .messages,
 .update-form,
 .vegas-odds,
 .chat,
 .card,
 .page,
 .app,
 input,
 .bottom {
  background-color: ${(props) => props.theme.dashboard};
  color: ${(props) => props.theme.font};
  border: ${(props) => props.theme.border};
 }
 .top-bar,
 
 .form,
 
  textarea,
  .type-message {
  background-color: ${(props) => props.theme.gamebar};
  color: ${(props) => props.theme.font};
 }

 .menu-box {
  background-color: ${(props) => props.theme.navbar};
  color: ${(props) => props.theme.navboxFont};
 }

 .expert-labels-container {
  background-color: ${(props) => props.theme.dashboard};
  color: ${(props) => props.theme.font};
 }

 .expert-bar {
  border-bottom: ${(props) => props.theme.border};

 }

 




 .online-box {
  background-color: ${(props) => props.theme.navbar};
  color: ${(props) => props.theme.font};
 }

 .expert-bar
  {
  background-color: ${(props) => props.theme.expertBar};

 }
 ${'' /* .expert-bar:nth-of-type(odd) */}
 
 .user-bar {
  background-color: ${(props) => props.theme.expertBar};
}

 
 .nav-links-mobile a,
 .menu-logout,
 .update-profile-btn,
 .current-user
  {
  color: ${(props) => props.theme.navboxFont};
 }

 .game-time,
 .description,
 .description2 {
  color: ${(props) => props.theme.font};

 }

 .toggler-icon {
  background-color: ${(props) => props.theme.toggler};
 }

 .switch {
  background-color: ${(props) => props.theme.switch};
 }


 .leaderboard p,
 .member-link,
 .info-box p,
 .home-odds p,
 .away-odds p,
 .home-team p,
 .road-team p,
 .login-link {
  color: ${(props) => props.theme.font};
 }

 input {
  border-bottom: ${(props) => props.theme.border_input};
  background-color: ${(props) => props.theme.gamebar};
;
 }
`