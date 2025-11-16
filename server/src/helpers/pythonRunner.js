import { spawn } from "child_process";
import path from "path";

export const runPython = (scriptName, args = []) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(process.env.PYTHON_AI_DIR, scriptName);

    const py = spawn("python", [scriptPath, ...args]);

    let stdoutData = "";
    let stderrData = "";

    py.stdout.on("data", (data) => {
      stdoutData += data.toString();
    });

    py.stderr.on("data", (data) => {
      stderrData += data.toString();
    });

    py.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(stderrData || `Python exited with code ${code}`));
        return;
      }
      try {
        const jsonStart = stdoutData.indexOf("[");
        const jsonEnd = stdoutData.lastIndexOf("]") + 1;
        const jsonStr = stdoutData.substring(jsonStart, jsonEnd);
        const parsed = JSON.parse(jsonStr);
        resolve(parsed);
      } catch (err) {
        reject(new Error("Invalid JSON from Python: " + stdoutData));
      }
    });
  });
};
