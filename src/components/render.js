const { ipcRenderer } = window.require('electron');


    document.getElementById('btn-export').addEventListener('click', (e) => {
        ipcRenderer.send('excel', 'OK');
        console.log('OK');
    })
