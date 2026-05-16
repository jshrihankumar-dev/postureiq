// Calculates angle between three points
export function calculateAngle(a, b, c) {
  const radians =
    Math.atan2(c.y - b.y, c.x - b.x) -
    Math.atan2(a.y - b.y, a.x - b.x);

  let angle = Math.abs((radians * 180) / Math.PI);

  if (angle > 180) {
    angle = 360 - angle;
  }

  return angle;
}

//Defines the landmarks
export function analyzePosture(landmarks) {
    const leftEar = landmarks[7]
    const rightEar = landmarks[8]
    const leftShoulder = landmarks[11]
    const rightShoulder = landmarks[12]
    const leftHip = landmarks[23]
    const rightHip = landmarks[24]
}
// Midpoint functions
const earMid = {
  x: (leftEar.x + rightEar.x) / 2,
  y: (leftEar.y + rightEar.y) / 2
}

const shoulderMid = {
  x: (leftShoulder.x + rightShoulder.x) / 2,
  y: (leftShoulder.y + rightShoulder.y) / 2
}

const hipMid = {
  x: (leftHip.x + rightHip.x) / 2,
    y: (leftHip.y + rightHip.y) / 2
}

//Stores issues and deductions for the posture analysis
const issues = []
let deductions = 0  

//Calculating the forward head
const neckAngle = calculateAngle(earMid, shoulderMid, hipMid)

if (neckAngle < 145) {
    
}