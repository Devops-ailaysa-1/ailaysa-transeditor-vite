import React, { useEffect, useRef, useState } from 'react';
import Config from '../../Config';
import InfinityScrollComponent from './InfinityScrollComponent';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import SearchIcon from '@mui/icons-material/Search';
import IframeComponent from './IframeComponent';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import CloseBlack from "../../assets/images/new-ui-icons/close_black.svg"
import DiscardPopup from "../../assets/images/new-ui-icons/discard-popup.svg"

const ImageGallery = (props) => {
    const  {
        sidebarType,
        click,
        open,
        setOpen,
        showDesigner,
        setShowDesigner
    } = props
    const [inpurSearchImage, setInputSearchImage] = useState("");
    const [galleryData, setGalleryData] = useState([]);
    const [galleryDataList, setGalleryDataList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [focusOnSearch, setFocusOnSearch] = useState(false)
    const designtypeSearch = useRef()
  
    function oddOrEven(x) {
        return (x & 1) ? "odd" : "even";
    }


    let inputDesignhandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputSearchImage(lowerCase);

    };

    const getDesignerImages = (e) => {
        
        let urls = 
        sidebarType == 'Ai' ?
        inpurSearchImage != '' ? Config.BASE_URL + `/ai-image-translation/stable-diffusion/?search=${inpurSearchImage}` : Config.BASE_URL + `/ai-image-translation/stable-diffusion/`
        : 
        sidebarType == 'Design' ? inpurSearchImage != '' ? Config.BASE_URL + `/canvas/designer-list?search=${inpurSearchImage}&page=1` : Config.BASE_URL + `/canvas/designer-list?page=1`
        :
        inpurSearchImage != '' ? Config.BASE_URL + `/canvas/canvas-user-images/?search=${inpurSearchImage}` : Config.BASE_URL + "/canvas/canvas-user-images/?page=1"
        Config.axios({
            url: urls,
            method: "GET",
            auth: true,
            success: (response) => {
             
                setGalleryDataList(response.data)
                setGalleryData(response.data.results)
                if(response.data.next != null){
                    setHasMore(true)
                }else{
                    setHasMore(false)

                }
            },
            error: (err) => {
                console.log(err)
            },
        });

    }


    
    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename+'.png', {type:mime});
    }

    const getJsonBase64 = (id,sub) => {
        
        console.log(sub)
       
        Config.axios({
            url:  sub ? Config.BASE_URL + `/canvas/designer-list/${id}?target_id=${sub}&base_64=true` : Config.BASE_URL + `/canvas/designer-list/${id}?base_64=true`,
            method: "GET",
            auth: true,
            success: (response) => {
            
                click(dataURLtoFile(response.data.base_64,`design_${id}`))
                // exportFabricJsonToPNG(response.data.json, (dataURL) => {
                //     // The dataURL variable now contains the PNG data URL
                   
                // });
            },
            error: (err) => {
                console.log(err)
            },
        });

    }

    const [dynamicUrl , setDynamicUrl] = useState('editor')
 
    const openInDesigner = (data,translate) => {
        console.log(translate)
        if(translate == false){
            let url = `editor/${data.json.projectid.projectType}/?project=${data.json.projectid.projId}&page=${data.json.projectid.page}&type=${data.json.projectid.project_category_id}`
            setDynamicUrl(url)
            setShowDesigner(true)
        }else{
            const filteredArrays = galleryData.find(innerArray => {
                return innerArray.some(obj => obj.project_id === data.json.projectid.projId);
              });
            //   let id = obj.canvas_trans_json === data.json.projectid.langId
            const index = filteredArrays.findIndex(obj => obj.canvas_trans_json === data.json.projectid.langId);
            let url = `workspace/${data.json.projectid.projectType}/?project=${data.json.projectid.projId}&page=${data.json.projectid.page}&lang=${data.json.projectid.langId == null ? -1 : (index-1)}&view=1`
            setDynamicUrl(url)
            setShowDesigner(true)
        }

    }

    const getJson = (id,sub,translate) => {
        
       
        Config.axios({
            url:  sub ? Config.BASE_URL + `/canvas/designer-list/${id}?target_id=${sub}` : Config.BASE_URL + `/canvas/designer-list/${id}`,
            method: "GET",
            auth: true,
            success: (response) => {
                console.log(response)
                openInDesigner(response.data,translate)
                // exportFabricJsonToPNG(response.data.json, (dataURL) => {
                //     // The dataURL variable now contains the PNG data URL
                   
                // });
            },
            error: (err) => {
                console.log(err)
            },
        });

    }

    function flatten(ary) {
        var ret = [];
        for(var i = 0; i < ary.length; i++) {
            if(Array.isArray(ary[i])) {
                ret = ret.concat(flatten(ary[i]));
            } else {
                ret.push(ary[i]);
            }
        }
        return ret;
    }
    const fetchSearchedImage = (e) => {
        if (e.key === 'Enter') {
            if ((e.target.value.length > 0) && (e.target.value != ' ')) {
        
                getDesignerImages(e.target.value)
            }else{
   
                setInputSearchImage('')
                getDesignerImages()
            }
        }
    }

    useEffect(() => {
        if(sidebarType == 'Design' && showDesigner == false){
            setGalleryDataList([])
            setGalleryData([])
            getDesignerImages()
        }else if(sidebarType == 'Ai' && showDesigner == false){
            setGalleryDataList([])
            setGalleryData([])
            getDesignerImages()
        }else if(sidebarType == 'User' && showDesigner == false){
            setGalleryDataList([])
            setGalleryData([])
            getDesignerImages()
        }
    },[sidebarType,showDesigner])

    const getUrlExtension = (url) => {
        return url
          .split(/[#?]/)[0]
          .split(".")
          .pop()
          .trim();
      }
    
    const onImageEdit = async (imgUrl,key) => {
        var imgExt = getUrlExtension(imgUrl);
    
        const response = await fetch(imgUrl);
        const blob = await response.blob();
        const file = new File([blob], `ai_image_${key}.` + imgExt, {
          type: blob.type,
        });
        click(file)
    }
    
//   async function getImage(url) {
//   try {
//     let file = await onImageEdit(url); // Assuming onImageEdit returns a Promise
//     // Now that 'file' is fetched, you can call the 'click' functio
//     console.log(file);
//     click(file);
//   } catch (error) {
//     // Handle any errors that may occur during onImageEdit or click operations
//     console.error(error);
//   }
// }
    
const skeletonLoader =
<ResponsiveMasonry className="mansory_grid" columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 2 }}>
    <Masonry columnsCount={2} gutter="5px">
        {Array(15)
            .fill(null)
            .map((key, index) => (
                <Skeleton key={index} variant="rectangular" className="images-section skeleton-radius" animation="wave" height={oddOrEven(index) == 'odd' ? 120 : 100} />
            ))}
    </Masonry>
