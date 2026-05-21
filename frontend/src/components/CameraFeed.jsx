import { useEffect, useRef, useState } from "react";
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils
} from "@mediapipe/tasks-vision";

import { analyzePosture } from "../lib/postureAnalysis";

export default function CameraFeed({ onResults }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);
  const landmarkerRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    if (!cameraActive) {
      return;
    }

    async function startCameraAndPose() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numPoses: 1
        });

        landmarkerRef.current = poseLandmarker;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const drawingUtils = new DrawingUtils(ctx);

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 640,
            height: 480
          }
        });

        streamRef.current = stream;

        video.srcObject = stream;

        await video.play();

        function renderLoop() {
          if (!video.videoWidth || !video.videoHeight) {
            animationRef.current =
              requestAnimationFrame(renderLoop);

            return;
          }

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          ctx.save();

          ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
          );

          ctx.scale(-1, 1);

          ctx.drawImage(
            video,
            -canvas.width,
            0,
            canvas.width,
            canvas.height
          );

          ctx.restore();

          const results =
            poseLandmarker.detectForVideo(
              video,
              performance.now()
            );

          if (
            results.landmarks &&
            results.landmarks.length > 0
          ) {
            const landmarks = results.landmarks[0];

            ctx.save();

            ctx.scale(-1, 1);

            ctx.translate(-canvas.width, 0);

            drawingUtils.drawConnectors(
              landmarks,
              PoseLandmarker.POSE_CONNECTIONS,
              {
                color: "#00ff66",
                lineWidth: 4
              }
            );

            drawingUtils.drawLandmarks(
              landmarks,
              {
                color: "#ff2dff",
                lineWidth: 2,
                radius: 5
              }
            );

            ctx.restore();

            const analysisResult =
              analyzePosture(landmarks);

            if (onResults) {
              onResults(analysisResult);
            }
          }

          animationRef.current =
            requestAnimationFrame(renderLoop);
        }

        renderLoop();
      } catch (error) {
        console.error(
          "Camera or MediaPipe failed:",
          error
        );
      }
    }

    startCameraAndPose();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => {
            track.stop();
          });
      }

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }
    };
  }, [cameraActive, onResults]);

  return (
    <div className="relative h-[480px] w-full max-w-3xl overflow-hidden rounded-2xl bg-black">
      <video
        ref={videoRef}
        playsInline
        muted
        style={{ display: "none" }}
      />

      <canvas
        ref={canvasRef}
        className="h-full w-full bg-black"
      />

      {!cameraActive && (
        <button
          type="button"
          onClick={() => setCameraActive(true)}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white px-6 py-3 font-semibold text-black shadow-lg"
        >
          Start Camera
        </button>
      )}
    </div>
  );
}