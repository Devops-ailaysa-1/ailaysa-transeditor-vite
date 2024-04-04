import React, { useState } from "react";
import Config from "../Config";
import ProjectTypeImg1 from "../../assets/images/project-setup/project-type-img1.svg"
import ProjectTypeImg2 from "../../assets/images/project-setup/project-type-img2.svg"
import ProjectTypeImg3 from "../../assets/images/project-setup/project-type-img3.svg"
import ProjectTypeImg4 from "../../assets/images/project-setup/project-type-img4.svg"


function SelectProjectType(props) {
    const selectProjectType = [
        {
            id: 1,
            title: "Simple project",
            desc: "Translate your file and edit your file if needed.either you can do it yourself or assign to anyone",
            img: ProjectTypeImg1,
        },
        {
            id: 2,
            title: "Advanced Project",
            desc: "Localize your websites into muiltiple languages by integrating your github or gitlab account",
            img: ProjectTypeImg2,
        },
        {
            id: 3,
            title: "Glossary Project",
            desc: "Create your glossary for multiple languages and use it in your translation project or you can download it as tbx file",
            img: ProjectTypeImg3,
        },
        {
            id: 4,
            title: "Social Media Integration",
            desc: "Integrate your social media account and get your content translated and posted back to it",
            img: ProjectTypeImg4,
        },
    ];

    return (
        <React.Fragment>
            <section className="select-project-type-wrapper">
                <h1 className="title">Select project type</h1>
                <div className="select-project-row">
                    {selectProjectType.map((item, index) => {
                        return (
                            <div key={item.id} onClick={(e) => props.handleProjectType(item.id)} className="select-project-col">
                                <img src={item.img} />
                                <h2 className="title">{item.title}</h2>
                                <p className="description">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
        </React.Fragment>
    );
}

export default SelectProjectType;
