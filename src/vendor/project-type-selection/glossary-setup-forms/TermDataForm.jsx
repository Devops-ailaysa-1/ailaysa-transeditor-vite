import React, { useState, useEffect, useRef, useContext } from "react";
import Config from "../../Config";
import { glossaryContext } from "../../context-api/Context";
import Cookies from 'js-cookie'
import axios from "axios";
import { useTranslation } from "react-i18next";
import FileUploadIcon from "../../../assets/images/new-ui-icons/file_upload.svg"
import FileUploadBlueBtn from "../../../assets/images/new-ui-icons/file_download_blue.svg"
import ArrowRightAltBlack from "../../../assets/images/project-setup/arrow_right_alt_black.svg"
import ArrowRightAltBlue from "../../../assets/images/project-setup/attach_file_blue.svg"
import CloseBlack from "../../../assets/images/new-ui-icons/close_black.svg"

const TermDataForm = (props) => {
    const { t } = useTranslation();

    const {
        glossaryProjectCreationResponse,
        glossaryEditFiles,
    } = useContext(glossaryContext)

    let {
        uploadBucket,
        setUploadBucket,
        setGlossaryBucket,
        unsupportedFile
    } = props

    // const [uploadBucket, setUploadBucket] = useState([]);
    const [selectedJobs, setSelectedJobs] = useState(null);
    const [trigger, setTrigger] = useState(null);
    const [bucketsChangedIndex, setBucketsChangedIndex] = useState(null);
    const [selectedProjectJobsCount, setSelectedProjectJobsCount] = useState(null);
    const [glossaryEditLocalFiles, setGlossaryEditLocalFiles] = useState([]);
    const [showCopySrc, setShowCopySrc] = useState(false)
    const [hiddenLinkUrl, setHiddenLinkUrl] = useState(null)

    const supportFileExtensions = useRef([".xlsx"]);
    const allowedSingleFileSize = useRef(100);
    const singleFileSizeError = useRef(t("file_size_exceeds"));
    const downloadref = useRef(null)
    const downloadedFileName = useRef(null)
    const termFileInputRef = useRef(null)


    // const GlossaryDownBtn = withStyles((theme) => ({
    //     root: {
    //         backgroundColor: "#ffffff",
    //         boxShadow: "0px 2px 4px #0000003D",
    //         padding: "7px 16px",
    //         borderRadius: "3px",
    //         textTransform: "none",
    //         "&:hover": {
    //             backgroundColor: "#f5f5f5",
    //             boxShadow: "0px 2px 4px #0000003D",
    //         },
    //     },
    // }))(Button);

    // const CustomHeaderCheckbox = withStyles({
    //     root: {
    //         color: "#5F6368",
    //         "&:hover": {
    //             backgroundColor: "#EBEBEB",
    //         },
    //         "&$checked": {
    //             color: "#0078D4",
    //             "&:hover": {
    //                 backgroundColor: "#E5F1FB",
    //             },
    //         },
    //     },
    //     checked: {},
    // })(Checkbox);

    const samplePairValues = [
        {
            id: 1,
            src_lang: "English",
            tar_lang: "Japanese",
        },
        {
            id: 2,
            src_lang: "English",
            tar_lang: "Tamil",
        },
        {
            id: 3,
            src_lang: "English",
            tar_lang: "Telugu",
        },
        {
            id: 4,
            src_lang: "English",
            tar_lang: "Malayalam",
        },
    ];

    useEffect(() => {
        if (glossaryProjectCreationResponse && Object.keys(glossaryProjectCreationResponse)?.length) {
            Config.axios({
                url: `${Config.BASE_URL}/workspace/files_jobs/${glossaryProjectCreationResponse?.id}/`,
                method: "GET",
                auth: true,
                success: (response) => {
                    setSelectedProjectJobsCount(response.data?.jobs?.length != null ? response.data.jobs.length : 1);
                    setSelectedJobs(response?.data?.jobs);
                },
            });
        }
    }, [glossaryProjectCreationResponse]);

    useEffect(() => {
        let bucketList = [];
        if (selectedJobs?.length) {
            selectedJobs.map((eachJob) => {
                bucketList.push({ thisJobId: eachJob.id, thisJobsFileList: [] });
            });
        }
        setUploadBucket(bucketList);
    }, [selectedJobs, unsupportedFile]);

    useEffect(() => {
        setGlossaryEditLocalFiles(glossaryEditFiles);
    }, [glossaryEditFiles]);

    const downloadFileFromApi = (url) => {
        // throw new Error("uncomment this line to mock failure of API");
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) != "undefined" ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) : null
        );
        let token = userCacheData != null ? userCacheData?.token : "";
        return axios.get(
            url,
          {
            responseType: "blob",
            /* 
            */
            headers: {
                "Access-Control-Expose-Headers": "Content-Disposition",
                Authorization: `Bearer ${token}`, // add authentication information as required by the backend APIs.
            },
          }
        );
    };

    const downloadTemplate = async(version) => {
        let url = ''
        if (version === "lite") url = Config.BASE_URL + "/glex/template_lite/";
        else if (version === "standard") url = Config.BASE_URL + "/glex/template/";
        const response = await downloadFileFromApi(url);
        Config.downloadFileInBrowser(response)
    };

    /* Check the file is a supprt file type */
    const isSupportedFile = (file) => {
        let name = file.name;
        let lastDot = name.lastIndexOf(".");
        let fileName = name.substring(0, lastDot);
        let ext = "." + name.substring(lastDot + 1);
        if (supportFileExtensions.current.indexOf(ext) == -1) {
            Config.toast(t("file_format_not_support"));
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        let fileList = [];
        let uploadList = uploadBucket;
        let thisFiles = e.target.files;
        let jobId = parseInt(e.target.getAttribute("data-id"));
        let changingIndex = null;

        Object.keys(thisFiles).map((eachKey) => {
            if (isSupportedFile(thisFiles[eachKey])) {
                if (thisFiles[eachKey].size / 1024 / 1024 <= allowedSingleFileSize.current) fileList.push(thisFiles[eachKey]);
                else Config.toast(singleFileSizeError.current, "error");
            }
        });

        changingIndex = uploadList?.findIndex((list) => list.thisJobId === jobId);
        uploadList?.map((bucket) => bucket?.thisJobId === jobId && includeCheck(bucket?.thisJobsFileList, fileList) && bucket?.thisJobsFileList?.push(fileList[0]));
        setTimeout(() => {
            setUploadBucket(uploadList);
        }, 200);
        setTimeout(() => {
            setBucketsChangedIndex(changingIndex);
            setTrigger(!trigger);
        }, 300);
    };

    const includeCheck = (filejobsFileList, fileList) => {
        let matchingFileName = {};
        if (!filejobsFileList?.length) {
            return true;
        } else {
            matchingFileName = filejobsFileList.find((each) => each.name === fileList[0]?.name);
            if (matchingFileName) {
                Config.toast(`${t("the_file")} ` + matchingFileName.name + ` ${t("already_added")}`);
                return false;
            } else return true;
        }
    };

    useEffect(() => {
        setGlossaryBucket(uploadBucket);
    }, [trigger, bucketsChangedIndex, uploadBucket[bucketsChangedIndex]?.thisJobsFileList?.length]);

    // delete local files
    const handleFileItemDelete = (itemId, jobIndex, fileIndex) => {
        // make the value of file input as null
        if(document.querySelector(`#term-data-file-${itemId}`)){
            document.querySelector(`#term-data-file-${itemId}`).value = null
        }
        let selectedBucket = uploadBucket[jobIndex];
        let updatedBucket = selectedBucket.thisJobsFileList?.splice(fileIndex, 1);
        // uploadBucket.splice(jobIndex, 1);
        setUploadBucket([...uploadBucket]);
    };


    const handleFileItemDeleteFromList = (itemId, jobIndex, fileId) => {
        setGlossaryEditLocalFiles(
            glossaryEditLocalFiles?.filter((files) => {
                return files.id !== fileId;
            })
        );
    };

    const deleteFileFromJob = (file) => {
        let params = {
            url: `${Config.BASE_URL}/glex/glossary_file_upload/?file_delete_ids=${file.id}&job=${file.job}`,
            method: 'DELETE',
            auth: true,
            success: (response) => {
                setGlossaryEditLocalFiles(
                    glossaryEditLocalFiles?.filter((files) => {
                        return files.id !== file.id;
                    })
                );
                Config.toast(t("file_deleted_success"));
            },
        };
        Config.axios(params);
    }
    
    return (
        <React.Fragment>
            <div className="term-data-setup-wrapper">
                <div className="glossary-row">
                    <div>
                        <img src={FileUploadIcon} alt="file_upload" />
                        <span>
                            {/* Term Data Bulk Import <span>(Optional)</span> */}
                            {t("term_data_bulk_import")}
                        </span>
                    </div>
                </div>
                <div className="term-data-setup-container">
                    <h5 className="term-data-title">{t("term_data_preparation")}</h5>
                    <p className="description">
                        {t("term_upload_note")}
                        {/* <a href="#">Learn more</a> on how to choose and fill data. */}
                    </p>

                    <div className="glossary-dwn-btn-row">
                        <button className="termDataForm-GlossaryDownBtn" onClick={() => downloadTemplate("lite")}>
                            <span className="glossary-btn-txt">
                                <span>
                                    <img src={FileUploadBlueBtn} alt="glossary-temp" />
                                </span>{" "}
                                {t("gloss_temp_lite")}
                            </span>
                        </button>

                        <button className="termDataForm-GlossaryDownBtn" onClick={() => downloadTemplate("standard")}>
                            <span className="glossary-btn-txt">
                                <span>
                                    <img src={FileUploadBlueBtn} alt="glossary-temp" />
                                </span>{" "}
                                {t("gloss_temp_standard")}
                            </span>
                        </button>
                    </div>

                    <div className="term-data-lang-pair-wrapper">
                        <h5 className="term-data-title">{t("term_data_management")}</h5>
                        <div className="term-data-list-wrapper">
                            <ul className="term-data-list">
                                {selectedJobs?.map((item, jobIndex) => {
                                    return (
                                        <li key={item.id} className="term-data-list-item">
                                            <div className="list-row">
                                                <div className="term-data-lang-pair">
                                                    <span className="lang">{item.source_target_pair_names?.split("->")[0]}</span>
                                                    <img src={ArrowRightAltBlack} />
                                                    <span className="lang">{item.source_target_pair_names?.split("->")[1]}</span>
                                                </div>
                                                <div className="term-data-file-choose">
                                                    <img src={ArrowRightAltBlue} />
                                                    <label htmlFor={`term-data-file-${item.id}`}>{t("choose_file")}</label>
                                                    <input
                                                        type="file"
                                                        ref={termFileInputRef} 
                                                        id={`term-data-file-${item.id}`}
                                                        name={"file-" + item.id}
                                                        accept={supportFileExtensions.current.join(",")}
                                                        onChange={(e) => handleChange(e)}
                                                        data-id={item.id}
                                                        hidden
                                                    />
                                                </div>
                                            </div>

                                            <ul className="file-list-row">
                                                {glossaryEditLocalFiles?.map((eachObject, index) => {
                                                    return eachObject.job === item.id ? (
                                                        <li key={index} className="file-list-item">
                                                            <span className="title">
                                                                <img
                                                                    src={
                                                                        `${Config.BASE_URL}/app/extension-image/` + eachObject.filename?.split(".")?.pop()
                                                                    } alt="extentsion-icon"
                                                                />
                                                                {eachObject.filename}
                                                            </span>
                                                            <span className="close-wrapper"  onClick={() => deleteFileFromJob(eachObject)}>
                                                                <span className="close-new">
                                                                    <img src={CloseBlack} />
                                                                </span>
                                                            </span>
                                                        </li>
                                                    ) : null;
                                                })}
                                                {uploadBucket[jobIndex]?.thisJobsFileList?.length
                                                    ? uploadBucket[jobIndex]?.thisJobId === item.id &&
                                                      //   <ul className="file-list-row">
                                                      uploadBucket[jobIndex]?.thisJobsFileList.map((file, fileIndex) => {
                                                          return (
                                                              <li key={fileIndex} className="file-list-item">
                                                                  <span className="title">
                                                                      <img
                                                                          src={`${Config.BASE_URL}/app/extension-image/` + file?.name?.split(".")?.pop()}
                                                                          alt="extentsion-icon"
                                                                      />
                                                                      {file?.name}
                                                                  </span>
                                                                  <span className="close-wrapper">
                                                                      <span
                                                                          className="close-new"
                                                                          onClick={(e) => handleFileItemDelete(item.id, jobIndex, fileIndex)}
                                                                      >
                                                                          <img src={CloseBlack} />
                                                                      </span>
                                                                  </span>
                                                              </li>
                                                          );
                                                      })
                                                    : //   </ul>
                                                      null}
                                            </ul>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <a href={hiddenLinkUrl} download={downloadedFileName.current} className="hidden" ref={downloadref} />
            </div>
        </React.Fragment>
    );
};

export default TermDataForm;

// {glossaryEditLocalFiles[jobIndex]?.job === item.id && (
//     <li key={glossaryEditLocalFiles[jobIndex]?.id} className="file-list-item">
//     <span className="title">
//         <img
//             src={
//                 `${Config.BASE_URL}/app/extension-image/` +
//                 glossaryEditLocalFiles[jobIndex]?.filename?.split(".")?.pop()
//             }
//         />
//         {glossaryEditLocalFiles[jobIndex]?.filename}
//     </span>
//     <span className="close-wrapper">
//         <span
//             className="close-new"
//             onClick={(e) =>
//                 handleFileItemDeleteFromList(item.id, jobIndex, glossaryEditLocalFiles[jobIndex]?.id)
//             }
//         >
//             <img src={Config.HOST_URL + "assets/images/new-ui-icons/close_black.svg"} />
//         </span>
//     </span>
// </li>
// )}
