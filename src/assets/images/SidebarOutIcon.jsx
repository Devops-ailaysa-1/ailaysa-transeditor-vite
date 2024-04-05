


function SidebarOutIcon(props) {

    const {
        color,
        handleColor
    } = props


    return (

        <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 66 66" fill="none">
        <g filter="url(#filter0_d_413_6606)">
          <path d="M6 6H33C47.9117 6 60 18.0883 60 33V33C60 47.9117 47.9117 60 33 60H6V6Z" fill={color}/>
        </g>
        <path d="M42.175 32.575L38.275 28.675C38.0917 28.4917 38 28.2583 38 27.975C38 27.6917 38.0917 27.4583 38.275 27.275C38.4583 27.0917 38.6917 27 38.975 27C39.2583 27 39.4917 27.0917 39.675 27.275L44.275 31.875C44.375 31.975 44.4458 32.0833 44.4875 32.2C44.5292 32.3167 44.55 32.4417 44.55 32.575C44.55 32.7083 44.5292 32.8333 44.4875 32.95C44.4458 33.0667 44.375 33.175 44.275 33.275L39.675 37.875C39.4917 38.0583 39.2583 38.15 38.975 38.15C38.6917 38.15 38.4583 38.0583 38.275 37.875C38.0917 37.6917 38 37.4583 38 37.175C38 36.8917 38.0917 36.6583 38.275 36.475L42.175 32.575Z" fill={handleColor}/>
        <defs>
          <filter id="filter0_d_413_6606" x="0" y="0" width="66" height="66" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="3"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_413_6606"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_413_6606" result="shape"/>
            </filter>
            </defs>
        </svg>
        
    )
}

export default SidebarOutIcon
