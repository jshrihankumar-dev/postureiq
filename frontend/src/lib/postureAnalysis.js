const scoreBuffer = [];
const BUFFER_SIZE = 8;

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

// Defines the landmarks
export function analyzePosture(landmarks) {
  const leftEar = landmarks[7];
  const rightEar = landmarks[8];

  const leftShoulder = landmarks[11];
  const rightShoulder = landmarks[12];

  const leftHip = landmarks[23];
  const rightHip = landmarks[24];

  // Midpoint functions
  const earMid = {
    x: (leftEar.x + rightEar.x) / 2,
    y: (leftEar.y + rightEar.y) / 2
  };

  const shoulderMid = {
    x: (leftShoulder.x + rightShoulder.x) / 2,
    y: (leftShoulder.y + rightShoulder.y) / 2
  };

  const hipMid = {
    x: (leftHip.x + rightHip.x) / 2,
    y: (leftHip.y + rightHip.y) / 2
  };

  // Stores issues and deductions for posture analysis
  const issues = [];
  let deductions = 0;

  // Calculate forward head posture
  const neckAngle = calculateAngle(earMid, shoulderMid, hipMid);

  if (neckAngle < 145) {
    issues.push({
      key: "forward_head",
      label: "Forward Head Posture",
      severity: "severe"
    });

    deductions -= 25;
  } else if (neckAngle < 160) {
    issues.push({
      key: "forward_head",
      label: "Forward Head Posture",
      severity: "mild"
    });

    deductions -= 10;
  }

  // Calculate rounded shoulders
  const shoulderWidth = Math.abs(leftShoulder.x - rightShoulder.x);

  const leftRounding = Math.abs(leftEar.x - leftShoulder.x);

  const rightRounding = Math.abs(rightEar.x - rightShoulder.x);

  const avgRounding =
    (leftRounding + rightRounding) / 2 / shoulderWidth;

  if (avgRounding > 0.3) {
    issues.push({
      key: "rounded_shoulders",
      label: "Rounded Shoulders",
      severity: "severe"
    });

    deductions -= 20;
  } else if (avgRounding > 0.15) {
    issues.push({
      key: "rounded_shoulders",
      label: "Rounded Shoulders",
      severity: "mild"
    });

    deductions -= 10;
  }

  // Calculate uneven shoulders
  const shoulderDiff = Math.abs(
    leftShoulder.y - rightShoulder.y
  );

  if (shoulderDiff > 0.05) {
    issues.push({
      key: "uneven_shoulders",
      label: "Uneven Shoulders",
      severity: "severe"
    });

    deductions -= 15;
  } else if (shoulderDiff > 0.025) {
    issues.push({
      key: "uneven_shoulders",
      label: "Uneven Shoulders",
      severity: "mild"
    });

    deductions -= 5;
  }

  // Calculate lateral lean
  const lateralLean = Math.abs(
    shoulderMid.x - hipMid.x
  );

  if (lateralLean > 0.06) {
    issues.push({
      key: "lateral_lean",
      label: "Lateral Lean",
      severity: "severe"
    });

    deductions -= 15;
  } else if (lateralLean > 0.03) {
    issues.push({
      key: "lateral_lean",
      label: "Lateral Lean",
      severity: "mild"
    });

    deductions -= 5;
  }

  // Calculate hunched back
  const spineAngle = calculateAngle(
    hipMid,
    shoulderMid,
    earMid
  );

  if (spineAngle < 140) {
    issues.push({
      key: "hunched_back",
      label: "Hunched Back",
      severity: "severe"
    });

    deductions -= 20;
  } else if (spineAngle < 155) {
    issues.push({
      key: "hunched_back",
      label: "Hunched Back",
      severity: "mild"
    });

    deductions -= 8;
  }

  // Final score calculation
  const rawScore = Math.max(
    0,
    Math.min(100, 100 + deductions)
  );

  const score = smoothScore(rawScore);

  let grade;
  let gradeClass;
  
  if (score >= 90) {
    grade = "Excellent";
    gradeClass = "excellent";
  } else if (score >= 75) {
    grade = "Good";
    gradeClass = "good";
  } else if (score >= 55) {
    grade = "Fair";
    gradeClass = "fair";
  } else {
    grade = "Poor";
    gradeClass = "poor";
  }

  return {
    score,
    grade,
    gradeClass,
    issues,

    angles: {
      neck: Math.round(neckAngle),
      spine: Math.round(spineAngle)
    }
  };
}

function smoothScore(newScore) {
  scoreBuffer.push(newScore);

  if (scoreBuffer.length > BUFFER_SIZE) {
    scoreBuffer.shift();
  }

  const total = scoreBuffer.reduce(
    (sum, score) => sum + score,
    0
  );

  const average = total / scoreBuffer.length;

  return Math.round(average);
}