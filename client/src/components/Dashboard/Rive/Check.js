import Rive from 'rive-react';
import React from 'react';
import CheckIcon from './check.riv'
import './RiveIcons.css'

export default function Check() {
  return <Rive className="rive-check" src={CheckIcon}/>;
}
