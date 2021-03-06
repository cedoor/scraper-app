const electron = require('electron')
const {app, dialog} = electron
const log = require('electron-log')
const {autoUpdater} = require('electron-updater')

autoUpdater.autoDownload = false
autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'

autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    type: 'question',
    title: 'Found Updates',
    message: 'Found updates, do you want update now?',
    buttons: ['Yes', 'No']
  }, (buttonIndex) => {
    if (buttonIndex === 0) {
      autoUpdater.downloadUpdate()
    }
  })
})

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Install Updates',
    message: 'Updates downloaded, application will be quit for update...',
    buttons: ['Ok']
  }, () => {
    setImmediate(() => autoUpdater.quitAndInstall())
  })
})

app.on('ready', () => {
  autoUpdater.checkForUpdatesAndNotify()
})
