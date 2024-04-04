// import React, { useEffect, useLayoutEffect, useState, useRef, useCallback } from "react";
// import UndoIcon from '@mui/icons-material/Undo';
// import RedoIcon from '@mui/icons-material/Redo';
// import PrintIcon from '@mui/icons-material/Print';
// import SpellcheckIcon from '@mui/icons-material/Spellcheck';
// import FormatPaintIcon from '@mui/icons-material/FormatPaint';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import BrushIcon from '@mui/icons-material/Brush';
// import FormatBoldIcon from '@mui/icons-material/FormatBold';
// import FormatItalicIcon from '@mui/icons-material/FormatItalic';
// import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
// import LinkIcon from '@mui/icons-material/Link';
// import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
// import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
// import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined';
// import FormatAlignRightOutlinedIcon from '@mui/icons-material/FormatAlignRightOutlined';
// import FormatAlignCenterOutlinedIcon from '@mui/icons-material/FormatAlignCenterOutlined';
// import FormatAlignJustifyOutlinedIcon from '@mui/icons-material/FormatAlignJustifyOutlined';
// import FormatLineSpacingOutlinedIcon from '@mui/icons-material/FormatLineSpacingOutlined';
// import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
// import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
// import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
// import FormatClearIcon from '@mui/icons-material/FormatClear';
// import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
// import SubscriptIcon from '@mui/icons-material/Subscript';
// import SuperscriptIcon from '@mui/icons-material/Superscript';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import ContentCutIcon from '@mui/icons-material/ContentCut';
// import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
// import Tooltip from '@mui/material/Tooltip';
// import Config from "../../vendor/Config";
// import { Button, PopoverHeader, PopoverBody, UncontrolledPopover,UncontrolledDropdown,DropdownMenu,DropdownToggle,DropdownItem } from 'reactstrap';
// import { SketchPicker } from 'react-color';
// import { FontFamilyList, ArabicFontFamilyList, BengaliFontFamilyList, ChineseHkFontFamilyList, ChineseSimpFontFamilyList, ChineseTrFontFamilyList, GujaratiFontFamilyList, GurmukhiFontFamilyList, KanadaFontFamilyList, MalayalamFontFamilyList, MyanmarFontFamilyList, OriyaFontFamilyList, SinhalaFontFamilyList, TamilFontFamilyList, TeluguFontFamilyList, TibetanFontFamilyList } from './WritterData'
// import Select from 'react-select'


// const WritterToolbar = (props) => {

//     const {
//         writterref,
//         editor
//     } = props

//     console.log(writterref);

// const [bold , setBold] = useState(false)
// const [italic, setItalic] = useState(false)
// const [underline, setUnderline] = useState(false)
// const [strike, setStrike] = useState(false)
// const [subScript, setSubScript] = useState(false)
// const [superscript, setSuperscript] = useState(false)
// const [foreColor, setForeColor] = useState('#000000')
// const [backcolor, setBackcolor] = useState('#000000')
// const [activeFontFamily, setActiveFontFamily] = useState('Ariel')
// const [fontSize, setFontSize] = useState('20')

// const results = []
// FontFamilyList.forEach((ff) => {
//   results.push({
//     label: ff.name,

//     value: ff.name,
//   });
// });
// const [ options, setOptions] = useState(results)

// const allToolbarFunction = (e) => {
//     editor.summernote(e.currentTarget.dataset.id)
//     if(e.currentTarget.dataset.id == 'bold'){
//         if(!bold){
//             setBold(true)
//         }else{
//             setBold(false)
//         }
//     }

//     if(e.currentTarget.dataset.id == 'italic'){
//         if(!italic){
//             setItalic(true)
//         }else{
//             setItalic(false)
//         }
//     }

//     if(e.currentTarget.dataset.id == 'underline'){
//         if(!underline){
//             setUnderline(true)
//         }else{
//             setUnderline(false)
//         }
//     }