</ResponsiveMasonry>

    const imageGallerStructure =   <ResponsiveMasonry className="mansory_grid" columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 2 }}>
    <Masonry columnsCount={2} gutter="5px">
        {flatten(galleryData)?.map((file, key) => {
            return (
                <div className="ai-wrapper" key={key} >
                    <img className="ai-generated-images images-section" src={sidebarType == 'Design' ?  Config.BASE_URL + file.thumbnail_src : Config.BASE_URL + file.thumbnail } />
                    {/* <div className="ai-generated-images-image-prompt ">
                        <span className="ellipse two-lines">{file.prompt}</span>
                    </div> */}
                    <div className="template-sizes-overlay">
                    <Tooltip title={'Add to document'} placement="top" arrow >
                            <button className="create-new-template-button" onClick={() => {sidebarType == 'Design' ?  getJsonBase64(file.project_id,file.id) : onImageEdit(Config.BASE_URL + file.image,key) }}>Add</button>
                        </Tooltip>
                           {sidebarType == 'Design' &&  
                              <Tooltip title={'Edit in desiner'} placement="bottom" arrow >
                             <button className="create-browse-template-button" onClick={() => {getJson(file.project_id,file.id,file.translate_available)}}>Edit</button>
                            </Tooltip>}
                        </div>
                </div>
            )
        })}
    </Masonry >
