import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


const ControlPanel = (props) => {
  const { file, pageNumber, numPages, setPageNumber, scale, setScale } = props;

  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;

  const firstPageClass = isFirstPage ? 'disabled' : 'clickable';
  const lastPageClass = isLastPage ? 'disabled' : 'clickable';


  const scroll = (element) => {
    document.querySelector(`.page-${element}`)?.scrollIntoView({ behavior: "smooth",block: 'start',
    inline: 'center' });
  }

  const goToFirstPage = () => {
    if (!isFirstPage) setPageNumber(1);
    scroll(1)

  };
  const goToPreviousPage = () => {
    if (!isFirstPage) setPageNumber(pageNumber - 1);
    scroll(pageNumber - 1)

  };
  const goToNextPage = () => {
    if (!isLastPage) setPageNumber(pageNumber + 1);
    scroll(pageNumber + 1)

  };
  const goToLastPage = () => {
    if (!isLastPage) setPageNumber(numPages);
    scroll(numPages)

  };

  const onPageChange = (e) => {
    const { value } = e.target;
    setPageNumber(Number(value));
    scroll(value)


  };

  const isMinZoom = scale < 0.6;
  const isMaxZoom = scale >= 2.0;

  const zoomOutClass = isMinZoom ? 'disabled' : 'clickable';
  const zoomInClass = isMaxZoom ? 'disabled' : 'clickable';

  const zoomOut = () => {
    if (!isMinZoom) setScale(scale - 0.1);
  };

  const zoomIn = () => {
    if (!isMaxZoom) setScale(scale + 0.1);
  };

  return (
    <div className="control-panel m-3 d-flex align-items-baseline justify-content-between">
      <div className="d-flex justify-content-between align-items-baseline">
        <i
          className={`fas fa-fast-backward mx-3 ${firstPageClass} zoom-in-button`}
          onClick={goToFirstPage}
        />
        <i
          className={`fas fa-backward mx-3 ${firstPageClass} zoom-in-button`}
          onClick={goToPreviousPage}
        />
        <span style={{whiteSpace: 'nowrap'}}>
          Page{' '}
          <input
            name="pageNumber"
            type="number"
            style={{textAlign: 'center'}}
            min={1}
            max={numPages || 1}
            className="p-0 pl-1 mx-2"
            value={pageNumber}
            onChange={onPageChange}
          />{' '}
          of {numPages}
        </span>
        <i
          className={`fas fa-forward mx-3 ${lastPageClass} zoom-in-button`}
          onClick={goToNextPage}
        />
        <i
          className={`fas fa-fast-forward mx-3 ${lastPageClass} zoom-in-button`}
          onClick={goToLastPage}
        />
      </div>
      <div className="d-flex justify-content-between align-items-baseline">
        <i
          className={`fas fa-search-minus mx-3 ${zoomOutClass} zoom-in-button`}
          onClick={zoomOut}
        />
        <span>{(scale * 100).toFixed()}%</span>
        <i
          className={`fas fa-search-plus mx-3 ${zoomInClass} zoom-in-button`}
          onClick={zoomIn}
        />
      </div>
      <FormGroup>
          <FormControlLabel control={<Switch checked={props.showScroll} onChange={() => props.setShowScroll(!props.showScroll)} />} label="Scrollbar" />
      </FormGroup>
    </div>
  );
};

export default ControlPanel;
