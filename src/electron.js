const electron = require('electron')
const {ipcMain, session} = require('electron')
const {webContents} = require('electron')
const { dialog } = require('electron')
const app = electron.app
const path = require('path')
const isDev = require('electron-is-dev')
const BrowserWindow = electron.BrowserWindow

let mainWindow
let loginWindow
let user

var exec = require('child_process').exec, child;

function run_AMS_Service(){
  console.log('run_AMS_Service()');
  child = exec('java -jar AMS_Service.jar',
  function (error, stdout, stderr){
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if(error !== null){
    console.log('exec error: ' + error);
  }
  });

}

function createLogin() {

  loginWindow = new BrowserWindow({
    width: 500, height: 750,
    webPreferences: {  nodeIntegration: true }
  })

  loginWindow.loadFile(__dirname+'/Login_v6/index.html');

  loginWindow.webContents.on('did-finish-load', function() {
    loginWindow.show();
});

  loginWindow.on('closed', () => {
    loginWindow = null
  })

}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
       preload: __dirname + '/preload.js'
    },
    show: false
  })

  run_AMS_Service();

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  )

  mainWindow.on('closed', () => {
    mainWindow = null
  })
            mainWindow.webContents.on('dom-ready', function() {
                loginWindow.show = false
                loginWindow.close()
                loginWindow = null
                mainWindow.maximize();
                mainWindow.show();
            });


}

app.on('ready', createLogin)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('set-username', (event, data) => {
  this.user = data
  createWindow(data, () => {
  event.sender.send('user-saved')
  })
})

ipcMain.on('open-file-dialog-for-file', function (event) {
  dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'openDirectory']
  }).then(result => {

    console.log(result.canceled)
    console.log(result.filePaths)

    mainWindow.webContents.send('selected-path', result.filePaths[0])

  }).catch(err => {
    console.log(err)
  })

 });

ipcMain.on('loginWindow-load', (e, data) => {


})