const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    //width: 800,
    //height: 600,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  //win.loadFile(path.join(__dirname, "build", "index.html"));
  win.loadURL("http://localhost:3021").catch((err) => {
    console.error("Failed to load URL:", err);
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
