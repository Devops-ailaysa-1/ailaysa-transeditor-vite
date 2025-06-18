import React from 'react';

export const MainAILoader = (props) => {
  return (
    <>
        <section 
          className="animation-logo"
          style={
            (props.background || props.position || props.zIndex) ? 
            {
              background: props.background, 
              position: props.position ? props.position : 'fixed',
              zIndex: props.zIndex
            } 
            : {}
          }
        >
            <div className="svg-logo"></div>
        </section>
    </>
  );
}