//     if(e.currentTarget.dataset.id == 'strikethrough'){
//         if(!strike){
//             setStrike(true)
//         }else{
//             setStrike(false)
//         }
//     }

//     if(e.currentTarget.dataset.id == 'subscript'){
//         if(!subScript){
//             setSubScript(true)
//             setSuperscript(false)

//         }else{
//             setSubScript(false)
//         }
//     }

//     if(e.currentTarget.dataset.id == 'superscript'){
//         if(!superscript){
//             setSuperscript(true)
//             setSubScript(false)

//         }else{
//             setSuperscript(false)
//         }
//     }
// }

// const textForeColor = (color) => {
//     console.log(color);

//     setForeColor("rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + color.rgb.a + ")")    

//     editor.summernote('restoreRange');
//     editor.summernote('foreColor', "rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + color.rgb.a + ")")

// }

// const textBackColor = (color) => {
//     console.log("rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + color.rgb.a + ")");
//     setBackcolor("rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + color.rgb.a + ")")    
//     editor.summernote('restoreRange');
//     editor.summernote('backColor',  "rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + color.rgb.a + ")")

// }

// // useEffect(() => {
// //     if(foreColor != null){
// //         editor.summernote('foreColor', foreColor)

// //     }

// // },[foreColor])

// // useEffect(() => {
// //     if(backcolor != null){
// //         editor.summernote('backColor', backcolor)
// //         console.log('ran');
// //     }
// // },[backcolor])

// const restoreRange = () => {

//     editor.summernote('restoreRange');

// }

// const restoreFocus = () => {
// }

// const handleFontFamily= (selected) =>{
//     console.log(selected);
//     editor.summernote('fontName', selected.value);
// }

//     console.log(FontFamilyList);

//     const AilaysaTooltip = withStyles({
//         tooltip: {
//           color: "#ffffff !important",
//           backgroundColor: "#2A2A2A !important",
//           padding: "7px 12px !important",
//           fontFamily: "Roboto !important",
//           fontSize: "12px !important",
//           lineHeight: 1.4,
//           fontWeight: "400 !important",
//           width: "auto !important",
//           maxWidth: "100%",
//         },
//         arrow: {
//           color: "#2A2A2A !important",
//         },
//       })(Tooltip);

//     return (
//         <div className="ai-writter-toolbar">
//             <div className="primary-icons">
//             <AilaysaTooltip title="Undo" placement="bottom" arrow>
//                 <div className="toolbar-hovereffect" data-id="undo" onClick={allToolbarFunction} >
//                     <UndoIcon className="toolbar-icons" />

//                 </div>
//                 </AilaysaTooltip>
//                 <AilaysaTooltip title="Redo" placement="bottom" arrow>
//                 <div className="toolbar-hovereffect" data-id="redo" onClick={allToolbarFunction}>
//                     <RedoIcon className="toolbar-icons"/>
//                 </div>
//                 </AilaysaTooltip>
//                 <AilaysaTooltip title="Copy" placement="bottom" arrow>
//                 <div className="toolbar-hovereffect" data-id="copy" onClick={() => {}}>
//                     <ContentCopyIcon className="toolbar-icons"/>
//                 </div>
//                 </AilaysaTooltip>
//                 <AilaysaTooltip title="Cut" placement="bottom" arrow>

//                 <div className="toolbar-hovereffect" data-id="cut" onClick={() => {}}>
//                     <ContentCutIcon className="toolbar-icons"/>
//                 </div>
//                 </AilaysaTooltip>
//                 <AilaysaTooltip title="Paste" placement="bottom" arrow>

//                 <div className="toolbar-hovereffect" data-id="paste" onClick={() => {}}>
//                     <ContentPasteGoIcon className="toolbar-icons"/>
//                 </div>
//                 </AilaysaTooltip>
//                 {/* <AilaysaTooltip title="Print" placement="bottom" arrow>

//                     <div className="toolbar-hovereffect" >
//                 <PrintIcon className="toolbar-icons"/>
//                 </div>
//                 </AilaysaTooltip> */}
//                 {/* <AilaysaTooltip title="Spell check" placement="bottom" arrow>
                
