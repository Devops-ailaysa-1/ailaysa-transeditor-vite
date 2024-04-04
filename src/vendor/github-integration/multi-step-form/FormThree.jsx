import Checkbox from '@mui/material/Checkbox';


function FormThree(props) {

    // const CustomHeaderCheckbox = withStyles({
    //     root: {
    //         color: "#5F6368",
    //         "&:hover": {
    //             backgroundColor: '#EBEBEB'
    //         },
    //         "&$checked": {
    //             color: "#0078D4 !important",
    //             "&:hover": {
    //                 backgroundColor: '#0078D4'
    //             },
    //         }
    //     },
    //     checked: {}
    // })(Checkbox)

    return (
        <div className="version-form-group-wrapper">
            <ul className="version-form-file-header-list-row">
                <li className="version-form-file-list-header">
                    <span>Select Files</span>
                    <span>Size</span>
                </li>
            </ul>
            <div className="version-form-file-list-row">
                {
                    props.fileList.map(eachFile => {
                        return(
                            <div key={eachFile.id}>
                                <div className="version-control-file-list-col">
                                    <Checkbox className={'cell-box'} size="small" onChange={e => props.selectFile(e.target.checked, eachFile.id, eachFile.file, props.branchId)} checked={props.integrationFiles.map(element => element.id).indexOf(eachFile.id) != -1} />
                                </div>
                                <div className="version-control-file-list-col">
                                    <span className="file">{eachFile.file}</span>
                                </div>
                                <div className="version-control-file-list-col">
                                    <span className="file-size">{eachFile.size}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FormThree