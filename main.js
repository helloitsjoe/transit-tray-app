const { app, BrowserWindow, Tray, ipcMain } = require('electron');
const axios = require('axios');
const path = require('path');
const { harvard, southStation } = require('./routes.json');
const { MBTA_KEY } = require('credentials.json');

const assetsDir = path.join(__dirname, 'assets');
const cache = new Map();

let tray;
let window;
let route = southStation;

app.on('ready', () => {
    tray = new Tray(path.join(__dirname, 'assets/icon.png'));
    window = new BrowserWindow({
        width: 260,
        height: 400,
        show: false,
        frame: false,
        resizable: false,
    });

    tray.on('click', (event) => {
        fetchAndSend(route);
        toggleWindow();
    });

    tray.on('double-click', (event) => {
        window.openDevTools({ mode: 'detach' })
    });

    window.loadURL(`file://${path.join(__dirname, 'index.html')}`);
    window.on('blur', () => { window.hide(); });
});

ipcMain.on('new-route', (sender, data) => {
    prevRoute = route;
    route = (prevRoute === southStation) ? harvard : southStation;
    fetchAndSend(route);
});

const fetchAndSend = (route) => {
    return fetchData(route)
        .catch(err => console.error(err))
        .then(data => {
            window.webContents.send('clicked', Object.assign({}, data, { route }));
        });
}

const fetchData = (route) => {
    const destUrl = `http://realtime.mbta.com/developer/api/v2/predictionsbystop?api_key=${MBTA_KEY}&stop=${route.code}&format=json`;
    const cached = cache.get(route.name);
    const withinTTL = (ts) => (Date.now() - ts) < (50 * 1000);
    return (cached && withinTTL(cached.ts)) ? Promise.resolve(cached)
        : axios.get(destUrl)
            .then(res => {
                const data = res.data;
                console.log(`Fetching live data...`);
                cache.set(route.name, Object.assign(data, { ts: Date.now() }));
                return data;
            }).catch(err => {
                console.error('Error during fetch:', err);
                return null;
            });
}

const toggleWindow = () => {
    if (window.isVisible()) {
        window.hide();
    } else {
        showWindow();
    }
}

const showWindow = () => {
    const trayPos = tray.getBounds();
    const windowPos = window.getBounds();
    const x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2));
    const y = Math.round(trayPos.y + trayPos.height);

    window.setPosition(x, y, false);
    window.show();
    window.focus();
}