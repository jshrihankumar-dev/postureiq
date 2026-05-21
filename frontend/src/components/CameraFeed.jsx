import { useEffect, useRef, useState } from "react";
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils
} from "@mediapipe/tasks-vision";
import { analyzePosture } from "../lib/postureAnalysis";

export default function CameraFeed({
  onResults,
  onCameraActiveChange,
  onAnalyzingChange
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);
  const landmarkerRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(false);

  function stopCamera() {
    setCameraActive(false);
    onCameraActiveChange(false);
    onAnalyzingChange(false);

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (landmarkerRef.current) {
      landmarkerRef.current.close();
      landmarkerRef.current = null;
    }
  }

  useEffect(() => {
    if (!cameraActive) {
      return;
    }

    async function startCameraAndPose() {
      try {
        onCameraActiveChange(true);
        onAnalyzingChange(true);

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
          video: { width: 640, height: 480 }
        });

        streamRef.current = stream;
        video.srcObject = stream;
        await video.play();

        function renderLoop() {
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 480;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.save();
          ctx.scale(-1, 1);
          ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
          ctx.restore();

          const results = poseLandmarker.detectForVideo(
            video,
            performance.now()
          );

          if (results.landmarks && results.landmarks.length > 0) {
            onAnalyzingChange(false);

            const landmarks = results.landmarks[0];

            ctx.save();
            ctx.scale(-1, 1);
            ctx.translate(-canvas.width, 0);

            drawingUtils.drawConnectors(
              landmarks,
              PoseLandmarker.POSE_CONNECTIONS,
              { color: "#14b8a6", lineWidth: 4 }
            );

            drawingUtils.drawLandmarks(landmarks, {
              color: "#a855f7",
              lineWidth: 2,
              radius: 5
            });

            ctx.restore();

            onResults(analyzePosture(landmarks));
          }

          animationRef.current = requestAnimationFrame(renderLoop);
        }

        renderLoop();
      } catch (error) {
        console.error("Camera or MediaPipe failed:", error);
        onCameraActiveChange(false);
        onAnalyzingChange(false);
      }
    }

    startCameraAndPose();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [cameraActive, onResults, onCameraActiveChange, onAnalyzingChange]);

  return (
    <div className="relative h-[520px] overflow-hidden rounded-3xl border border-teal-500/20 bg-black shadow-2xl shadow-teal-950/40">
      <video ref={videoRef} playsInline muted style={{ display: "none" }} />

      <canvas ref={canvasRef} className="h-full w-full bg-black object-cover" />

      <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-sm font-medium text-teal-300 backdrop-blur">
        Live Pose Camera
      </div>

      {!cameraActive ? (
        <button
          type="button"
          onClick={() => setCameraActive(true)}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-teal-400 px-8 py-4 text-lg font-black text-black shadow-xl shadow-teal-500/30 transition hover:bg-teal-300"
        >
          Start Camera
        </button>
      ) : (
        <button
          type="button"
          onClick={stopCamera}
          className="absolute right-5 top-5 rounded-xl bg-red-500 px-5 py-2 font-bold text-white shadow-lg transition hover:bg-red-400"
        >
          Stop
        </button>
      )}
    </div>
  );
}