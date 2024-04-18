import React, { useState, useEffect, lazy, Suspense, useRef } from 'react'
import { 
    Route, 
    Navigate, 
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider
 } from "react-router-dom";
import Config from "../vendor/Config";
import AllTemplateMain from "../vendor/AllTemplateMain";
import Navbar from '../vendor/Navbar';
import { MainAILoader } from '../loader/MainAILoader';
import { useSelector, useDispatch } from "react-redux";
import DefaultGlossaryWorkspace from '../vendor/project-type-selection/glossary-workspace/DefaultGlossaryWorkspace';
import FederalWorkspace from '../federal-news/FederalWorkspace';
import BIReport from '../federal-news/BIReport';
import NewsProjects from '../federal-news/NewsProject';
import { ErrorBoundary } from 'react-error-boundary';

// a function to retry loading a chunk to avoid chunk load error for out of date code
const lazyRetry = function (componentImport) {
    return new Promise((resolve, reject) => {
        // check if the window has already been refreshed
        const hasRefreshed = JSON.parse(
            window.sessionStorage.getItem('retry-lazy-refreshed') || 'false'
        );
        // try to import the component
        componentImport().then((component) => {
            window.sessionStorage.setItem('retry-lazy-refreshed', 'false'); // success so reset the refresh
            resolve(component);
        }).catch((error) => {
            if (!hasRefreshed) { // not been refreshed yet
                window.sessionStorage.setItem('retry-lazy-refreshed', 'true'); // we are now going to refresh
                return window.location.reload(); // refresh the page
            }
            reject(error); // Default error behaviour as already tried refresh
        });
    });
};

// Dynamically import all components
// const Fileupload = lazy(() => lazyRetry(() => import('../vendor/Fileupload')))
// const Dashboard = lazy(() => lazyRetry(() => import('../vendor/Dashboard')))
const AilaysaChat = lazy(() => lazyRetry(() => import('../vendor/ailaysa-chats/AIChat')))
const Workspace = lazy(() => lazyRetry(() => import('../vendor/Workspace')))
const Chat = lazy(() => lazyRetry(() => import('../vendor/chat/Chat')))
const GlossaryWorkspace = lazy(() => lazyRetry(() => import('../vendor/project-type-selection/glossary-workspace/GlossaryWorkspace')))
const Invitation = lazy(() => lazyRetry(() => import('../vendor/Invitation')))
const ProjectSetup = lazy(() => lazyRetry(() => import('../project-setup-components/ProjectSetup')))
const WordchoiceWorkspace = lazy(() => lazyRetry(() => import('../vendor/project-type-selection/wordchoice-workspace/WordchoiceWorkspace')))
// const ProjectManagement = lazy(() => lazyRetry(() => import('../project-setup-components/ProjectManagement')))

const Writter = lazy(() => lazyRetry(() => import('../ailaysa-writer/Writter')))
// const Prompt = lazy(() => lazyRetry(() => import('../ailaysa-writer/prompt')))
const WriterBlog = lazy(() => lazyRetry(() => import('../ailaysa-writer/WriterBlog')))

const AilaysaProjects = lazy(() => lazyRetry(() => import('../vendor/ailaysa-projects/AilaysaProjects')))

