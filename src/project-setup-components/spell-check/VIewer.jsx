import React, { useCallback, useEffect, useRef, useState } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

const VIewer = (props) => {
    const { pdf,} = props;

    const docs = [
        // { uri: pdfData }, // Remote file
        { uri: pdf }, // Local File        
    ];
  
    return (
        <section className="pdf-view-main-wrapper">
            <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />          
        </section>
    );
};
export default VIewer;