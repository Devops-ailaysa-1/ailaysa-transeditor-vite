import React, { useState, useEffect, useRef } from "react";
import Navbar from './Navbar'
import { useTranslation } from "react-i18next";
import DashboardPopularTasks from './dashboard/DashboardPopularTasks';
import DashboardQuickAccess from './dashboard/DashboardQuickAccess';
import DashboardNewProjDrpDown from "./dashboard/DashboardNewProjDrpDown";

const Dashboard = () => {
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <Navbar />
            <section className="ai-projects-main-wrapper">
                <div className="ai-projects-main-inner-wrapper">
                    <div className="ai-projects-main-wrapper__header">
                        <h1 className="ai-projects-main-wrapper__header__title">{t("all_temp_welcome_note")}</h1>
                        {/* <DashboardNewProjDrpDown /> */}
                    </div>
                    <div className="ai-projects-main-wrapper__popular-tasks">
                        <DashboardPopularTasks />
                    </div>
                    {/* <div className="ai-projects-main-wrapper__quick-access">
                        <DashboardQuickAccess />
                    </div> */}
                </div>
            </section>
        </React.Fragment>
    )
}

export default Dashboard