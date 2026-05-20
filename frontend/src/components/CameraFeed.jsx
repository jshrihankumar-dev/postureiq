import { useEffect, useRef, useState } from "react";
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { analyzePosture } from "../lib/postureAnalysis";

export default function CameraFeed({ onResults }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    if (!cameraActive) {
      return;
    }

    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      }
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    pose.onResults((results) => {
      if (!results.image) {
        return;
      }

      canvasElement.width = results.image.width;
      canvasElement.height = results.image.height;

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      if (results.poseLandmarks) {
        const visibleLandmarks = results.poseLandmarks.filter((landmark) => {
          return landmark.visibility > 0.5;
        });

        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
          color: "#00ff66",
          lineWidth: 4
        });

        drawLandmarks(canvasCtx, visibleLandmarks, {
          color: "#ff2dff",
          lineWidth: 2,
          radius: 5
        });

        const analysisResult = analyzePosture(results.poseLandmarks);

        if (onResults) {
          onResults(analysisResult);
        }
      }

      canvasCtx.restore();
    });

    cameraRef.current = new Camera(videoElement, {
      onFrame: async () => {
        await pose.send({ image: videoElement });
      },
      width: 640,
      height: 480
    });

    cameraRef.current.start();

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
    };
  }, [cameraActive, onResults]);

  return (
    <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black">
      <video ref={videoRef} className="hidden" playsInline />

      <canvas
        ref={canvasRef}
        className="w-full scale-x-[-1]"
      />

      {!cameraActive && (
        <button
          type="button"
          onClick={() => setCameraActive(true)}
          className="absolute left-1/2 top-1/2 rounded-xl bg-white px-6 py-3 font-semibold text-black shadow-lg"
        >
          Start Camera
        </button>
      )}
    </div>
  );
}