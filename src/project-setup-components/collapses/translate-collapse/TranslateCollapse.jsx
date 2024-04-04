import React, { useEffect, useRef } from "react";
import Config from "../../../vendor/Config";
import TextCollapse from "../translate-collapse/TextCollapse";
import FilesCollapse from "../translate-collapse/FilesCollapse";

const TranslateCollapse = () => {
    return (
        <React.Fragment>
            <div className="ai-subtask-glb-wrapper">
                <TextCollapse />
                {
                    Config.userState?.internal_member_team_detail?.role !== 'Editor' &&
                    <FilesCollapse />
                }
            </div>
        </React.Fragment>
    );
};

export default TranslateCollapse;
