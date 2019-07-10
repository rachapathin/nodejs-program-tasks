import fs from "fs";

export default class Importer {
    constructor(eventEmitter, async = true){
        this.eventEmitter = eventEmitter;
        this.async = async;
    }

    listenChanges() {
        this.eventEmitter.on("changed", filePath => {
            if(this.async){
                this.import(filePath)
                .then(csvData => {
                    console.log("*****************************************************");
                    console.log("Imported csvData in asynchronous:", csvData);
                })
                .catch(err => {
                    console.log("Error: ", err);
                });
            } else {
                try {
                    let csvData = this.importSync(filePath);
                    console.log("*****************************************************");
                    console.log("Imported csvData in synchronous: ", csvData);
                } catch (err) {
                    console.log("Error: ", err);
                }
            }
        });
    }

    import(path) {
        return new Promise((resolve, reject) => {
          fs.readFile(path, "utf8", (err, data) => {
            if (err) {
              throw err;
            }
            resolve(data);
          });
        });
    }

    importSync(path){
        return fs.readFileSync(path, "utf8");
    };
}