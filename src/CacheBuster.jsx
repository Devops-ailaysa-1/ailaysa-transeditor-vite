import React from 'react'
import { compare } from 'compare-versions';
import { useEffect } from 'react';

export const CacheBuster = (props) => {    
    let {currentVersion, isEnabled,  metaFileDirectory  } = props;

    useEffect(() => {
      isEnabled ? checkCacheStatus() : console.log('Cache Busting is disabled');
    }, []);
    
    const getMetaFileDirectory = () => {
        return !metaFileDirectory || metaFileDirectory === '.'
          ? ''
          : metaFileDirectory;
    };

    const isThereNewVersion = (metaVersion, currentVersion) => {
        return compare(metaVersion, currentVersion, '>');
    };
    
    const refreshCacheAndReload = async () => {
        try {
          if (window?.caches) {
            const { caches } = window;
            const cacheNames = await caches.keys();
            const cacheDeletionPromises = cacheNames.map((n) => caches.delete(n));    
            await Promise.all(cacheDeletionPromises);
            window.location.reload(true);
          }
        } catch (error) {
          console.error(error, true);
        }
    };

    const checkCacheStatus = async () => {
        try {
          const res = await fetch(`${getMetaFileDirectory()}/meta.json`);
          const { version: metaVersion } = await res.json();
          
          const shouldForceRefresh = isThereNewVersion(metaVersion, currentVersion);
          if (shouldForceRefresh) {
            refreshCacheAndReload()
          } else {
          }
        } catch (error) {
          // console.error(error, true);
        }
    };

    return (
      <></>
    // <div>CacheBuster</div>
  )
}