const AllRoutes = (props) => {

    const userDetails = useSelector((state) => state.userDetails.value)
    let is_internal_meber_editor = userDetails?.internal_member_team_detail?.role === 'Editor'
    const isFederal = useSelector((state) => state.isFederalNews.value)
    const isDinamalar = useSelector((state) => state.isDinamalarNews.value)
    let isEnterprise = userDetails?.is_enterprise


    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>

                <Route exact path="/chat-books" element={<Suspense fallback={<MainAILoader />}><AilaysaChat /></Suspense>} />
                
                <Route exact path="/file-upload" element={<Suspense fallback={<MainAILoader />}><AilaysaProjects /></Suspense>} />
                <Route exact path="/documents-list" element={<Suspense fallback={<MainAILoader />}><AilaysaProjects /></Suspense>} />
                <Route exact path="/translations" element={<Suspense fallback={<MainAILoader />}><AilaysaProjects /></Suspense>} />
                <Route exact path="/transcriptions" element={<Suspense fallback={<MainAILoader />}><AilaysaProjects /></Suspense>} />
                <Route exact path="/ai-voices" element={<Suspense fallback={<MainAILoader />}><AilaysaProjects /></Suspense>} />
                <Route exact path="/assets" element={<Suspense fallback={<MainAILoader />}><AilaysaProjects /></Suspense>} />
                <Route exact path="/designs" element={<Suspense fallback={<MainAILoader />}><AilaysaProjects /></Suspense>} />
                
                {!is_internal_meber_editor && (
                    <Route exact path="/toolkit" element={<Suspense fallback={<MainAILoader />}><AilaysaProjects /></Suspense>} />
                )}

                {/* Federal News Project */}
                {/* get story route */}
                {(isFederal && !is_internal_meber_editor) && (
                    <Route exact path="/all-stories" element={<Suspense fallback={<MainAILoader />}><NewsProjects /></Suspense>} />
                )}
                {/* my story project route */}
                {(isFederal || isDinamalar) && (
                    <Route exact path="/my-stories" element={<Suspense fallback={<MainAILoader />}><NewsProjects /></Suspense>} />
                )}
                
                <Route exact path="/default-glossary-workspace" element={<Suspense fallback={<MainAILoader />}><DefaultGlossaryWorkspace /></Suspense>} />
                
                {/* <Route exact path="/wordchoice-workspace/:projectId" element={<Suspense fallback={<MainAILoader />}><WordchoiceWorkspace /></Suspense>} />
                <Route exact path="/wordchoice-workspace/:projectId/:taskId" element={<Suspense fallback={<MainAILoader />}><WordchoiceWorkspace /></Suspense>} /> */}

                <Route exact path="/accept/:uid/:token" element={<Invitation />} />
                <Route exact path="/confirm/:uid/:token" element={<Invitation />} />

                <Route exact path="/workspace" element={<Suspense fallback={<MainAILoader />}><Workspace /></Suspense>} />
                <Route exact path="/workspace/:documentId" element={<Suspense fallback={<MainAILoader />}><Workspace /></Suspense>} />
                <Route exact path="/news-workspace" element={<Suspense fallback={<MainAILoader />}><FederalWorkspace /></Suspense>} />
                <Route exact path="/news-workspace/:documentId" element={<Suspense fallback={<MainAILoader />}><FederalWorkspace /></Suspense>} />
                <Route exact path="/chat" element={<Suspense fallback={<MainAILoader />}><Chat /></Suspense>} />
                <Route exact path="/glossary-workspace" element={<Suspense fallback={<MainAILoader />}><GlossaryWorkspace /></Suspense>} />
                <Route exact path="/writer-blog" element={<Suspense fallback={<MainAILoader />}><WriterBlog /></Suspense>} />
                <Route exact path="/writer-blog/:steps" element={<Suspense fallback={<MainAILoader />}><WriterBlog /></Suspense>} />
                {/* conditional routing for writer */}
                {
                    Config.userState?.internal_member_team_detail?.role !== 'Editor' ?
                        <Route path="/word-processor" element={<ErrorBoundary onError={(err) => console.log(err)} fallback={<p>Something went wrong. Try again later.</p>}><Suspense fallback={<MainAILoader />}><Writter /></Suspense></ErrorBoundary>} />
                        :
                        <Route path="/word-processor" render={() => (Config.userState?.internal_member_team_detail?.role == 'Editor' && location.search != '') ? <ErrorBoundary onError={(err) => console.log(err)} fallback={<p>Something went wrong. Try again later.</p>}><Suspense fallback={<MainAILoader />}><Writter /></Suspense></ErrorBoundary> : <Navigate to="/" />} />
                }
                {/* this condition will only allow non-internal editor to access the word-processor - this is a supporting route for blog article generation */}
                {
                    Config.userState?.internal_member_team_detail?.role !== 'Editor' &&
                    <Route path="/word-processor/:category" element={<ErrorBoundary onError={(err) => console.log(err)} fallback={<p>Something went wrong. Try again later.</p>}><Suspense fallback={<MainAILoader />}><Writter /></Suspense></ErrorBoundary>} />
                }
                
                {/* conditional routing for co-author */}
                {
                    Config.userState?.internal_member_team_detail?.role !== 'Editor' ?
                        <Route path="/book-writing" element={<ErrorBoundary onError={(err) => console.log(err)} fallback={<p>Something went wrong. Try again later.</p>}><Suspense fallback={<MainAILoader />}><Writter /></Suspense></ErrorBoundary>} />
                        :
                        <Route path="/book-writing" render={() => (Config.userState?.internal_member_team_detail?.role == 'Editor' && location.search != '') ? <ErrorBoundary onError={(err) => console.log(err)} fallback={<p>Something went wrong. Try again later.</p>}><Suspense fallback={<MainAILoader />}><Writter /></Suspense></ErrorBoundary> : <Navigate to="/" />} />
                }
                {/* this condition will only allow non-internal editor to access the word-processor - this is a supporting route for blog article generation */}
                {
                    Config.userState?.internal_member_team_detail?.role !== 'Editor' &&
                    <Route path="/book-writing/:category" element={<ErrorBoundary onError={(err) => console.log(err)} fallback={<p>Something went wrong. Try again later.</p>}><Suspense fallback={<MainAILoader />}><Writter /></Suspense></ErrorBoundary>} />
                }

                <Route exact path="/report" element={<Suspense fallback={<MainAILoader />}><BIReport /></Suspense>} />

                {!is_internal_meber_editor && (
                    <>
                        <Route exact path="/create/:category/:menu" element={<Suspense fallback={<MainAILoader />}><ProjectSetup /></Suspense>} />
                        <Route exact path="/create/:category/:menu/:action" element={<Suspense fallback={<MainAILoader />}><ProjectSetup /></Suspense>} />
                    </>
                )}
                
                {Config.userState?.internal_member_team_detail?.role != 'Editor' && <Route exact path="/create/:category" element={<Suspense fallback={<MainAILoader />}><ProjectSetup /></Suspense>} />}
                

                {isEnterprise === false ? (
                    is_internal_meber_editor ? (
                        <Route path="*" element={<Navigate to="/file-upload"/>} />
                    ) : (
                        <Route path="*" element={<Navigate to="/create/all-templates"/>} />
                    )
                ) : (
                    isDinamalar ? (
                        <Route path="*" element={<Navigate to="/my-stories?page=1"/>} />
                    ) : (
                        <Route path="*" element={<Navigate to="/all-stories?page=1"/>} />
                    )
                )}

                {!is_internal_meber_editor && (
                    isEnterprise === false ? (
                        <Route path="/" element={<Navigate to="/create/all-templates"/>} />
                    ) : (
                        isDinamalar ? (
                            <Route path="/" element={<Navigate to="/my-stories?page=1"/>} />
                        ) : (
                            <Route path="/" element={<Navigate to="/all-stories?page=1"/>} />
                        )
                    )
                )}

            </Route>
        )
    )

    return (
        <Suspense fallback={<MainAILoader />}>
            <RouterProvider router={router} />
        </Suspense>
    )
}

export default AllRoutes