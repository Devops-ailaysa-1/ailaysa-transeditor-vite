// import { aiApiConfigs } from "../config/Config";

import Config from "../../vendor/Config";

const API_URL = Config.BASE_URL;

export const getProjectsFromTransEditor = async (access_token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer  ${access_token}`);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const projectSetupResponse = await fetch(API_URL + "/workspace/project/quick/setup/", requestOptions);

        try {
            return await projectSetupResponse.json();
        } catch (err) {
            return err;
        }
    } catch (error) {
        return error;
    }
};

export const getProjectFilesAndJobsFromTransEditor = async (access_token, project_id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer  ${access_token}`);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const projectFilesAndJobsResponse = await fetch(API_URL + `/workspace/files_jobs/${project_id}`, requestOptions);

        try {
            return await projectFilesAndJobsResponse.json();
        } catch (err) {
            return err;
        }
    } catch (error) {
        return error;
    }
};

export const getFilesDocumentURLFromTransEditor = async (access_token, project_id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer  ${access_token}`);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const projectVendorDashboardResponse = await fetch(API_URL + `/workspace/vendor/dashboard/${project_id}`, requestOptions);

        try {
            return await projectVendorDashboardResponse.json();
        } catch (err) {
            return err;
        }
    } catch (error) {
        return error;
    }
};

export const getFilesDocumentIdFromTranseditor = async (access_token, document_url) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer  ${access_token}`);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const projectVendorDashboardResponse = await fetch(API_URL + document_url, requestOptions);

        try {
            return await projectVendorDashboardResponse.json();
        } catch (err) {
            return err;
        }
    } catch (error) {
        return error;
    }
};
