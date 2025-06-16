import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Config from "../../Config";
import { useNavigate } from "react-router-dom";

const style = {
  overflowX: "hidden",
};

const InfinityScrollComponent = (props) => {

  const {
    allData,
    setAllData,
    allList,
    setAllList,
    path,
    height,
    jsx,
    show,
    loader,
    setHasMore,
    hasMore
  } = props;
  // const [hasMore, setHasMore] = useState(true);
//   const js = 

const getMorePost = async () => {
  if (allList.next == null) {
    setHasMore(false);
    return;
  }
  const url = new URL(allList.next);
  const searchParams = url.searchParams;
  let page = searchParams.get('page');

  Config.axios({
    url:  Config.BASE_URL + `${path}page=${page}`,
    method: "GET",
    auth: true,
    success: (response) => {
        setAllList(response.data);
        setAllData((post) => [...post, ...response.data.results]);
    },
    error: (err) => {
        console.error(err);
        Config.toast('Something went wrong', 'error');
    },
});
};

  return (
    <div className="template-list-sizes-wrapper-main">
      <InfiniteScroll
        dataLength={allData?.length ? allData?.length : 0 }
        next={getMorePost}
        style={style}
        hasMore={hasMore}
        loader={
         hasMore && loader
      }
        height={height}
        endMessage={
        //   <p style={{ textAlign: "center" }}>
        //     <b>Yay! You have seen it all</b>
        //   </p>\
        <></>
        }
      >
        {jsx}
      </InfiniteScroll>
    </div>
  );
};

export default InfinityScrollComponent;
