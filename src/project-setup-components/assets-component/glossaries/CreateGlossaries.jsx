/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, createRef, useRef, useContext } from "react";
import { useParams, useNavigate , useLocation} from "react-router-dom";
import GlossaryProjectType from "../../../vendor/project-type-selection/GlossaryProjectType";
import Breadcrumbs from "../../Breadcrumbs";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Sourcelanguage from "../../../vendor/lang-modal/Sourcelanguage";
import Targetlanguage from "../../../vendor/lang-modal/Targetlanguage";
import Config from "../../../Config";
import { useTranslation } from "react-i18next";
import { glossaryContext } from './../../../vendor/context-api/Context';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import GroupsColor from "../../../assets/images/new-ui-icons/groups_color.svg"
import ReactRouterPrompt from 'react-router-prompt'

const CreateGlossaries = (props) => {
	const {
		sidebarActiveTab,
		setSidebarActiveTab
}=props

		const { t } = useTranslation();
		const location = useLocation();
			/* State constants - start */
		const params = useParams();
		const history = useNavigate();
		// const glossaryContext = useContext(glossaryContext)

		const {pathname} = useLocation()
		const [navigationModalVisible, setNavigationModalVisible] = useState(false)
		const [lastLocation, setLastLocation] = useState(null)
		const [confirmedNavigation, setConfirmedNavigation] = useState(false)

		const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);
		// Glossary project states
		const [didMount, setDidMount] = useState(false);
		const [fileUrl, setFileUrl] = useState("");
		const [showEmptyProjects, setEmptyProjects] = useState(false);
		const [totalPages, setTotalPages] = useState(0);
		const [teamOptions, setTeamOptions] = useState();
		const [files, setFiles] = useState([]);
		const [projectSearchTerm, setProjectSearchTerm] = useState("");
		const [orderField, setOrderField] = useState(null);
		const [createdProjects, setCreatedProjects] = useState([]);
		const [subjectFieldOptions, setSubjectFieldOptions] = useState(null);
		const [sourceLanguageOptions, setSourceLanguageOptions] = useState(null);
		const [targetLanguageOptions, setTargetLanguageOptions] = useState(null);
		const [projectType, setProjectType] = useState("3");
		const [mtpeEngineOptions, setMtpeEngineOptions] = useState([]);
		const [sourceLanguage, setSourceLanguage] = useState("");
		const [targetLanguage, setTargetLanguage] = useState("");
		const [deadline, setDeadline] = useState("");
		const [isLoading, setIsLoading] = useState(false);
		const [projectName, setProjectName] = useState("");
		const [contentTypeOptions, setContentTypeOptions] = useState(null);
		const [mtEnable, setMtEnable] = useState(true);
		const [primaryGlossarySourceName, setPrimaryGlossarySourceName] = useState("");
		const [glossaryCopyrightOwner, setGlossaryCopyrightOwner] = useState("");
		const [detailsOfPrimaryGlossarySourceName, setDetailsOfPrimaryGlossarySourceName] = useState("");
		const [glossaryGeneralNotes, setglossaryGeneralNotes] = useState("");
		const [glossaryLicense, setGlossaryLicense] = useState("");
		const [selectedUsagePermission, setSelectedUsagePermission] = useState({ value: 1, label: t("private") });
		const [selectedMTEngine, setSelectedMTEngine] = useState({});
		const [glossaryProjectCreationResponse, setGlossaryProjectCreationResponse] = useState(null);
		const [projectNameError, setProjectNameError] = useState("");
		const [sourceLanguageError, setSourceLanguageError] = useState("");
		const [targetLanguageError, setTargetLanguageError] = useState("");
		const [createdGlossaryProject, setCreatedGlossaryProjects] = useState(false);
		const [showSrcLangModal, setshowSrcLangModal] = useState(false);
		const [showTarLangModal, setshowTarLangModal] = useState(false);
		const [sourceLabel, setSourceLabel] = useState(t("select_source_language"));
		const [editProjectId, setEditProjectId] = useState(null);
		const [filteredResults, setFilteredResults] = useState([]);
		const [searchInput, setSearchInput] = useState('');
		const [onFocusWrap, setOnFocusWrap] = useState(false)
		const [editJobs, setEditJobs] = useState([]);
		const [sourceLanguageDisable, setSourceLanguageDisable] = useState(false);
		const [glossaryEditFiles, setGlossaryEditFiles] = useState([]);
		const [showSettings, setshowSettings] = useState(false);
		const [integrationFiles, setIntegrationFiles] = useState([]);
		const [fileError, setFileError] = useState("");
		const [fileUrlError, setFileUrlError] = useState("");
		const [subjectField, setSubjectField] = useState([]);
		const [integrationPlatform, setIntegrationPlatform] = useState(null);
		const [contentType, setContentType] = useState([]);
		const [showCreateLoader, setShowCreateLoader] = useState(false);
		const [currentPage, setCurrentPage] = useState(1);
		const [teamSelect, setTeamSelect] = useState("");
		const [activeTab, setActiveTab] = useState(1);
		const [showListingLoader, setShowListingLoader] = useState(false);
		const [supportFileExtensions, setSupportFileExtensions] = useState([]);
		const [editFiles, setEditFiles] = useState([]);
		const [editSubjects, setEditSubjects] = useState([]);
		const [editContents, setEditContents] = useState([]);
		const [projectAvailalbility, setProjectAvailalbility] = useState(null);
		const [showUpdateLoader, setShowUpdateLoader] = useState(false);
		const [alreadySelectedTarLang, setAlreadySelectedTarLang] = useState([]);
		const [alreadySelecetedTarLangID, setAlreadySelecetedTarLangID] = useState(
			[]
		);
		const [fetchedData, setFetchedData] = useState(null)
		const [targetLangListToRemove, setTargetLangListToRemove] = useState([]);

		const [editFilteredTargetLang, setEditFilteredTargetLang] = useState([]);
		const [allLangDetailsList, setAllLangDetailsList] = useState(null);
		const [commonTarValue, setCommonTarValue] = useState(null);
		const [commonSrcValue, setCommonSrcValue] = useState(null);
		const [commonMtpeEngine, setCommonMtpeEngine] = useState(null);
		const [mtpeEngines, setMtpeEngines] = useState([]);
		const [selectedMTFromAPI, setSelectedMTFromAPI] = useState({})
		const [hasFocus, setHasFocus] = useState(false);
		
		 // steps related states
		const [steps, setSteps] = useState([])
		const [stepOptions, setStepOptions] = useState([])
		const [selectedSteps, setSelectedSteps] = useState([]);
		const [stepsFromApi, setstepsFromApi] = useState([])

		const [isEditable, setisEditable] = useState(false)
		const [goBackCreateBtn, setGoBackCreateBtn] = useState(false)
		const [goBackEditBtn, setGoBackEditBtn] = useState(false)
		const [revisionStepEdit, setRevisionStepEdit] = useState(null)

		const [hasTeam, setHasTeam] = useState(null)

		const searchAreaRef = useRef(null);
		const projectIdToSelect = useRef(null);
		const projectEditable = useRef(false);
		const projectsPerPage = useRef(20);
		const deletedEditFileIds = useRef([]);
		const deletedJobIds = useRef([]);
		const deletedSubjectIds = useRef([]);
		const deletedContentIds = useRef([]);
		const targetLanguageOptionsRef = useRef([]);
		const subjectFieldOptionsRef = useRef([]);
		const contentTypeOptionsRef = useRef([]);  
		const contentprojectNameRef = useRef();
		const stepOptionRef = useRef(null)
		const mtEngineOptionRef = useRef(null)
		const prevPageInfo = useRef(null)
		const [checkchangenav,setCheckchangenav] = useState(false)
		const [page, setPage] = useState(0);
		// const stepOptions = [
		//     { value: 1, label: "Post editing", },
		//     { value: 2, label: "Proof reading",  },
		//     // { value: 3, label: "Quality check" },
		// ];

		useEffect(() => {
				if (
					URL_SEARCH_PARAMS.get("get-project-info") &&
					URL_SEARCH_PARAMS.get("type") && 
					targetLanguageOptionsRef.current?.length !== 0 &&
					mtEngineOptionRef.current !== null
				) {
					let projectId = URL_SEARCH_PARAMS.get("get-project-info");
					let projectType = URL_SEARCH_PARAMS.get("type");
					setisEditable(true)
					setEditProjectId(projectId)
					if(targetLanguageOptions !== null){
							editGlossaryProject(projectId)
					}
				}
		}, [targetLanguageOptionsRef.current, mtEngineOptionRef.current,goBackEditBtn]);

		useEffect(() => {
				if(URL_SEARCH_PARAMS.get("get-project-info")){
					setIsLoading(true);
				}
			}, [URL_SEARCH_PARAMS.get("get-project-info")])

		useEffect(() => {
			if(goBackCreateBtn){
				editGlossaryProject(glossaryProjectCreationResponse?.id)
				setEditProjectId(glossaryProjectCreationResponse?.id)
			}
		}, [goBackCreateBtn, goBackEditBtn])

		useEffect(() => {
			if(location.state?.prevPageInfo){
				prevPageInfo.current = location.state?.prevPageInfo
			}
		}, [location.state])  


		useEffect(() => {
				let a = [];
				editJobs?.forEach((each) => {
					targetLanguage?.map((b) => {
						if (b?.id === each?.target_language) {
							a?.push(each?.id);
						}
					});
				});
				let targetLangToRemove = editJobs?.filter((each) => !a.includes(each.id));
				//   console.log(targetLangToRemove)
				setTargetLangListToRemove(targetLangToRemove);
		}, [targetLanguage]);
		
		const getSteps = () => {
				Config.axios({
						url: `${Config.BASE_URL}/workspace/steps/`,
						auth: true,
						success: (response) => {
							setSteps(response.data);
						},
				});
			} 
			
			// set steps as stepOptions for react-select
			useEffect(() => {
				let stepList = []
				steps?.map(each => {
					if(each.id === 1){
							stepList.push({
									value: each.id,
									label: each.name,
									disabled: true
							})
					}else{
							stepList.push({
									value: each.id,
									label: each.name,
							})  
					}
					stepOptionRef.current = stepList 
					setStepOptions(stepList)
				})
			}, [steps])
			
			// by default post editing is selected and it can't be removed [mandatory step]
			useEffect(() => {
				setSelectedSteps(stepOptions?.filter(each => each.value === 1))
			}, [stepOptions])
		
			// handler for steps selection
			const handleSelectedSteps = (selected) => {
				setSelectedSteps(selected);
			};

			useEffect(() => {
				contentprojectNameRef.current?.focus();
				setHasFocus(true);
			}, [contentprojectNameRef]);
		
			const handleHideIcon = () => {
				contentprojectNameRef.current.focus();
				setHasFocus(true);
			};
		
			const handleProjectEnter = (e) => {
				e.which === 13 ? e.target.blur() : e.target.focus();
			};

			const handleProjectNamechange = (e) => {
				if (e.target.innerText == "") setProjectNameError(t("enter_proj_name"));
				else setProjectNameError("");
				setProjectName(e.target.innerText);
			};

		
		const editGlossaryProject = (projectId) => {
				projectEditable.current = true;
				Config.axios({
						url: `${Config.BASE_URL}/workspace/files_jobs/${projectId}/`,
						method: "GET",
						auth: true,
						success: (response) => {
								let {
										data,
										data: { glossary },
								} = response;
								// console.log(sourceLanguageOptions)
								let editSourceLanguage = targetLanguageOptionsRef.current.find((element) => element.id === data.jobs[0].source_language);
								// console.log(editSourceLanguage)
								setSourceLanguage(editSourceLanguage.id);
								let deadlineLocal = Config.convertUTCToLocal(data?.project_deadline);
								setDeadline(deadlineLocal);
								setEditFiles(data.files);
								setGlossaryEditFiles(data.glossary_files);
								setEditJobs(data.jobs);
								let selected_mt = mtEngineOptionRef.current?.find(
										(engine) => engine?.id === data?.mt_engine_id
								);
								
								setSelectedUsagePermission(usagePermissionOptions?.find((each) => glossary?.usage_permission === each.label))
									setHasTeam(data.team)
								setPrimaryGlossarySourceName(glossary?.primary_glossary_source_name);
								setGlossaryCopyrightOwner(glossary?.source_Copyright_owner);
								setDetailsOfPrimaryGlossarySourceName(glossary?.details_of_PGS);
								setglossaryGeneralNotes(glossary?.notes);
								setSourceLanguageDisable(true);
								setMtEnable(data?.mt_enable);
								setSourceLabel(editSourceLanguage.language);
								setGlossaryLicense(glossary?.public_license);
								setRevisionStepEdit(data?.revision_step_edit)
								let tar = [];
								let tarID = [];
								response.data?.jobs?.map((each) => {
										let a = each?.source_target_pair_names?.split("->");
										tar.push({ language: a[1], id: each?.target_language });
										tarID.push(each.target_language);
								});
								setAlreadySelectedTarLang(tar);
								setAlreadySelecetedTarLangID(tarID);

								let editTargetLanguages = [];
								data?.jobs?.map((job) => {
										editTargetLanguages?.push(
											targetLanguageOptionsRef.current?.find(
												(element) => element.id == job.target_language
											)
										);
								});

								setTimeout(() => {
									setTargetLanguage(editTargetLanguages);
									setSelectedMTFromAPI({
											value: selected_mt?.id,
											label: selected_mt?.name?.replaceAll("_", " "),    
									})
									setSelectedMTEngine({
									value: selected_mt?.id,
									label: selected_mt?.name?.replaceAll("_", " "),
									});
									setProjectName(data.project_name);
									if(contentprojectNameRef.current !== undefined && contentprojectNameRef.current !== null){
										contentprojectNameRef.current.innerText = data?.project_name;
									}
								
									setSelectedSteps(stepOptionRef.current?.filter(stepOpt => data?.steps.some(each => stepOpt.value === each.steps)))
									setstepsFromApi(stepOptionRef.current?.filter(stepOpt => data?.steps.some(each => stepOpt.value === each.steps)))
	
									setIsLoading(false);
								}, 80);
						},
						error: (e) => {
								// console.log(e)
						}
				});
		}    


		useEffect(() => {
				setDidMount(true); //Component mounted
				getSourceLanguages();
				getSubjectFields();
				getContentTypes();
				getSupportFileExtensions();
				getTeamsOptions();
				getMtEngines();
				getAllLangDetailsList();
				getSteps()
		}, []);
		

		/* Get source language options */
		const getSourceLanguages = () => {
				let params = {
						url: Config.BASE_URL + "/app/language/",
						auth: true,
						success: (response) => {
								targetLanguageOptionsRef.current = response.data;
								setSourceLanguageOptions(response.data);
								setTargetLanguageOptions(response.data);
						},
				};
				Config.axios(params);
		};

		/* Get subject fields options */
		const getSubjectFields = () => {
				let params = {
						url: Config.BASE_URL + "/app/subjectfield/",
						auth: true,
						success: (response) => {
								subjectFieldOptionsRef.current = response.data;
								setSubjectFieldOptions(response.data);
						},
				};
				Config.axios(params);
		};

		/* Get content-type options */
		const getContentTypes = () => {
				let params = {
						url: Config.BASE_URL + "/app/contenttype/",
						auth: true,
						success: (response) => {
								contentTypeOptionsRef.current = response.data;
								setContentTypeOptions(response.data);
						},
				};
				Config.axios(params);
		};

		/* Get support file types labels */
		const getSupportFileExtensions = () => {
				Config.axios({
						url: Config.BASE_URL + "/workspace_okapi/file_extensions/",
						auth: true,
						success: (response) => {
								setSupportFileExtensions(response.data);
						},
				});
		};

		/* Get teams dropdown options */
		const getTeamsOptions = () => {
				Config.axios({
						url: `${Config.BASE_URL}/auth/teamlist/`,
						auth: true,
						success: (response) => {
								let teamData = response.data?.team_list;
								let teamOptionsTemp = [];
								teamData.map((value) => {
										teamOptionsTemp.push({
												value: value.team_id,
												label: (
														<>
																<div className="team-font-align">
																		<span>
																				<img src={GroupsColor} alt="grp-color-icon" />
																		</span>
																		<span className="team-select-opt-txt">{value.team}</span>
																</div>
														</>
												),
										});
								});
								setTimeout(() => {
										setTeamOptions(teamOptionsTemp);
								}, 200);
						},
				});
		};

