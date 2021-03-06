const { app, BrowserWindow } = require('electron')
const path = require('path')
const electron = require('electron')

function createWindow () {
	const win = new BrowserWindow({
		width: 1920,
		height: 1080
	})

	win.loadFile('./dist/index.html')
}
app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})