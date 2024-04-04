import React from 'react'
import { compare } from 'compare-versions';
import { useEffect } from 'react';

export const CacheBuster = (props) => {
    
    let {
        currentVersion,
        isEnabled,
        metaFileDirectory
    } = props;

    useEffect(() => {
      isEnabled ? checkCacheStatus() : console.log('Cache Busting is disabled');
    }, [])
    

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
    
            console.log('The cache has been deleted.');
            window.location.reload(true);
          }
        } catch (error) {
          console.log('An error occurred while deleting the cache.', true);
          console.log(error, true);
        }
    };

    const checkCacheStatus = async () => {
        try {
          const res = await fetch(`${getMetaFileDirectory()}/meta.json`);
          const { version: metaVersion } = await res.json();
            
          console.log(metaVersion);
          console.log(currentVersion);
          
          const shouldForceRefresh = isThereNewVersion(metaVersion, currentVersion);
          if (shouldForceRefresh) {
            console.log(`There is a new version (v${metaVersion}). Should force refresh.`);
            refreshCacheAndReload()
          } else {
            console.log('There is no new version. No cache refresh needed.');
          }
        } catch (error) {
          console.log('An error occurred while checking cache status.', true);
          console.log(error, true);
        }
    };

    return (
      <></>
    // <div>CacheBuster</div>
  )
}