// Get all languages stt, tts, translation, mt-engine list
	const getAllLangDetailsList = () => {
		let params = {
			url: Config.BASE_URL + "/app/mt-language-support/",
			auth: true,
			success: (response) => {
				// console.log(response.data)
				setAllLangDetailsList(response.data);
			},
		};
		Config.axios(params);
	};

			/* Get machine translation engine from system values */
		const getMtEngines = () => {
				Config.axios({
				url: `${Config.BASE_URL}/app/mt_engines/`,
				auth: true,
				success: (response) => {
					mtEngineOptionRef.current = response?.data
					setMtpeEngines(response?.data);
						// console.log(response?.data)
						// setMtpeEngines(response?.data);
						// let engine =[]
						// response?.data?.map((each) =>{
						//     engine.push({
						//         value: each?.id,
						//         label: each?.name,
						//     })
						// })
						// setMtpeEngineOptions(engine)
				},
				});
		};

		useEffect(() => {
			let sourceFilter = allLangDetailsList?.filter(each => each?.language == sourceLanguage)
		
			let srcTranslateFilterRes = sourceFilter?.filter((each) => each?.translate === true);
				
				// console.log(srcTranslateFilterRes)
		
				let sortedSrcMtpe = srcTranslateFilterRes?.map((each) => {
					return each?.mtpe_engines;
				});
				// console.log(sortedSrcMtpe)
				setCommonSrcValue(sortedSrcMtpe);
		
				// remove the source language from the target language list
				setTargetLanguageOptions(targetLanguageOptionsRef.current?.filter((element) => element?.id !== sourceLanguage));
				if(targetLanguage !== ''){
					setTargetLanguage(targetLanguage?.filter(each => each?.id !== sourceLanguage))
				}
				//   console.log(allLangDetailsList.find(function(each){each.language === sourceLanguage})
			}, [sourceLanguage]);
		
			useEffect(() => {
				// console.log(targetLanguage)
				let targetArr = [];
				for (let i = 0; i < targetLanguage?.length; i++) {
					// console.log(targetLanguage[i].id)
					targetArr?.push(
						allLangDetailsList?.filter(
							(each2) => each2?.language === targetLanguage[i]?.id
						)
					);
				}
				const tarTranslateFilter = targetArr?.map((each) => {
					return each?.filter((eachTargetArr) => eachTargetArr?.translate === true);
				});
		
				// console.log(tarTranslateFilter)
				let sortedTarMtpe = tarTranslateFilter?.map((each) => {
					return each.map((each2) => {
						return each2?.mtpe_engines;
					});
				});
				let commonTarMtpeEngine = sortedTarMtpe?.shift()?.filter(function (v) {
					return sortedTarMtpe?.every(function (a) {
						return a?.indexOf(v) !== -1;
					});
				});
				// console.log(commonTarMtpeEngine)
				setCommonTarValue(commonTarMtpeEngine);
			}, [targetLanguage]);
		
			useEffect(() => {
				const common = commonSrcValue?.filter((value) =>
					commonTarValue?.includes(value)
				);
				// console.log(common)
				setCommonMtpeEngine(common);
			}, [commonSrcValue, commonTarValue]);
		
			useEffect(() => {
				let engines = [];
				const engine = mtpeEngines?.filter((value) =>
					commonMtpeEngine?.includes(value?.id)
				);
				engine?.map((eachEngine) =>
					engines?.push({
						value: eachEngine?.id,
						label: eachEngine?.name?.replaceAll("_", " "),
					})
				);
				// console.log(engines)
				// mtEngineOptionRef.current = engines 
				setMtpeEngineOptions(engines);
			}, [commonMtpeEngine]);
		
			// by default google mt is selected
			useEffect(() => {
				if (!isEditable) {
						// console.log(mtpeEngineOptions)
					setSelectedMTEngine(
						mtpeEngineOptions?.filter((each) => each?.value === 1)
					);
				}
			}, [mtpeEngineOptions]);
		
			useEffect(() => {
				if(isEditable && commonMtpeEngine){
						let engines = [];
						const engine =  mtEngineOptionRef.current?.filter((value) =>
							commonMtpeEngine?.includes(value?.id)
						);
						engine?.map((eachEngine) =>
							engines?.push({
								value: eachEngine?.id,
								label: eachEngine?.name?.replaceAll("_", " "),
							})
						);
						// console.log(engines)
						// console.log(engines?.find((each) => each.value === selectedMTFromAPI.value))
						// console.log(engines?.find((each) => each.value === selectedMTFromAPI.value) ? false : true)
						if(engines?.find((each) => each.value === selectedMTFromAPI.value) ? false : true){
								setSelectedMTEngine(mtpeEngineOptions?.filter((each) => each?.value === 1))
						}else 
						if(engines.length > 1){
								setSelectedMTEngine(selectedMTFromAPI)
						}
				}
			}, [targetLanguage, commonMtpeEngine])

			/* Selected source language should not display on the target language options */
		const removeSelectedSourceFromTarget = () => {
				
		};
		
		const handlePreviousButton = () => {
			setGoBackEditBtn(goBackEditBtn)
				setGoBackCreateBtn(false)
			setPage(0);
		}
		/* Reset the project creation form */
		const resetForm = () => {
			if(projectName){
				if(contentprojectNameRef.current !== null){
					contentprojectNameRef.current.innerText = null
				}
			}
				setEditJobs([])
				projectIdToSelect.current = null
				setEditProjectId(null);
				setSourceLanguageDisable(false)
				handlePreviousButton()
				setProjectName("");
				setTeamSelect("");
				setSourceLanguage("");
				setSourceLabel(t("select_source_language"));
				setTargetLanguage("");
				setSubjectField([]);
				setContentType([]);
				setDeadline(null);
				setMtEnable(true);
				// setPreTranslate(false);l
				
				setFiles([]);
				setisEditable(false)
				setAlreadySelectedTarLang([])
				setAlreadySelecetedTarLangID([])
				setTimeout(() => {
						setSourceLanguageError("");
						setTargetLanguageError("");
						setFileError("");
				}, 100);
				
				setPrimaryGlossarySourceName("")
				setGlossaryCopyrightOwner("")
				setDetailsOfPrimaryGlossarySourceName("")
				setglossaryGeneralNotes("")
				setGlossaryLicense("")
			 
		};

		/* Usage permission selection options */
		const usagePermissionOptions = [
				{ value: 1, label: t("private") },
				{ value: 2, label: t("public") },
		];


		const hideSettingsModal = () => setshowSettings(false);

		const modaloption = {
				closeMaskOnClick: false,
				width: 784,
				onClose: hideSettingsModal,
		};

		/* Handle MT Engine change */
		const handleMTEngineChange = (selectedOption) => {
				setSelectedMTEngine(selectedOption);
		};

		/* Handle Usage permission option change */
		const handleUsagePermissionChange = (selectedOption) => {
				setSelectedUsagePermission(selectedOption);
		};

		/* Handling source language selection */
		const handleSourceLangClick = (value, name, e) => {
				/* let elements = document.getElementsByClassName('list selected')
				for (let i = 0; i < elements.length; i++) {
						elements[i].classList.remove('selected')
				}
				e.target.classList.add("selected") */
				setSourceLanguage(value);
				setshowSrcLangModal(false);
				setSourceLabel(name);
		};
		const modaloptions = {
			closeMaskOnClick: false,
			width: navigationModalVisible ? 520 : null,
			height: navigationModalVisible ? 240 : null ,
			onClose: hideSettingsModal,
		};


		/* Handling target language selection */
		const handleTargetLangClick = (value, e) => {
				let targetLanguageTemp = targetLanguage != "" ? targetLanguage : [];
				if (e.target.nodeName !== "IMG" ? e.target.classList.contains("selected") : e.target.parentNode.classList.contains("selected")) {
						e.target.nodeName !== "IMG" ? e.target.classList.remove("selected") : e.target.parentNode.classList.remove("selected");
				targetLanguageTemp = Config.removeItemFromArray(
						targetLanguageTemp,
						value
				);
				if (editProjectId != null) {
						let thisJob = editJobs.find(
						(element) => element.target_language == value?.id
						);
						if (thisJob?.id != null) deletedJobIds.current.push(thisJob?.id);
				}
				} else {
						e.target.nodeName !== "IMG" ? e.target.classList.add("selected") : e.target.parentNode.classList.add("selected")
						targetLanguageTemp.push(value);
				}
				setTargetLanguage([...new Set(targetLanguageTemp)]);
				setSearchInput('')
				setOnFocusWrap(false)
		};

		/* Adding new project */
		const handleSubmit = (e, submission) => {
				//Also check the handleUpdate
				e.preventDefault();
				let formData = new FormData();
				/* Validation - start */
				if (submission !== "glossary-submission" && files.length == 0 && fileUrl == "" && integrationFiles.length == 0) {
						setFileError(t("upload_files"));
						return;
				}
				if (fileError != "") setFileError("");
				for (let x = 0; x < files.length; x++) {
						if (typeof files[x] != "undefined") formData.append("files", files[x]);
				}
				// if (projectName == "") {
				//     setProjectNameError("Enter a project name");
				//     return;
				// }
				/* if (teamSelect?.value == null || teamSelect?.value == '') {
						setTeamSelectError('Select a team')
						return
				} */
				if (sourceLanguage == "") {
						setSourceLanguageError(t("select_source_language"));
						return;
				}
				if (sourceLanguageError != "") setSourceLanguageError("");
				// console.log(targetLanguage)
				// console.log(targetLanguage)

				if (targetLanguage == "" || targetLanguage?.length == 0) {
						setTargetLanguageError(t("select_target_language-1"));
						return;
				}
				if (targetLanguageError != "") setTargetLanguageError("");


				if (fileUrl != "") {
						var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
						var match = fileUrl.match(regExp);
						if (match && match[2].length == 11) setFileUrlError("");
						else {
								setFileUrlError(t("enter_valid_youtube_url"));
								return;
						}
				}
				/* Validation - end */

				formData.append("project_type", projectType);
				if(selectedMTEngine?.value !== undefined){
						formData.append("mt_engine", selectedMTEngine?.value);
				}
				
				formData.append("source_language", sourceLanguage);

				
				if(targetLanguage !== ""){
						targetLanguage?.map((eachTargetLanguage) => {
								formData.append("target_languages", eachTargetLanguage?.id);
						});
				}  

				subjectField?.length > 0 &&
						subjectField?.map((eachSubjectField) => {
								formData.append("subjects", eachSubjectField?.id);
						});
				contentType?.length > 0 &&
						contentType?.map((eachContentType) => {
								formData.append("contents", eachContentType?.id);
						});

				let deadlineUTC = Config.convertLocalToUTC(deadline);
				deadline && formData.append("project_deadline", deadlineUTC);
				formData.append("mt_enable", mtEnable);

				formData.append("primary_glossary_source_name", primaryGlossarySourceName);
				formData.append("source_Copyright_owner", glossaryCopyrightOwner);
				formData.append("details_of_PGS", detailsOfPrimaryGlossarySourceName);
				formData.append("notes", glossaryGeneralNotes);
				formData.append("usage_permission", selectedUsagePermission?.label);
				formData.append("public_license", glossaryLicense);
			 
				selectedSteps?.map(eachStep => {
					formData.append("steps", eachStep?.value);
				})

				// postEditStep && formData.append("steps", 1);
				// proofReadStep && formData.append("steps", 2);

				// formData.append("project_name", projectName);
				if(projectName !== null && projectName?.trim() !== ""){
						formData.append("project_name", projectName);
					}
				if (fileUrl != "") formData.append("url", fileUrl);
				let url = "";
				if (integrationFiles.length) {
						if (!integrationFiles[0].branchId) {
								// For version control files upload the branch has to be selected
								Config.toast(t("branch_not_selected"), "error");
								return;
						}
						url = Config.BASE_URL + "/integerations/" + integrationPlatform + "/repository/branch/contentfile/" + integrationFiles[0].branchId;
						integrationFiles.forEach((value) => {
								formData.append("localizable_ids", value.id);
						});
				} else if (fileUrl == "") url = Config.BASE_URL + "/workspace/project/quick/setup/";
				else url = Config.BASE_URL + "/srt/fileUpload";
				setShowCreateLoader(true);
				Config.axios({
						headers: {
								"Access-Control-Allow-Origin": "*",
								Accept: "application/json",
								"Content-Type": "multipart/form-data; boundary=---------------------------735323031399963166993862150",
						},
						url: url,
						method: "POST",
						data: formData,
						auth: true,
						success: (response) => {
								// Config.toast("Project created successfully");
								// history(`/file-upload?page=1&order_by=-id&open-project=${response.data.id}`)
								if (submission === "glossary-submission") {
										setGlossaryProjectCreationResponse(response?.data);
										Config.toast(t("glossary_successfully_created"));
								} else {
										setShowCreateLoader(false);
										resetForm();
										/* List files - start */
										// if (currentPage == 1) listProjects();
										// else setCurrentPage(1);
										// activeToggle(1);
										/* List files - end */
										projectIdToSelect.current = response.data.id;
								}
						},
				});
		};

		// useEffect(() => {
		//   console.log(projectName)
		// }, [projectName])
		

		/* Update the edited values */
		const handleUpdate = (e, submission) => {
				//Also check handleSubmit
				e.preventDefault();
				/* Validation start */
				let formData = new FormData();
				if (submission !== "glossary-submission" && files.length == 0 && fileUrl == "" && editFiles.length == 0) {
						setFileError(t("upload_files"));
						return;
				}
				if (fileError != "") setFileError("");
				for (let x = 0; x < files.length; x++) {
						if (typeof files[x] != "undefined") formData.append("files", files[x]);
				}
				if (projectName == "") {
						setProjectNameError(t("enter_proj_name"));
						return;
				}
				/* if (teamSelect?.value == null || teamSelect?.value == '') {
						setTeamSelectError('Select a team')
						return
				} */
				if (sourceLanguageError != "") setSourceLanguageError("");
				
				if (fileUrl != "") {
						var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
						var match = fileUrl.match(regExp);
						if (match && match[2].length == 11) setFileUrlError("");
						else {
								setFileUrlError(t("enter_valid_youtube_url"));
								return;
						}
				}
				/* Validation end */
				formData.append("project_type", projectType);

				if(selectedMTEngine?.value !== undefined){
						formData.append("mt_engine", selectedMTEngine?.value);
				}
				
				formData.append("source_language", sourceLanguage);
				let targetLanguageArr = [];

				if(targetLanguage !== null && targetLanguage[0] !== undefined){
						targetLanguage?.map((eachTargetLanguage) => {
								if (
									editJobs.find(
										(element) => element.target_language == eachTargetLanguage?.id
									) == null
								){
										// console.log(eachTargetLanguage)
										formData.append("target_languages", eachTargetLanguage?.id);
								}
						}); 
				}

				formData.append("team", hasTeam);

				subjectField.map((eachSubjectField) => {
						if (editSubjects.find((element) => element.subjects == eachSubjectField.id) == null) formData.append("subjects", eachSubjectField.id);
				});

				contentType.map((eachContentType) => {
						if (editContents.find((element) => element.content_type == eachContentType.id) == null) formData.append("contents", eachContentType.id);
				});

				let deadlineUTC = Config.convertLocalToUTC(deadline);

				deadline && formData.append("project_deadline", deadlineUTC);
				formData.append("mt_enable", mtEnable);

				if(primaryGlossarySourceName !== ""){
						formData.append("primary_glossary_source_name", primaryGlossarySourceName);
				}
				if(glossaryCopyrightOwner !== ""){
						formData.append("source_Copyright_owner", glossaryCopyrightOwner);
				}
				if(detailsOfPrimaryGlossarySourceName !== ""){
						formData.append("details_of_PGS", detailsOfPrimaryGlossarySourceName);
				}
				if(glossaryGeneralNotes !== ""){
						formData.append("notes", glossaryGeneralNotes);
				}
				
				formData.append("usage_permission", selectedUsagePermission?.label);
				
				if(glossaryLicense !== ""){
						formData.append("public_license", glossaryLicense);
				}

				let stepsToRemoveList = stepOptions?.filter(stepOpt => selectedSteps?.some(each => stepOpt.value !== each.value))
				// console.log(stepsToRemoveList)
					
				let deleteIdList = ""
				if(stepsFromApi.length > selectedSteps.length){
				//   console.log(stepsToRemoveList)
					stepsToRemoveList?.map((each, index) => {
						deleteIdList += `${each.value}${index !== stepsToRemoveList?.length - 1 ? "," : ""}`
					})
				}else if(stepsFromApi.length < selectedSteps.length){
					stepsToRemoveList?.map(each => {
						formData.append("steps", each.value);
					})
				}

				// formData.append("project_name", projectName);
				if(projectName !== null && projectName?.trim() !== ""){
						formData.append("project_name", projectName);
					}

				let list = "";
				targetLangListToRemove?.map((each, index) => {
					list += `${each.id}${
						index !== targetLangListToRemove.length - 1 ? "," : ""
					}`;
				});
		

				// if (projectAvailalbility === "team") formData.append("team", true);
				
				// else formData.append("team", false);

				if (fileUrl != "") formData.append("url", fileUrl);
				let url = "";
				if (fileUrl == "")
						url = `${
								Config.BASE_URL
						}/workspace/project/quick/setup/${editProjectId}/?step_delete_ids=${deleteIdList}&file_delete_ids=${deletedEditFileIds.current.join()}&job_delete_ids=${list}&subject_delete_ids=${deletedSubjectIds.current.join()}&project_type_id=3`;
				else url = Config.BASE_URL + "/srt/fileUpload";
				setShowUpdateLoader(true);
				Config.axios({
						headers: {
								"Access-Control-Allow-Origin": "*",
								Accept: "application/json",
								"Content-Type": "multipart/form-data; boundary=---------------------------735323031399963166993862150",
						},
						url: url,
						method: "PUT",
						data: formData,
						auth: true,
						success: (response) => {
								// Config.toast("Project updated successfully");
								if (submission === "glossary-submission") {
										setGlossaryProjectCreationResponse(response?.data);
								} else {
										setShowUpdateLoader(false);
										/* listProjects()
								listFiles(editProjectId)
								editProject(null, editProjectId) */
										/* List files - start */
										// if (currentPage == 1) listProjects();
										// else setCurrentPage(1);
										// activeToggle(1);
										/* List files - end */
										projectIdToSelect.current = response.data.id;
										// history("/file-upload?page=1&order_by=-id");
								}
						},
						error: (error) => {
								Config.log(error);
						},
				});
				setEditSubjects([]);
				setEditContents([]);
				deletedSubjectIds.current = [];
				deletedContentIds.current = [];
		};
		
		const handleBlockedNavigation = ({nextLocation}) => {
			
			if(glossaryProjectCreationResponse === null && (projectName && sourceLanguage && targetLanguage) && !nextLocation.pathname.includes('/assets')){
				return true
			}
			return false
		}
		
		/* Set tab change if clicked only other tabs */
		const activeToggle = (tab) => {
				if (activeTab != tab) {
						setActiveTab(tab);
						setProjectType(null);
				}
				projectEditable.current = false;
		};

		let contextValue = {
			isLoading,
			isEditable,
			projectName,
			setProjectName,
			projectType,
			setProjectType,
			mtEnable,
			setMtEnable,
			setSourceLabel,
			sourceLanguage,
			setSourceLanguage,
			targetLanguage,
			setTargetLanguage,
			mtpeEngineOptions,
			sourceLanguageOptions,
			setSourceLanguageOptions,
			targetLanguageOptions,
			setTargetLanguageOptions,
			usagePermissionOptions,
			handleMTEngineChange,
			handleUsagePermissionChange,
			handleSourceLangClick,
			handleTargetLangClick,
			showSrcLangModal,
			showTarLangModal,
			setshowSrcLangModal,
			setshowTarLangModal,
			modaloption,
			sourceLabel,
			deadline,
			setDeadline,
			projectNameError,
			setProjectNameError,
			sourceLanguageError,
			targetLanguageError,
			sourceLanguageDisable,
			primaryGlossarySourceName,
			setPrimaryGlossarySourceName,
			glossaryCopyrightOwner,
			setGlossaryCopyrightOwner,
			detailsOfPrimaryGlossarySourceName,
			setDetailsOfPrimaryGlossarySourceName,
			glossaryGeneralNotes,
			setglossaryGeneralNotes,
			glossaryLicense,
			setGlossaryLicense,
			selectedUsagePermission,
			editProjectId,
			glossaryEditFiles,
			handleSubmit,
			handleUpdate,
			supportFileExtensions,
			glossaryProjectCreationResponse,
			activeToggle,
			projectIdToSelect,
			createdGlossaryProject,
			setCreatedGlossaryProjects,
			filteredResults, 
			setFilteredResults,
			searchInput,
			setSearchInput,
			onFocusWrap,
			setOnFocusWrap,
			searchAreaRef,
			mtpeEngines,
			setMtpeEngines,
			selectedMTEngine,
			alreadySelecetedTarLangID,
			alreadySelectedTarLang,
			goBackCreateBtn,
			setGoBackCreateBtn,
			goBackEditBtn,
			setGoBackEditBtn,
			revisionStepEdit,
			selectedSteps,
			setSelectedSteps,
			stepOptions,
			handleSelectedSteps,
			editGlossaryProject,
			contentprojectNameRef,
			handleHideIcon,
			handleProjectEnter,
			hasFocus, 
			setHasFocus,
			handleProjectNamechange,
			prevPageInfo,
			targetLanguageOptionsRef,
		}

		return (
			<React.Fragment>
				<div className="ai-working-area-glb-wrapper">
					<div className="file-trans-breadcrumbs-section">
						<glossaryContext.Provider value={contextValue}>
							<Breadcrumbs/>
							<GlossaryProjectType 
							page={page}
							setPage={setPage} />
						</glossaryContext.Provider>
					</div>
					{/* <Prompt
					when={checkchangenav}
					message={handleBlockedNavigation}
					/> */}
					<ReactRouterPrompt when={handleBlockedNavigation}>
					{({ isActive, onConfirm, onCancel }) => {
						return (
							<Rodal
								visible={isActive}
								{...modaloptions}
								showCloseButton={false}
								className="ai-mark-confirm-box"
							>
								<div className="confirmation-warning-wrapper">
									<div className="confirm-top">
									<div><span onClick={onCancel}><CloseIcon/></span></div>
									<div>{t("leave_page_confirm_head")}</div>
									<div>{t("leave_page_confirm_para")}</div>
									</div>
									<div className="confirm-bottom">
										<div>
											<Button onClick={onCancel}>{t("stay")}</Button>
											<Button  onClick={onConfirm} variant="contained">{t("leave")}</Button>
										</div>
									</div>
								</div>
							</Rodal>
						)
					}}
					</ReactRouterPrompt>
				</div>
			</React.Fragment>
		)
};

export default CreateGlossaries;