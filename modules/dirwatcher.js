import EventEmitter from 'events';
import fs from 'fs';

export default class DirWatcher extends EventEmitter {
    constructor() {
        super();
        this.filesCurrentStatus = {};
        this.filesmodifiedStatus = {};
    }

    watchPath(path, delay) {
        this.timer = setInterval(() => {
            this.findFilesFromDirectory(path);
        }, delay);
    }

    stopWatchPath() {
        clearInterval(this.timer);
    }

    findFilesFromDirectory(path) {
        let files = fs.readdirSync(path);
        if (files.length) {
            files.forEach(file => {
                let fileStat = fs.statSync(`${path}/${file}`);
                this.filesCurrentStatus[`${path}/${file}`] = fileStat.mtime.valueOf();
                if (this.isEmpty(this.filesmodifiedStatus)) {
                    this.filesmodifiedStatus[`${path}/${file}`] = fileStat.mtime.valueOf();
                } else {
                    this.checkFileChangeStatus(`${path}/${file}`, fileStat);
                }
            });
        }
    }

    checkFileChangeStatus(filePath, fileStat) {
        if(this.filesmodifiedStatus[filePath] && this.filesmodifiedStatus[filePath] !== this.filesCurrentStatus[filePath]){
            this.emit("changed", filePath);
            this.filesmodifiedStatus[filePath] = fileStat.mtime.valueOf();
        }
    }

    isEmpty(obj) {
        for(let key in obj) {
            if(obj.hasOwnProperty(key)){
                return false;
            }
        }
        return true;
    }
}