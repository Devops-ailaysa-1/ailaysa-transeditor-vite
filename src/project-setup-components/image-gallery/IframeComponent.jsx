import React from 'react';

function IframeComponent(props) {
  return (
    <div className='h-100 w-100'>
      <iframe src={props.src} height={props.height} width={props.width} className="iframe-component" />
    </div>
  );
}

export default IframeComponent;
