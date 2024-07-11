import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "react-pdf/dist/esm/Page/TextLayer.css";
import ControlPanel from './ControlPanel';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;


const PDFViewer = (props) => {

    const {
        pdf,
        width,
        page,
        setPage,
        handleMouseUp,
   
    } = props

    const [pdfData, setPdfData] = useState(null)
    const canvasRef = useRef();

    const [numPages, setNumPages] = useState(0);
    const [showScroll, setShowScroll] = useState(false)

    const pageRefs = useRef({});

    const [scale, setScale] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    // const onItemClick = ({ pageNumber }) => {
    //     pageRefs.current[pageNumber].scrollIntoView({ behavior: 'smooth' });
    // }
    const onDocumentLoadSuccess = (numPages) => {
        console.log(numPages._pdfInfo.numPages)
        setNumPages(numPages._pdfInfo.numPages);
    }
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
                    // "Access-Control-Expose-Headers": "Content-Disposition",
                    // Authorization: `Bearer ${token}`, // add authentication information as required by the backend APIs.
                },
            }
        );
    };

    const handleDownloadTemplate = async () => {
        let url = pdf
        console.log(url)
        const response = await downloadFileFromApi(url);
        const filename = response.headers['content-disposition']?.split('filename=')[1];
        const blob_url = URL.createObjectURL(new Blob([response.data]));
        setPdfData(blob_url)
    }


    const pdfURL = pdf;

    useEffect(() => {

        if (pdf != null) {
            handleDownloadTemplate()
        }

    }, [pdf])


    const [searchText, setSearchText] = useState(``);

    function highlightPattern(text, pattern) {
        return text.replace(pattern, (value) => `<mark>${value}</mark>`);
    }


    const textRenderer = useCallback(
        (textItem) => highlightPattern(textItem.str, searchText),
        [searchText]
    );

    const handleCreate = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // // Drawing rectangle
        // ctx.fillStyle = 'blue'; // Fill color
        // ctx.fillRect(50, 50, 100, 75); // x, y, width, height

        // Optionally, you can add a stroke
        ctx.strokeStyle = 'black'; // Stroke color
        ctx.lineWidth = 2; // Stroke width
        ctx.strokeRect(69.357, 261.176, 140.699, 272.927); // x, y, width, height
    }


    const pdfref = useRef();
    const hasScrollBar = (element, direction) => {
        if (direction === 'vertical') {
            return element?.scrollHeight > element?.clientHeight;
        } else if (direction === 'horizontal') {

            return element?.scrollWidth > element?.clientWidth;
        }
        return false;
    };

    const hasScrollBarX = hasScrollBar(document.querySelector('.pdf-page'), 'horizontal');
    console.log(hasScrollBarX)



    return (
        <section className="pdf-view-main-wrapper">
            <div>
                <ControlPanel
                    scale={scale}
                    setScale={setScale}
                    numPages={numPages}
                    pageNumber={page}
                    setPageNumber={setPage}
                    setShowScroll={setShowScroll}
                    showScroll={showScroll}
                />
            
            </div>
           


            <Document onMouseUp={handleMouseUp} ref={pdfref} className={`pdf-page ${hasScrollBarX ? 'hasScroll' : ''}`} file={pdfData} onLoadSuccess={onDocumentLoadSuccess}  >
                <>


                </>

                {showScroll ? (
                    <>
                        {Array(...Array(numPages))
                            .map((x, i) => i + 1)
                            .map(page => (
                                <Page
                                    pageNumber={page}
                                    scale={scale}
                                    className={`page-${page}`}
                                    // onGetTextSuccess={
                                    //     (text) => console.log(text)
                                    // }
                                    //   width={width}
                                    renderTextLayer={true}
                                    canvasRef={canvasRef}
                                    customTextRenderer={textRenderer}
                                    onGetTextSuccess={({ items }) => console.log("onGetTextSuccess", items)}
                                    loading="Loading page…"
                                />
                            ))}
                    </>
                ) : (
                    <Page
                        pageNumber={page}
                        scale={scale}
                        className={`page-${page}`}
                        // onGetTextSuccess={
                        //     (text) => console.log(text)
                        // }
                        //   width={width}
                        renderTextLayer={true}
                        canvasRef={canvasRef}
                        customTextRenderer={textRenderer}
                        onGetTextSuccess={({ items }) => console.log("onGetTextSuccess", items)}
                        loading="Loading page…"
                    />
                )

                }

            </Document>
        </section>
    );
};
export default PDFViewer;