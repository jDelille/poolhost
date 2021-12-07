import React, {useState, useEffect} from 'react'
import './UpdateProfile.css'
import firebase from 'firebase'
import { Link, useHistory } from "react-router-dom";

export default function UpdateProfile() {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [favoriteTeam, setFavoriteTeam] = useState('')
    const [avatar, setAvatar] = useState('')
    const history = useHistory();

    // current user 
    const user = firebase.auth().currentUser;

  // add picks to user collection in firestore
  const updateProfile = () => {
    const userUID = user.uid;
    let db = firebase.firestore();
    db.collection('users').doc(userUID).update({
        displayName: username,
        firstname: firstname,
        lastname: lastname,
        favoriteTeam: favoriteTeam,
        photoURL: avatar
    })
    history.push("/")
  }







    return (
        <div className="update-profile-page">
            <form className="update-form">
                <h1> Update Profile</h1>

                
                <input
                onChange={(e) => setFirstname(e.target.value)} 
                type="text" 
                placeholder="First Name"
                
                />
                <input 
                onChange={(e) => setLastname(e.target.value)} 
                type="text" 
                placeholder="Last Name"
                
                />
                <input
                onChange={(e) => setUsername(e.target.value)} 
                type="text" 
                placeholder="Username"
               
                />

                <input
                onChange={(e) => setFavoriteTeam(e.target.value)} 
                type="text" 
                list='suggestions'
                size="50px"
                placeholder="Favorite Team"
                
                />
                <datalist id="suggestions">
                    <option value="ARI">ARI</option>
                    <option value="ATL">ATL</option>
                    <option value="BAL">BAL</option>
                    <option value="BUF">BUF</option>
                    <option value="CAR">CAR</option>
                    <option value="CHI">CHI</option>
                    <option value="CIN">CIN</option>
                    <option value="CLE">CLE</option>
                    <option value="DAL">DAL</option>
                    <option value="DEN">DEN</option>
                    <option value="DET">DET</option>
                    <option value="GB">GB</option>
                    <option value="HOU">HOU</option>
                    <option value="IND">IND</option>
                    <option value="JAX">JAX</option>
                    <option value="KC">KC</option>
                    <option value="LV">LV</option>
                    <option value="LAC">LAC</option>
                    <option value="LAR">LAR</option>
                    <option value="MIA">MIA</option>
                    <option value="MIN">MIN</option>
                    <option value="NE">NE</option>
                    <option value="NO">NO</option>
                    <option value="NYG">NYG</option>
                    <option value="NYJ">NYJ</option>
                    <option value="PHI">PHI</option>
                    <option value="PIT">PIT</option>
                    <option value="SF">SF</option>
                    <option value="SEA">SEA</option>
                    <option value="TB">TB</option>
                    <option value="TEN">TEN</option>
                    <option value="WAS">WAS</option>

                </datalist>
               
                <label> Choose an avatar</label>
                <div className={"profile-pictures"}>
                    <img alt="avatar" src='https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png' 
                        onClick={() => setAvatar('https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png')}
                    />
                    <img alt="avatar" src='https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Hipster_Man-128.png' 
                        onClick={() => setAvatar('https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Hipster_Man-128.png')}
                    />
                    <img alt="avatar" src='https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Sunglasses_Business_Man-128.png' 
                        onClick={() => setAvatar('https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Sunglasses_Business_Man-128.png')}
                    />
                    <img alt="avatar" src='https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Bearded_Man-19-128.png' 
                        onClick={() => setAvatar('https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Bearded_Man-19-128.png')}
                    />
                    <img alt="avatar" src='https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Kung_Fu_Man-128.png' 
                        onClick={() => setAvatar('https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Kung_Fu_Man-128.png')}
                    />
                    <img alt="avatar" src='https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Construction_Man-128.png' 
                        onClick={() => setAvatar('https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Construction_Man-128.png')}
                    />
                    <img alt="avatar" src='https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Afro-128.png' 
                        onClick={() => setAvatar('https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Afro-128.png')}
                    />
                    <img alt="avatar" src='https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Sunglasses_Woman-128.png' 
                        onClick={() => setAvatar('https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Sunglasses_Woman-128.png')}
                    />
                </div>
                <button
                type="submit"
                onClick={updateProfile}
                > Save Changes </button>
            </form>
        </div>
    )
}