//                 <div className="toolbar-hovereffect">
//                     <SpellcheckIcon className="toolbar-icons"/>
//                 </div>
//                 </AilaysaTooltip> */}
//                 <AilaysaTooltip title="Format painter" placement="bottom" arrow>

//                 <div className="toolbar-hovereffect" >

//                 <FormatPaintIcon className="toolbar-icons"/>
//                 </div>
//                 </AilaysaTooltip>

//                 <div className="seperator"></div>
//                 {/* <div className="toolbar-icons">
//                     <span className="toolbar-icons">
//                         100%
//                     </span>
//                     <ArrowDropDownIcon className="toolbar-icons down-arrow"/>
//                 </div> */}
//                 {/* <div className="seperator"></div> */}
//                 <div className="toolbar-icons" id="headings" onClick={restoreRange} type="button">
//                     <span className="toolbar-icons">
//                         Normal Text
//                     </span>
//                     <ArrowDropDownIcon className="toolbar-icons down-arrow"/>
//                 </div>
//                 <UncontrolledPopover
//                     placement="bottom-left"
//                     target="headings"
//                     trigger="legacy"
//                     hideArrow
//                 >
//                    <div className="headings-container">
//                     <span>Normal</span>
//                     <span>Quote</span>
//                     <span>Code</span>
//                     <h1>Header 1</h1>
//                     <h2>Header 2</h2>
//                     <h3>Header 3</h3>
//                     <h4>Header 4</h4>
//                     <h5>Header 5</h5>
//                     <h6>Header 6</h6>
//                    </div>
//                 </UncontrolledPopover>
//                 {/* <div className="seperator"></div> */}
//                 <div className="toolbar-icons"   id="fontfamily" onClick={restoreRange} type="button" >
//                     <span className="toolbar-icons" >
//                         Ariel
//                     </span>
//                     <ArrowDropDownIcon className="toolbar-icons"/>
//                     <UncontrolledPopover
//                     placement="bottom-left"
//                     target="fontfamily"
//                     trigger="legacy"
//                     hideArrow
//                 >
//                     <div className="fontFamily-container">
                    
//                     {FontFamilyList.map((ff) => {
//                         return(
//                             <div onClick={() =>{setActiveFontFamily(ff.name)}}>{ff.name}</div>
//                         )
//                     })}
//                     </div>
//                     </UncontrolledPopover>

//                         {/* <Select
//                             placeholder="FontFamily"
//                             options={options}
//                             onClick={restoreRange}
//                             onChange={(selcted) => {
//                                 // setSubcategory(e)
//                                 handleFontFamily(selcted)
//                             }} 
//                             /> */}
                    
//                 </div>
//                 <div className="font-size">
//                     <RemoveIcon className="toolbar-icons size-icon-right" />
//                     <input value={fontSize} className="font-size-inputbox"/>
//                     <AddIcon className="toolbar-icons size-icon-left"/>
//                 </div>
//                 <AilaysaTooltip title="Bold" placement="bottom" arrow>
//                 <div className={bold ? "toolbar-hovereffect active-tools-bg " : "toolbar-hovereffect"} data-id="bold" onClick={allToolbarFunction}>
//                 <FormatBoldIcon className={bold?"toolbar-icons active-tools-color" : "toolbar-icons"} />
//                 </div>
//                 </AilaysaTooltip>
//                 <AilaysaTooltip title="Italic" placement="bottom" arrow>
//                 <div className={italic ? "toolbar-hovereffect active-tools-bg " : "toolbar-hovereffect"} data-id="italic" onClick={allToolbarFunction}>
//                 <FormatItalicIcon className={italic?"toolbar-icons active-tools-color" : "toolbar-icons"} />
//                 </div>
//                 </AilaysaTooltip>
//                 <AilaysaTooltip title="Underline" placement="bottom" arrow>
//                 <div className={underline ? "toolbar-hovereffect active-tools-bg " : "toolbar-hovereffect"} data-id="underline" onClick={allToolbarFunction}>
//                 <FormatUnderlinedIcon className={underline?"toolbar-icons active-tools-color" : "toolbar-icons"}/>
//                 </div>
//                 </AilaysaTooltip>
//                 <AilaysaTooltip title="Strike through" placement="bottom" arrow>
//                 <div className={strike ? "toolbar-hovereffect active-tools-bg " : "toolbar-hovereffect"} data-id="strikethrough" onClick={allToolbarFunction}>
//                 <FormatStrikethroughIcon className={strike?"toolbar-icons active-tools-color" : "toolbar-icons"}/>
//                 </div>
//                 </AilaysaTooltip>
//                 <AilaysaTooltip title="Subscript" placement="bottom" arrow>

