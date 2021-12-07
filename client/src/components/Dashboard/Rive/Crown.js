import Rive from 'rive-react';
import React from 'react';
import CrownIcon from './crown.riv'
import './RiveIcons.css'

export default function RiveIcons() {
  return <Rive className="rive-crown" src={CrownIcon}/>;
}

