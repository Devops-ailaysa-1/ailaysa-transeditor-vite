import React, { useState, useEffect } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import generateKey from './../../project-setup-components/speech-component/speech-to-text/recorder-components/utils/GenerateKey';
import Config from '../Config';

export const ChipInputField = (props) => {
    let {
        input,
        setInput,
        chipsArray,
        setChipsArray,
        chipsCopyArray,
        setChipsCopyArray,
        deleteChip,
        placeHolder,
        refs,
        getKeywordStringList
    } = props

    const [isKeyReleased, setIsKeyReleased] = useState(false);
    const [isChipEditId, setIsChipEditId] = useState();

    const onChipInputChange = (e) => {
        const { value } = e.target;
        let keywordLength = getKeywordStringList(chipsArray)?.trim()?.length + value?.trim()?.length + (chipsArray?.length === 0 ? 0 : 1)
        if (keywordLength > 200) {
            // Config.toast('Keywords should not exceed 200 characters', 'warning')
            // refs.current.style.border = '1px solid #e74c3c'
            return
        }
        setInput(value);
    }

    const handleChipEdit = (id) => {
        if (chipsCopyArray?.find(item => item.id === id)) {
            setIsChipEditId(id)
        } else {
            setIsChipEditId("")
        }
    }

    const onKeyDown = (e) => {
        const { which } = e;
        const trimmedInput = input.trim();

        let keywordLength = getKeywordStringList(chipsArray)?.trim()?.length + trimmedInput?.length + (chipsArray?.length === 0 ? 0 : 1)
        if (keywordLength > 200) {
            // Config.toast('Keywords should not exceed 200 characters', 'warning')
            // refs.current.style.border = '1px solid #e74c3c'
            return
        }


        if ((which === 188 || which === 13) && trimmedInput.length && !chipsArray.includes(trimmedInput)) {
            e.preventDefault();
            setChipsArray(prevState => [...prevState, { id: generateKey(), name: trimmedInput }]);
            setInput('');
        }
        if (which === 8 && !input.length && chipsArray.length && isKeyReleased) {
            e.preventDefault();
            const tagsCopy = [...chipsArray];
            const poppedTag = tagsCopy.pop();
            // console.log(poppedTag);

            setChipsArray(tagsCopy);
            setInput(poppedTag.name);
        }
        setIsKeyReleased(false);
    };

    const handleOnBlur = (e) => {
        const trimmedInput = input.trim();
        if (trimmedInput) {
            let keywordLength = getKeywordStringList(chipsArray)?.trim()?.length + trimmedInput?.length + (chipsArray?.length === 0 ? 0 : 1)
            if (keywordLength > 200) {
                // Config.toast('Keywords should not exceed 200 characters', 'warning')
                // refs.current.style.border = '1px solid #e74c3c'
                return
            }
            e.preventDefault();
            setChipsArray(prevState => [...prevState, { id: generateKey(), name: trimmedInput }]);
            setInput('');
        }
    }

    const onKeyUp = () => {
        setIsKeyReleased(true);
    }

    const editChip = (e, chipId) => {

        if (getKeywordStringList(chipsCopyArray)?.trim()?.length >= 200) {
            // refs.current.style.border = '1px solid #e74c3c'
            return
        } else {
            refs.current.style.border = '1px solid #D3D8DC'
        }

        const newArr = chipsArray?.map(obj => {
            if (obj.id === chipId) {
                return {
                    ...obj,
                    name: e.target.value
                };
            }
            return obj;
        });
        setChipsCopyArray(newArr?.filter(each => each.name?.trim() !== ''))
    }

    const moveCopyToOriginal = () => {
        setChipsArray(chipsCopyArray)
        setIsChipEditId("")
    }

    useEffect(() => {
        setChipsCopyArray(chipsArray)
        // console.log(chipsArray); 
    }, [chipsArray])

    return (
        <div className="blog-suggestion-inputs" ref={refs} >
            {chipsArray?.map((chip, index) => {
                return (
                    <span key={chip.id} className={`blog-suggestion-input-chips ${(isChipEditId === chip.id) ? "editing" : ""}`}>
                        <input
                            type="text"
                            className='chip-edit-input'
                            maxLength={80}
                            value={chipsCopyArray?.find(each => each.id === chip.id)?.name}
                            onChange={(e) => editChip(e, chip.id)}
                            onClick={() => handleChipEdit(chip.id)}
                            onBlur={(e) => moveCopyToOriginal()}
                        />
                        <button className="clr-chip" onClick={() => deleteChip(chip.id)}><ClearIcon className="clr-icon" /></button>
                    </span>
                )
            })}

            <input
                type="text"
                className="add-chip-input"
                value={input}
                maxLength={80}
                placeholder={chipsArray?.length === 0 ? placeHolder : ''}
                onKeyDown={onKeyDown}
                onChange={onChipInputChange}
                onKeyUp={onKeyUp}
                onBlur={handleOnBlur}
            />
        </div>
    )
}
