import { formatMinutes, formatSeconds } from "./utils/TimeFormat";
import ButtonBase from '@mui/material/ButtonBase';
import MicIcon from '@mui/icons-material/Mic';
import { useTranslation } from "react-i18next";

export default function RecorderControls({ recorderState, handlers }) {
  const { t } = useTranslation();
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;

  return (
    <div className="speech-text-controls-container">
      <div className="speech-text-recorder-display">
        <div className="speech-text-start-button-container">
            {initRecording ? (
            <ButtonBase
                className="speech-text-start-button"
                title={t("save_recording")}
                disabled={recordingSeconds === 0}
                onClick={saveRecording}
            >
                <span className="recording"></span>
            </ButtonBase>
            ) : (
            <ButtonBase className="speech-text-start-button" title={t("start_recording")} onClick={startRecording}>
                <MicIcon className="mic-icon" />
            </ButtonBase>
            )}
        </div>
        <div className="speech-text-recording-time">
            {
                initRecording ? 
                    <>
                        <span>{formatMinutes(recordingMinutes)}</span>
                        <span>:</span>
                        <span>{formatSeconds(recordingSeconds)}</span>
                    </>
                    :
                    <span>{t("record_your_audio")}<span className="asterik-symbol">*</span></span>
            }
        </div>
        {/* {initRecording && (
          <div className="cancel-button-container">
            <button className="cancel-button" title="Cancel recording" onClick={cancelRecording}>
              cancel
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
}