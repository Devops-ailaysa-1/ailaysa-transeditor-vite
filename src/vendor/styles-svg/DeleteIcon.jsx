import React from 'react'

const DeleteIcon = (props) => {
  const { style } = props

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={style} width="11.79" height="12.24" viewBox="0 0 11.79 12.24">
        <path id="delete_FILL0_wght700_GRAD0_opsz48" d="M7.374,16.04a1.437,1.437,0,0,1-1.047-.419A1.4,1.4,0,0,1,5.9,14.582V6H5V4.545H8.584V3.8h4.608v.745h3.6V6h-.9v8.579a1.393,1.393,0,0,1-.434,1.032,1.431,1.431,0,0,1-1.039.427ZM14.417,6H7.374v8.579h7.043ZM8.94,13.372h1.195V7.182H8.94Zm2.715,0h1.21V7.182h-1.21ZM7.374,6V6Z" transform="translate(-5 -3.8)" fill="rgba(95,99,104,0.5)"/>
    </svg>
  )
}

export default DeleteIcon