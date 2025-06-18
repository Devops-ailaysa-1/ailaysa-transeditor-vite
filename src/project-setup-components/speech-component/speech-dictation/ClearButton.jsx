// import React from "react";
// import { ContentState, EditorState } from "draft-js";
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import { ButtonBase } from "@mui/material";

// export default function ClearButton({ editorState, onChange,down }) {
//   const handleClear = () => {
//     onChange(
//       EditorState.push(
//         editorState,
//         ContentState.createFromText(""),
//         "insert-characters"
//       )
//     ); 
//   };

//   return (    
//     <div className="clear-div">
//       <ButtonBase className="clear-but" onClick={handleClear} disabled={down? false: true}>
//       <DeleteOutlineIcon className="icon"/>
//       </ButtonBase>
//     </div>
    
//   );
// }
