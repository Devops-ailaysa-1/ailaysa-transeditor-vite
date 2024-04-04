import React from "react";

function Event(props) {
    const { style } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16.36"
      height="18.107"
      viewBox="0 0 16.36 18.107"
      classname={style}
    >
      <path
        fill="#5f6368"
        d="M16.025 17.994a2.089 2.089 0 111.507-.612 2.048 2.048 0 01-1.507.612zm-9 3.364A1.753 1.753 0 015.3 19.632V6.308a1.683 1.683 0 01.513-1.234 1.658 1.658 0 011.212-.513h1.311V3.25h1.638v1.311h6.99V3.25H18.6v1.311h1.311a1.753 1.753 0 011.749 1.747v13.324a1.658 1.658 0 01-.513 1.212 1.683 1.683 0 01-1.234.513zm0-1.726h12.887v-9.283H7.026zm0-10.594h12.887v-2.73H7.026zm0 0z"
        transform="translate(-5.3 -3.25)"
      ></path>
    </svg>
  );
}

export default Event;