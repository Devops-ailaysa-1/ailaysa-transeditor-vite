import ButtonBase from '@mui/material/ButtonBase';

const TourTooltip = ({
	continuous,
	index,
	isLastStep,
	size,
	step,
	backProps,
	closeProps,
	primaryProps,
	skipProps,
	tooltipProps,
}, iPageTourModal) => {
	return (
		<div className="transeditor-tour-wrapper" {...tooltipProps}>
			<div className="transeditor-inner-tour-wrapper">
				{/* <img src={step.image_url} /> */}
				{step.title && 
					<h2>{step.title}</h2>
				}
				{/* <div>{step.content}</div> */}
				<div className="transeditor-tour-button-align">

					<span className="tour-list-out">{index + 1}/{size}</span>
					{/* {index > 0 && (
						<button {...backProps}>
							<span id="back">Prev</span>
						</button>
					)} */}
					{continuous && (
						<ButtonBase {...primaryProps}>
							<span className="transeditor-tour-btn" id="next">{isLastStep ? 'Got it' : 'Next'}</span>
						</ButtonBase>
					)}
					{!continuous && (
						<ButtonBase {...closeProps}>
							<span className="transeditor-tour-btn" id="close">Close</span>
						</ButtonBase>
					)}
				</div>
			</div>
		</div>
	)
}

export default TourTooltip