//                 <div className={subScript ? "toolbar-hovereffect active-tools-bg " : "toolbar-hovereffect"} data-id="subscript" onClick={allToolbarFunction}>
//                 <SubscriptIcon className={subScript?"toolbar-icons active-tools-color" : "toolbar-icons"}/>
//                 </div>
//                 </AilaysaTooltip>
//                 <AilaysaTooltip title="Superscript" placement="bottom" arrow>

//                 <div className={superscript ? "toolbar-hovereffect active-tools-bg " : "toolbar-hovereffect"} data-id="superscript" onClick={allToolbarFunction}>
//                 <SuperscriptIcon className={superscript?"toolbar-icons active-tools-color" : "toolbar-icons"}/>
//                 </div>
//                 </AilaysaTooltip>

//                 <div className="toolbar-hovereffect"   id="color" type="button">
//                 <AilaysaTooltip title="Text color" placement="top" arrow>

//                 <svg className="toolbar-icons" id="Group_1086" data-name="Group 1086" xmlns="http://www.w3.org/2000/svg" width="18.435" height="20.397" viewBox="0 0 18.435 20.397">
//                     <rect id="Rectangle_2350" data-name="Rectangle 2350" width="18.435" height="4.136" transform="translate(0 16.261)" fill={foreColor}/>
//                     <path id="Path_2683" data-name="Path 2683" d="M11.861,2.2h.094L14.2,8.178H9.591ZM10.7,0,5.1,13.236H7.654L8.93,9.974h5.909l1.252,3.262h2.718L13.35,0Z" transform="translate(-2.69)" fill="#5f6368"/>
//                 </svg>
//                 </AilaysaTooltip>
                
//                 </div>
//                 <UncontrolledPopover
//                     placement="bottom"
//                     target="color"
//                     trigger="hover"
//                 >
                   
//                    <SketchPicker  color={foreColor} onChange={(color) => textForeColor(color)}  onChangeComplete={(color) => textForeColor(color)} />
//                 </UncontrolledPopover>

               

//                 <div className="toolbar-hovereffect"  id="textBackcolor" type="button">
//                 <AilaysaTooltip title="Text background color" placement="top" arrow>

//                 <BrushIcon className="toolbar-icons"/>
//                 </AilaysaTooltip>
                
//                 </div>
//                 <UncontrolledPopover
//                     placement="bottom"
//                     target="textBackcolor"
//                     trigger="hover"
//                 >
                   
//                    <SketchPicker color={backcolor} onChange={(color) => textBackColor(color)}  onChangeComplete={(color) => textBackColor(color)} />
//                 </UncontrolledPopover>

               
//                 <div className="seperator"></div>
//                 <AilaysaTooltip title="Link" placement="bottom" arrow>
//                 <div className="toolbar-hovereffect" >

//                 <LinkIcon className="toolbar-icons"/>
//                 </div>
//                 </AilaysaTooltip>

//                 {/* <div className="toolbar-hovereffect">

//                 <AddCommentOutlinedIcon className="toolbar-icons"/>
//                 </div> */}
//                 <AilaysaTooltip title="Upload" placement="bottom" arrow>
//                 <div className="toolbar-icons">
//                     <ImageOutlinedIcon className="toolbar-icons down-arrow"/>
//                     <ArrowDropDownIcon className="toolbar-icons down-arrow"/>
//                 </div>
//                 </AilaysaTooltip>

