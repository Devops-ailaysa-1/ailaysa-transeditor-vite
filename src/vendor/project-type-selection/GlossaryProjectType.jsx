import React, { useState } from "react";
import GlossaryGlobalForm from "./glossary-setup-forms/GlossaryGlobalForm";

const GlossaryProjectType = (props) => {
    const { page, setPage } = props;

    return (
        <React.Fragment>
            <div className="glossary-setup-wrapper">
                <GlossaryGlobalForm page={page} setPage={setPage} />
            </div>
        </React.Fragment>
    );
};

export default GlossaryProjectType;
