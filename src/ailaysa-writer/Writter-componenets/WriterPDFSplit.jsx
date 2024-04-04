import React, { useEffect, useLayoutEffect, useState, useRef, useCallback } from "react";
// import FileViewer from "react-file-viewer";
import { Document, Page, pdfjs } from 'react-pdf';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { ButtonBase } from "@mui/material";
import Select, { components } from "react-select";
import { useTranslation } from "react-i18next";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
const WriterPDFSplit = (props) => {
	const {
		setSplitViewTab,
		splitViewTab,
		referenceFileExt,
		referenceFileUrl,
		splitViewChange
	} = props
    const { t } = useTranslation();
	const [zoomLevel, setZoomLevel] = useState(1.551);
	const [selectedZoomLevel, setSelectedZoomLevel] = useState(1.551);
	const [botZoomLevel, setBotZoomLevel] = useState(1.551);
	const [botSelectedZoomLevel, setBotSelectedZoomLevel] = useState(1.551);
	const [numPages, setNumPages] = useState(null);


	function onDocumentLoadSuccess({ numPages }) {
	  setNumPages(numPages);
	}

	const handleZoomSelect = e => {
		setSelectedZoomLevel(e.value);
		setZoomLevel(e.value)
	  };

	const handleBotZoomSelect = e => {
		setBotSelectedZoomLevel(e.value);
		setBotZoomLevel(e.value)
	};




	const customProjectTypeSelectStyles = {
		placeholder: (provided, state) => ({
		...provided,
		color: "#3C4043",
		fontFamily: "Roboto",
		fontSize: "13px",
		fontWeight: "400",
		lineHeight: "24px",
		}),
		menu: (provided, state) => ({
		...provided,
		padding: "6px 0px 0px 0px",
		boxShadow: "0px 3px 6px #00000029",
		border: "1px solid #DADADA",
		borderRadius: "4px",
        zIndex: 1080,
		}),
		option: (provided, state) => ({
		...provided,
		borderBottom: "0px solid #CED4DA",
		borderLeft: "2px solid transparent",
		color: state.isSelected ? "#ffffff" : state.isDisabled ? "#cccccc" : "#7E7E7E",
		background: state.isSelected ? "#F4F5F7" : "#ffffff",
		display: "flex",
		marginBottom: "0.2rem",
		padding: "4px 6px",
		color: "#292929",
		fontFamily: "Roboto",
		fontSize: "13px",
		fontWeight: "400",
		lineHeight: "24px",
		"&:hover": {
			background: "#F4F5F7",
			borderLeft: "2px solid #0074D3",
			cursor: "pointer",
		},
		}),
		menuPortal: base => ({ ...base, zIndex: 9999 }),
		control: (base, state) => ({
		...base,
		border: state.isFocused ? "1px solid #0074D3" : "1px solid #5F636866",
		outline:  state.isFocused ? "1px solid #0074D3" : "none",
		backgroundColor: "#FFFFFF",
		borderRadius: 2,
		transtion: 0.3,
		color: "#222222",
		fontFamily: "Roboto",
		fontSize: "13px",
		fontWeight: "500",
		lineHeight: "24px",
		boxShadow: 0,
		padding: "0px",
		minWidth: 75,
        width: "100%",
        minHeight: 26,
		height: state.isFocused ? 26 : 26,
		"&:hover": {
			cursor: "pointer",
		},
		}),
		menuList: (base) => ({
		...base,
		// height: "100px",

		"::-webkit-scrollbar": {
			width: "8px"
		},
		"::-webkit-scrollbar-track": {
			background: "transparent"
		},
		"::-webkit-scrollbar-thumb": {
			background: "#DADDE0",
			border: "8px solid #DADDE0 !important",
			borderRadius: "50px",
		},

		}),
	};

	const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <span id="triangle-down"></span>
            </components.DropdownIndicator>
        );
    };


	const handleZoomIn = () => {
		const newZoomLevel = zoomLevel + 0.5;
		if (newZoomLevel <= 5.051){
			setZoomLevel(parseFloat(newZoomLevel.toFixed(3)));
			setSelectedZoomLevel(parseFloat(newZoomLevel.toFixed(3)));
		}
	};

	// useEffect(() => {
	// 	console.log(selectedZoomLevel)
	// 	console.log(zoomLevel)
	// }, [selectedZoomLevel, zoomLevel])
	

	const handleZoomOut = () => {
		const newZoomLevel = zoomLevel - 0.5;
		if(newZoomLevel >= 1.051){
			setZoomLevel(parseFloat(newZoomLevel.toFixed(3)));
			setSelectedZoomLevel(parseFloat(newZoomLevel.toFixed(3)));
		}
	};

	const handleBotZoomIn = () => {
		const newZoomLevel = botZoomLevel + 0.5;
		if (newZoomLevel <= 5.051){
			setBotZoomLevel(parseFloat(newZoomLevel.toFixed(3)));
			setBotSelectedZoomLevel(parseFloat(newZoomLevel.toFixed(3))) 
		}
	};

	const handleBotZoomOut = () => {
		const newZoomLevel = botZoomLevel - 0.5;
		if(newZoomLevel >= 1.051){
			setBotZoomLevel(parseFloat(newZoomLevel.toFixed(3)));
			setBotSelectedZoomLevel(parseFloat(newZoomLevel.toFixed(3))) 
		}
	};



	// useEffect(() => {
	// 	console.log(referenceFileExt)
	// 	console.log(referenceFileUrl)
	//   }, [referenceFileUrl, referenceFileExt])

	const botzoomScaling = [
		{
			value: 1.051,
			label: "50%"
		},
		{
			value: 1.551,
			label: "100%"
		},
		{
			value: 2.051,
			label: "150%"
		},
		{
			value: 2.551,
			label: "200%"
		},
		{
			value: 3.051,
			label: "250%"
		},
		{
			value: 3.551,
			label: "300%"
		},
		{
			value: 4.051,
			label: "400%"
		},
		{
			value: 4.551,
			label: "450%"
		},
		{
			value: 5.051,
			label: "500%"
		}
	]


	const zoomScaling = [
		{
			value: 1.051,
			label: "50%"
		},
		{
			value: 1.551,
			label: "100%"
		},
		{
			value: 2.051,
			label: "150%"
		},
		{
			value: 2.551,
			label: "200%"
		},
		{
			value: 3.051,
			label: "250%"
		},
		{
			value: 3.551,
			label: "300%"
		},
		{
			value: 4.051,
			label: "400%"
		},
		{
			value: 4.551,
			label: "450%"
		},
		{
			value: 5.051,
			label: "500%"
		}
	]
	

	return (
		<section style={{ display: splitViewTab ? '' : 'none', userSelect: 'none'}} className="pdf-document-view">
			{splitViewChange === "right" &&
				<div className="pdf-nav">
					<div className="zoom-wrap">
						<ButtonBase className="zoom-icons" onClick={handleZoomIn}>
							<AddCircleOutlineIcon className="plus" />
						</ButtonBase>
						<ButtonBase className="zoom-icons mr-" onClick={handleZoomOut}>
							<RemoveCircleOutlineIcon className="minus" />
						</ButtonBase>
						<Select
							styles={customProjectTypeSelectStyles}
							options={zoomScaling}
							value={zoomScaling.find(function(option) {
								return option.value === selectedZoomLevel;
							})}
							onChange={handleZoomSelect}
							classNamePrefix="pdf-scaling-select"
							hideSelectedOptions={false}
							placeholder=""
							components={{DropdownIndicator, IndicatorSeparator: () => null }}
							isSearchable={false}
						/>
					</div>
				</div>
			}
			<div className="pdf-view-body">
				{splitViewChange === "bottom" &&
					<div className="pdf-view-control-float">
						<div className="zoom-wrap">
							<ButtonBase className="zoom-icons" onClick={handleBotZoomIn}>
								<AddCircleOutlineIcon className="plus" />
							</ButtonBase>
							<ButtonBase className="zoom-icons" onClick={handleBotZoomOut}>
								<RemoveCircleOutlineIcon className="minus" />
							</ButtonBase>
							<Select
								styles={customProjectTypeSelectStyles}
								options={botzoomScaling}
								value={botzoomScaling.find(function(option) {
									return option.value === botSelectedZoomLevel;
								})}
								onChange={handleBotZoomSelect}
								classNamePrefix="pdf-scaling-select"
								hideSelectedOptions={false}
								placeholder=""
								menuPortalTarget={document.body}
								components={{DropdownIndicator, IndicatorSeparator: () => null }}
								isSearchable={false}
							/>
						</div>
					</div>
				}
				<div className="file-viewer-container">
					{/* <div className="file-viewer" style={{ transform: `scale(${zoomLevel})` }}> */}
						{/* <FileViewer
							fileType={referenceFileExt}
							filePath={referenceFileUrl}
							onError={(e) => console.log('Error loading file:', e)}
						/> */}
						<Document 
							file={referenceFileUrl} 
							onLoadSuccess={onDocumentLoadSuccess} 
							className="pdf-page-wrapper" 
							loading={
								<>
									<section className="in-app-animation-logo">
										<div className="svg-logo"></div>
									</section>
								</>
							}
							>
							{Array.from(
								new Array(numPages),
								(el, index) => (
									<Page
										key={`page_${index + 1}`}
										pageNumber={index + 1}
										className="pdf-pages"
										scale={splitViewChange === "bottom" ? botZoomLevel : zoomLevel}
									/>
								),
							)}
						</Document>
					{/* </div> */}
				</div>
			</div>
		</section>
	)
}

export default WriterPDFSplit