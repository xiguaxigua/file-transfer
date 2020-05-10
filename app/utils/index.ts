import { ipcRenderer } from 'electron';

// eslint-disable-next-line import/prefer-default-export
export function getFolder(): Promise<string> {
  ipcRenderer.send('open-directory-dialog', 'openDirectory');
  return new Promise(resolve => {
    ipcRenderer.on('selected', (_event, folder) => {
      resolve(folder);
    });
  });
}
