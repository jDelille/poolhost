import Rive from 'rive-react';
import React from 'react';
import LoadingIcon from './loading.riv'
import './Loading.css'

function Loader() {
  return <Rive className="loader" src={LoadingIcon}/>;
}

export default Loader;