</ResponsiveMasonry >

       const getUrl = () => {
       // Assuming you have an iframe with the id "myIframe"
        var iframe = document.querySelector(".iframe-component");

        // Get the current URL of the iframe
        var iframeURL = iframe.contentWindow.location.href;

        // Log the URL to the console (you can do whatever you want with it)
        console.log("The URL of the iframe is: " + iframeURL);
       }
    
    return (
        <React.Fragment>
            <div className="prompt-bubble-header">
                <div className="prompt-bubble-title">
                    Image Gallery
                </div>
             
                <div className="modal-close-btn" onClick={() => { setOpen(false); }}>
                        <img className="icon-cutomize-close-writter" src={DiscardPopup} alt="file_upload" />
                </div>
             
            </div>
             <div className={focusOnSearch ? "main-tab-search active-search-bar" : "main-tab-search"}>
                    <SearchIcon className="seacrh-icon" />
                    <span className="search-placeholder-text">
                       <input type="text" onKeyDown={fetchSearchedImage} onClick={(e) => {
                            e.stopPropagation()
                            setFocusOnSearch(true)
                        }} onBlur={(e) => {
                            setFocusOnSearch(false);
                        }} className="searcher" ref={designtypeSearch} onChange={inputDesignhandler} placeholder="Search..." />
                    </span>
                </div>
            <InfinityScrollComponent
              allData={galleryData}
              setAllData={setGalleryData}
              setAllList={setGalleryDataList}
              allList={galleryDataList}
              height={`calc(100vh - 196px)`}
              path={sidebarType == 'Ai' ? 
              (inpurSearchImage != '' ?  `/ai-image-translation/stable-diffusion/?search=${inpurSearchImage}&` : `/ai-image-translation/stable-diffusion/?`) 
              :
              sidebarType == 'Design' ? 
              (inpurSearchImage != '' ? `/canvas/designer-list?search=${inpurSearchImage}&` : '/canvas/designer-list?') 
              :
              (inpurSearchImage != '' ? `/canvas/canvas-user-images/?search=${inpurSearchImage}&` : '/canvas/canvas-user-images/?') }
              jsx={imageGallerStructure}
              loader={skeletonLoader}
              show={true}
              hasMore={hasMore}
              setHasMore={setHasMore}
            />
            <div className={"sticky-footer-sidebar-wrapper m-2"} >
                <button className="aiGeneratingButtonFull" onMouseUp={() => {setShowDesigner(true); }} >
                    <div className="generating-button paste-but" style={{ display: "flex", alignItem: "center", gap: "5px" }}>
                        <div className="text-center">
                            Create new
                            {/* {isGenerateLoading && (
                                <div className="save-btn-spinner">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            )}

                            {isGenerateLoading ? "Create new" : toggleState == 2 ? "Create new" : "Create new"} */}
                        </div>
                    </div>
                </button>
            </div>
            {showDesigner && <Rodal
                visible={showDesigner}
                showCloseButton={false}
                className="ai-open-doc-modal designer-iframe"
                onClose={() => console.log()}
            >
                 {/* <Tooltip
            componentsProps={{
                tooltip: {
                    sx: {
                        bgcolor: '#2A2A2A',
                        '& .MuiTooltip-arrow': {
                            color: '#2A2A2A',
                        },
                    },
                },
            }}
            title={'Add image to docment'} placement="top" arrow >
                <div className="modal-save-btn  savebutton" onClick={() => { getUrl() }}>
                        <img  src={Config.HOST_URL + "assets/images/new-ui-icons/image-in-doc.svg"} alt="save_design" />
                </div>
                </Tooltip> */}
            <Tooltip
            componentsProps={{
                tooltip: {
                    sx: {
                        bgcolor: '#2A2A2A',
                        '& .MuiTooltip-arrow': {
                            color: '#2A2A2A',
                        },
                    },
                },
            }}
            title={'Close desiner'} placement="top" arrow >
                   
                <span className="modal-close-btn lang-close" onClick={(e) => { setShowDesigner(false);setDynamicUrl('editor') }}>
                    <img src={CloseBlack} alt="close_black" />
                </span>
                </Tooltip>
                {console.log(Config.DESIGNER_HOST + `/${dynamicUrl}`)}
                <IframeComponent src={Config.DESIGNER_HOST + `/${dynamicUrl}`} height="100%" width="100%"/>
            </Rodal>}
        </React.Fragment>
    );
  };
  
  export default ImageGallery;
  