import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export const MoreMenu = (props) => {
    
    let { 
        item, 
        updateSpecificKeyInList,
        list,
        setList
    } = props

    const options = [
        {
            id: 1,
            value: 'Edit',
            icon: <ModeEditOutlinedIcon className="mr-2" />
        },
        {
            id: 2,
            value: 'Delete',
            icon: <DeleteOutlinedIcon className="mr-2" />
        },
    ];
  
    const ITEM_HEIGHT = 48;
  
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleEditOption = () => {
        let res = updateSpecificKeyInList(list, item.id, 'isEditable', true)
        setList(res)
        handleClose()
    } 

    const handleDeleteOption = () => {
        setList(list.filter(each => each.id !== item.id))
        handleClose()
    } 

    return (
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                className="p-1"
            >
                <MoreHorizRoundedIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                        boxShadow: '0px 8px 8px 0px rgba(0, 0, 0, 0.16)'
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem 
                        key={option.id} 
                        className="d-flex items-center py-2"
                        onClick={(e) => {
                            option.value === "Edit" ? handleEditOption() :
                            handleDeleteOption()
                        }}
                    >
                        {option.icon}
                        {option.value}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}
