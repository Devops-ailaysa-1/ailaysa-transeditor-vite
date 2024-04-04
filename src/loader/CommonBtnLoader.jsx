import React from 'react';

export const ButtonLoader = (props) => {

  return (
    <div className="lds-spinner" style={props.processAll ? {marginLeft: '-8px', marginRight: '8px'} : {}}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}
