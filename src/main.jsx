import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from "react-router-dom";
import App from './App';

import "../src/assets/css/style.css";
import "../src/assets/css/responsive.css";
import "../src/assets/css/language_support_styles.css";
import "../src/assets/css/custom.css";
import "../src/assets/fonts/fontawesome-free-5.13.1-web/css/all.min.css";
import "../src/assets/library/bootstrap-4.5.3-dist/bootstrap-4.5.3-dist/css/bootstrap.min.css";
// import "../src/assets/js/jquery-3.5.1.min.js";
// // import "../src/assets/js/ws-ui.js";
// import "../src/assets/library/bootstrap-4.5.3-dist/bootstrap-4.5.3-dist/js/bootstrap.min.js";


// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import WriterDialogToggleReducer from './features/WriterDialogToggleSlice';
import customizationSettingsReducer from './features/CustomizationSettingsSlice';
import blogCreationReducer from './features/BlogCreationSlice'
import fileDownloadingListReducer from './features/FileDownloadingListSlice'
import userDetailsReducer from './features/UserDetailsSlice'
import projectStepsReducer from './features/ProjectStepsSlice'
import currencyOptionReducer from './features/CurrencyOptionSlice'
import unitTypeOptionReducer from './features/UnitTypeOptionSlice'
import showCustomSettingsModalReducer from './features/ShowCustomSettingsModalSlice'
import mtEngineOptionReducer from './features/MtEngineOptionSlice'
import editorSettingStatusReducer from './features/EditorSettingStatusSlice'
import editorSettingsAlertModalReducer from './features/EditorSettingsAlertModalSlice'
import languageOptionReducer from './features/LanguageOptionSlice'
import campaignCouponStripReducer from './features/CampaignCouponStripSlice'
import globalTransitionReducer from './features/GlobalTransitionSlice'
import allTemplateListReducer from './features/AllTempateListSlice'
import individualTemplateListReducer from './features/IndividualTemplateListSlice'
import { writerReducers } from './features/writer-reducers/writerReducers';
import IsFederalNewsReducer from './features/IsFederalNewsSlice';
import IsDinamalarNewsReducer from './features/IsDinamalarNewsSlice';
import * as Sentry from "@sentry/react";

const store = configureStore({
  reducer: {
	writerDialog: WriterDialogToggleReducer,
	customizationSetting: customizationSettingsReducer,
	blogCreationRes: blogCreationReducer,
	fileDownloadingList: fileDownloadingListReducer,
	userDetails: userDetailsReducer,
	projectSteps: projectStepsReducer,
	currencyOptions: currencyOptionReducer,
	unitTypeOptions: unitTypeOptionReducer,
	showCustomSettingsModal: showCustomSettingsModalReducer,
	mtEngineOptions: mtEngineOptionReducer,
	editorSettingStatus: editorSettingStatusReducer,
	editorSettingsAlertModal: editorSettingsAlertModalReducer,
	languageOptionsList: languageOptionReducer,
	campaignCouponStrip: campaignCouponStripReducer,
	globalTransition: globalTransitionReducer,
	allTemplateList: allTemplateListReducer,
	individualTemplateList: individualTemplateListReducer,
	isFederalNews: IsFederalNewsReducer,
	isDinamalarNews: IsDinamalarNewsReducer,
	...writerReducers        
  }
})

Sentry.init({
	dsn: import.meta.env.VITE_APP_SENTRY_DSN,
	integrations: [
	  Sentry.browserTracingIntegration(),
	  Sentry.replayIntegration(),
	],
	// Performance Monitoring
	tracesSampleRate: 1.0, //  Capture 100% of the transactions
	// Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
	tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
	// Session Replay
	replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
	replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

i18n.use(initReactI18next) // passes i18n down to react-i18next
	.use(LanguageDetector)
	.use(HttpApi)
	.init({
		supportedLngs: ["en", "es", "ch", "fr", "ar", "hi", "ta"],
		fallbackLng: "en",
		detection: {
			order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
			caches: ["cookie"],
		},
		backend: {
			loadPath: "/locales/{{lng}}/translation.json",
		},
		react: { useSuspense: false },
	});

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
	{/* <BrowserRouter> */}
		<Provider store={store}>
			<App />
		</Provider>
	{/* </BrowserRouter> */}
  </>,
)
