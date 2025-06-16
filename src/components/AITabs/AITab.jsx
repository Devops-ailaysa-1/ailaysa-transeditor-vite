import React from 'react';
import propTypes from 'prop-types';
import './tab.css';

export const AITab = ({
    dataList,
    variant,
    activeTab,
    onChange,
    customClass,
    innerTabClass,
    ...props
}) => {
    
    const changeTab = (item) => {
        onChange(item);
    }

    return (
        <div 
            className={[
                "ai-tabs",
                customClass,
            ].join(' ')}
        >
            {
                variant === 'contained' ? (
                    <div className="contained-tab-wrapper" {...props}>
                        {dataList?.map((item, index) => {
                            return (
                                <div 
                                    key={index} 
                                    className={[
                                        "inner-tabs",
                                        activeTab == item.value ? "active" : '',
                                        innerTabClass
                                    ].join(' ')} 
                                    onClick={() => changeTab(item)}
                                >
                                    {item.label}
                                </div>
                            )
                        })}
                    </div>
                ) : 
                variant === 'with-bg' ? (
                    <div className="bloc-tabs tab-heading " {...props}>
                        {dataList?.map((item, index) => {
                            return (
                                <div key={index} className={"tabs " + (activeTab == item.value ? "active-tabs" : "")} onClick={() => { changeTab(item) }}>
                                    {item.label}
                                </div>
                            )
                        })}
                    </div>
                ) :
                variant === 'without-bg' && (
                    <div className="setup-container-tab" {...props}>
                        {dataList?.map((item, index) => {
                            return (
                                <div 
                                    key={index}
                                    className={"setup-button-global " +  (activeTab == item.value ? 'active' : '')}
                                    onClick={() => changeTab(item)}
                                >
                                    <span className={"project-setup-btn " + (activeTab == item.value ? 'active' : '')}>{item.label}</span>
                                </div>
                            )
                        })}
                    </div>
                )  
            }
        </div>
    )
}

AITab.propTypes = {
    /**
     * List of items in tab
     */
    dataList: propTypes.arrayOf(propTypes.shape({
        label: propTypes.string,
        value: propTypes.number
    })),
    /**
     * Tab style variant 
     */
    variant: propTypes.oneOf([ 'contained', 'with-bg', 'without-bg']),
    /**
     * Control the current active tab
     */
    activeTab: propTypes.number,
    /**
     * onChange handler to change the active tab
     */
    onChange: propTypes.func
}

AITab.defaultProps = {
    variant: 'contained',
    dataList: [
        {
            label: 'Tab 1',
            value: 1
        },
        {
            label: 'Tab 2',
            value: 2
        },
        {
            label: 'Tab 3',
            value: 3
        }
    ],
    activeTab: 1
};
