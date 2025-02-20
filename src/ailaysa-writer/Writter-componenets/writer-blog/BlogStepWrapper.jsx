import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import CreateTitle from './CreateTitle'
import SelectOutline from './SelectOutline'
import GenerateArticle from './GenerateArticle'
import { useParams } from "react-router-dom";
import Config from '../../../vendor/Config';
import { useDispatch } from "react-redux";
import { setBlogCreationResponse } from '../../../features/BlogCreationSlice';
import { useTranslation } from "react-i18next";


const BlogStepWrapper = (props) => {
    const { t } = useTranslation();
    const { 
        sourceLanguage,
        setSourceLanguage,
        showSrcLangModal,
        setshowSrcLangModal,
        sourceLanguageOptions,
        languageOptionsListRef,
        handleSourceLangClick,
        filteredResults,
        setFilteredResults,
        searchInput,
        setSearchInput,
        onFocusWrap,
        setOnFocusWrap,
        searchAreaRef,
        sourceLabel,
        setSourceLabel,
        setStepWizard, 
        stepWizard,
        setStepWizardComplete, 
        stepWizardComplete,
        targetLanguage,
        targetLanguageOptions,
        setTargetLanguageOptions,
        handleTargetLangClick,
        showTarLangModal,
        setshowTarLangModal,
        targetLabel,
        setTargetLabel
    } = props

    const params = useParams();

    const dispatch = useDispatch()
    const history = useNavigate();
    const location = useLocation();
    const URL_SEARCH_PARAMS = new URLSearchParams(window.location.search);

    // const blogCreationResponse = useSelector((state) => state.blogCreationRes.value)

    const [blogOutlineList, setBlogOutlineList] = useState([])
    const [toneOptions, setToneOptions] = useState([])
    const [selectedTone, setSelectedTone] = useState(null)
    const [totalBlogResponseObj, setTotalBlogResponseObj] = useState(null)

    const [selectIndividual, setSelectIndividual] = useState(false);
    const [createTitleCollapse, setCreateTitleCollapse] = useState(true);
    const [isEnableCollapse, setIsEnableCollapse] = useState(false);

    const blogCreationResponseRef = useRef(null)
    const blogOutlineGenResponseRef = useRef(null)
    const isNavigatedInternally = useRef(false)

    
    const toneOptionsRef = useRef(null)

    useEffect(() => {
        getAiWritingTone()
    }, [])

    
    const getAiWritingTone = () => {
        Config.axios({
            url: `${Config.BASE_URL}/app/ai_tones/`,
            method: "GET",
            auth: true,
            success: (response) => {
                let options = []
                response.data?.map(each => {
                    options.push({
                        value: each.id,
                        label: each.tone
                    })
                })
                toneOptionsRef.current = options
                setToneOptions(options)
                setSelectedTone(options[0])
            },
        });
    };

    useEffect(() => {
        let blogParam = URL_SEARCH_PARAMS.get("blog")
        if (blogParam && totalBlogResponseObj === null) {
            getTotalBlogCreationObject(blogParam)
        }
       
    }, [URL_SEARCH_PARAMS.get("blog")])

  
    const getTotalBlogCreationObject = (blogId) => {
        if(!blogId) return 
         
        Config.axios({
            url: `${Config.BASE_URL}/writer/blogcreation/${blogId}`,
            method: "GET",
            auth: true,
            success: (response) => {
                dispatch(setBlogCreationResponse(response.data))
                // console.log(response.data?.steps)
                setIsEnableCollapse(true)
                if(!isNavigatedInternally.current) {
                    if(response.data?.steps?.includes('create-title')) setStepWizard('create-title')
                    if(response.data?.steps?.includes('select-outline')) setStepWizard('select-outline')
                    if(response.data?.steps?.includes('generate-article')) setStepWizard('generate-article')
                    history((response.data?.steps !== null ? response.data?.steps : '/writer-blog/create-title') + window.location.search, {state: {prevPath: location.state?.prevPath}})
                } 
                setTotalBlogResponseObj(response.data)
                blogCreationResponseRef.current = response.data
                let selected_title_obj =  response.data?.blog_title_create?.find(each => each.selected_field)
            // console.log(selected_title_obj)
                
                if(selected_title_obj !== undefined){
                    setStepWizardComplete(1)
                    let groupedRes =  groupByKey(selected_title_obj?.blogoutline_title[0].blog_outline_session, 'group')
                    if(selected_title_obj?.blogoutline_title[0].blog_outline_session?.find(each => each.selected_field)){
                        setStepWizardComplete(2)
                    }
                    setBlogOutlineList(flattenObject(groupedRes))
                }
            },
        });
    }

    const saveBlogWizardLastStep = (blogId, step) => {
        // console.log(step)
        let formdata = new FormData();
        formdata.append("steps", step);  

        Config.axios({
            url: `${Config.BASE_URL}/writer/blogcreation/${blogId}/`, 
            method: "PUT",
            data: formdata,
            auth: true,
            success: (response) => {
                dispatch(setBlogCreationResponse(response.data))
                // console.log(response.data?.steps)
                setIsEnableCollapse(true)
                if(!isNavigatedInternally.current) {
                    if(response.data?.steps?.includes('create-title')) setStepWizard('create-title')
                    if(response.data?.steps?.includes('select-outline')) setStepWizard('select-outline')
                    if(response.data?.steps?.includes('generate-article')) setStepWizard('generate-article')
                    history((response.data?.steps !== null ? response.data?.steps : '/writer-blog/create-title') + window.location.search, {state: {prevPath: location.state?.prevPath}})
                }
                setTotalBlogResponseObj(response.data)
                blogCreationResponseRef.current = response.data
                let selected_title_obj =  response.data?.blog_title_create?.find(each => each.selected_field)
                if(selected_title_obj !== undefined){
                    let groupedRes =  groupByKey(selected_title_obj?.blogoutline_title[0].blog_outline_session, 'group')
                    setBlogOutlineList(flattenObject(groupedRes))
                }
            },
        });
    } 

    // Function to group objects based on a key
    const groupByKey = (objects, key) => {
        return objects.reduce((result, obj) => {
        const group = obj[key];
        result[group] = result[group] || [];
        result[group].push(obj);
        return result;
        }, {});
    }

    // Function to flatten an object of arrays into a single array
    const flattenObject = (obj) => {
        return Object.keys(obj).reduce((result, key) => {
        result.push(...obj[key]);
        return result;
        }, []);
    }

    return (
        <section className="blog-step-main-wrapper">
            <div className="container">
                {
                    (stepWizard === "create-title" || params.steps === "create-title") &&
                    <CreateTitle
                        toneOptions={toneOptions}
                        setToneOptions={setToneOptions}
                        selectedTone={selectedTone}
                        setSelectedTone={setSelectedTone}
                        sourceLanguage={sourceLanguage}
                        setSourceLanguage={setSourceLanguage}
                        languageOptionsListRef={languageOptionsListRef}
                        showSrcLangModal={showSrcLangModal}
                        setshowSrcLangModal={setshowSrcLangModal}
                        sourceLanguageOptions={sourceLanguageOptions}
                        handleSourceLangClick={handleSourceLangClick}
                        filteredResults={filteredResults} 
                        setFilteredResults={setFilteredResults}
                        searchInput={searchInput} 
                        setSearchInput={setSearchInput}
                        onFocusWrap={onFocusWrap} 
                        setOnFocusWrap={setOnFocusWrap}
                        searchAreaRef={searchAreaRef}
                        sourceLabel={sourceLabel}
                        setSourceLabel={setSourceLabel}
                        setStepWizard={setStepWizard} 
                        stepWizard={stepWizard}
                        setStepWizardComplete={setStepWizardComplete} 
                        stepWizardComplete={stepWizardComplete}
                        setBlogOutlineList={setBlogOutlineList}
                        blogCreationResponseRef={blogCreationResponseRef}
                        blogOutlineGenResponseRef={blogOutlineGenResponseRef}
                        getTotalBlogCreationObject={getTotalBlogCreationObject}
                        totalBlogResponseObj={totalBlogResponseObj}
                        saveBlogWizardLastStep={saveBlogWizardLastStep}
                        isNavigatedInternally={isNavigatedInternally}
                        createTitleCollapse={createTitleCollapse}
                        setCreateTitleCollapse={setCreateTitleCollapse}
                        isEnableCollapse={isEnableCollapse}
                        setIsEnableCollapse={setIsEnableCollapse}
                        groupByKey={groupByKey}
                        flattenObject={flattenObject}
                    />
                }
                {
                    (stepWizard === "select-outline" || params.steps === "select-outline") &&
                    <SelectOutline 
                        setStepWizard={setStepWizard} 
                        stepWizard={stepWizard}
                        setStepWizardComplete={setStepWizardComplete} 
                        stepWizardComplete={stepWizardComplete} 
                        blogOutlineList={blogOutlineList}   
                        setBlogOutlineList={setBlogOutlineList} 
                        blogOutlineGenResponseRef={blogOutlineGenResponseRef}  
                        getTotalBlogCreationObject={getTotalBlogCreationObject}
                        totalBlogResponseObj={totalBlogResponseObj}
                        selectIndividual={selectIndividual}
                        setSelectIndividual={setSelectIndividual}
                        saveBlogWizardLastStep={saveBlogWizardLastStep}
                        isNavigatedInternally={isNavigatedInternally}
                    />
                }
                {
                    (stepWizard === "generate-article" || params.steps === "generate-article") &&
                    <GenerateArticle 
                        toneOptions={toneOptions}
                        selectedTone={selectedTone}
                        setSelectedTone={setSelectedTone}
                        sourceLanguage={sourceLanguage}
                        targetLanguage={targetLanguage}
                        targetLanguageOptions={targetLanguageOptions}
                        sourceLanguageOptions={sourceLanguageOptions}
                        setTargetLanguageOptions={setTargetLanguageOptions}
                        showSrcLangModal={showSrcLangModal}
                        setshowSrcLangModal={setshowSrcLangModal}
                        handleTargetLangClick={handleTargetLangClick}
                        showTarLangModal={showTarLangModal}
                        setshowTarLangModal={setshowTarLangModal}
                        filteredResults={filteredResults} 
                        setFilteredResults={setFilteredResults}
                        searchInput={searchInput} 
                        setSearchInput={setSearchInput}
                        onFocusWrap={onFocusWrap} 
                        setOnFocusWrap={setOnFocusWrap}
                        searchAreaRef={searchAreaRef}
                        sourceLabel={sourceLabel}
                        setSourceLabel={setSourceLabel}
                        targetLabel={targetLabel}
                        setTargetLabel={setTargetLabel}
                        setStepWizard={setStepWizard} 
                        stepWizard={stepWizard}
                        setStepWizardComplete={setStepWizardComplete} 
                        stepWizardComplete={stepWizardComplete}
                        getTotalBlogCreationObject={getTotalBlogCreationObject}
                        totalBlogResponseObj={totalBlogResponseObj}
                        blogOutlineGenResponseRef={blogOutlineGenResponseRef}
                        blogCreationResponseRef={blogCreationResponseRef}
                        saveBlogWizardLastStep={saveBlogWizardLastStep}
                        handleSourceLangClick={handleSourceLangClick}
                        isNavigatedInternally={isNavigatedInternally}
                    />
                }
            </div>
        </section>
    )
}

export default BlogStepWrapper