//                 <div className="seperator"></div>
//                 <AilaysaTooltip title="Left" placement="bottom" arrow>

//                 <div className="toolbar-hovereffect">

//                 <FormatAlignLeftOutlinedIcon className="toolbar-icons" data-id="justifyLeft" onClick={allToolbarFunction}/>
//                 </div>
//                 </AilaysaTooltip>
//                 <AilaysaTooltip title="Center" placement="bottom" arrow>

//                 <div className="toolbar-hovereffect">

//                 <FormatAlignCenterOutlinedIcon className="toolbar-icons" data-id="justifyCenter" onClick={allToolbarFunction}/>
//                 </div>
//                 </AilaysaTooltip>
//                 <AilaysaTooltip title="Right" placement="bottom" arrow>

//                 <div className="toolbar-hovereffect">

//                 <FormatAlignRightOutlinedIcon className="toolbar-icons" data-id="justifyRight" onClick={allToolbarFunction}/>
//                 </div>
//                 </AilaysaTooltip>
//                 <AilaysaTooltip title="Justify" placement="bottom" arrow>

//                 <div className="toolbar-hovereffect">

//                 <FormatAlignJustifyOutlinedIcon className="toolbar-icons" data-id="justifyFull" onClick={allToolbarFunction}/>
//                 </div>
//                 </AilaysaTooltip>

//                 <div className="seperator"></div>
//                 <AilaysaTooltip title="Spacing" placement="bottom" arrow>

//                 <div className="toolbar-hovereffect">

//                 <FormatLineSpacingOutlinedIcon className="toolbar-icons"/>
//                 </div>
//                 </AilaysaTooltip>

//                 <div className="seperator"></div>
//                 {/* <div className="toolbar-icons">
//                     <assName="toolbar-icons " src={Config.HOST_URL + "assets/images/checklist.svg"} />
//                     <ArrowDropDownIcon className="toolbar-icons down-arrow"/>

//                 </div> */}
//                 <AilaysaTooltip title="Unordered List" placement="bottom" arrow>
//                 <div className="toolbar-icons"  data-id="insertUnorderedList" onClick={allToolbarFunction}>
//                     <FormatListBulletedIcon className="toolbar-icons down-arrow"/>
//                     <ArrowDropDownIcon className="toolbar-icons down-arrow"/>

//                 </div>
//                 </AilaysaTooltip>
//                 <AilaysaTooltip title="Ordered List" placement="bottom" arrow>

//                 <div className="toolbar-icons"  data-id="insertOrderedList" onClick={allToolbarFunction}>
//                     <FormatListNumberedIcon className="toolbar-icons down-arrow"/>
//                     <ArrowDropDownIcon className="toolbar-icons down-arrow"/>

//                 </div>
//                 </AilaysaTooltip>
//                 <AilaysaTooltip title="Increase indent" placement="bottom" arrow>

//                 <div className="toolbar-hovereffect">

//                     <FormatIndentDecreaseIcon className="toolbar-icons"  data-id="indent" onClick={allToolbarFunction}/>
//                     </div>
//                 </AilaysaTooltip>
//                 <AilaysaTooltip title="Decrease indent" placement="bottom" arrow>

//                 <div className="toolbar-hovereffect">

//                 <FormatIndentIncreaseIcon className="toolbar-icons" data-id="outdent" onClick={allToolbarFunction}/>
//                 </div>
//                 </AilaysaTooltip>
//                 <AilaysaTooltip title="Remove format" placement="bottom" arrow>
               
//                 <div className="toolbar-hovereffect" data-id="removeFormat" onClick={allToolbarFunction}>

//                 <FormatClearIcon className="toolbar-icons" />
//                 </div>
//                 </AilaysaTooltip>

//             </div>
            
//         </div>
//     )


// }

// export default WritterToolbar;