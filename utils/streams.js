const fs = require('fs');
const https = require('https');
const program = require('commander');
const through = require('through2');
const csvjson = require('csvjson');



program.option('-a, --action <string>', 'read action')
.option('-f, --file <string>', 'read file')
.option('-p, --path <string>', 'path for directory or file')
.parse(process.argv);

/* Validating arguments and mapping actions */

if (process.argv.length < 3) {
    program.help();
} else if (process.argv[2] == '-h' || process.argv[2] == '--help') {
    program.help();       
} else{
    switch(program.action) {
        case 'reverse': reverse();
            break;
        case 'transform': transform();
            break;
        case 'outputFile': outputFile();
            break;
        case 'convertFromFile': convertFromFile();
            break;
        case 'convertToFile': convertToFile();
            break;
        case 'cssBundler': cssBundler();
            break;
        default: process.stdout.write('Please pass correct arguments');
    }
}

/* Reverse string Functionality */
function reverse () {
    process.stdin.on('data', function (data) {
        process.stdout.write(`Reversed String: ${data.toString().split("").reverse().join("")}`);
    });    
}

/* Transform string Functionality */
function transform () {
    process.stdin.pipe(through(function write (buffer, encoding, callback) {
        this.push(buffer);                            
    })).on('data', (data)=>{
        process.stdout.write(`Transeformed String: ${data.toString().toUpperCase()}`);
    });    
}

/* Display the content of a text file */
function outputFile () {
    fs.createReadStream(program.file)
        .on('data', (fileData) => {
            fileData.toString();
            process.stdout.write(fileData);
            process.exit();
        })
        .on('error', (error) => {
            console.error(error, 'Error: Please check the file path');
        });
}

/* Read CSV data and convert in to JSON */
function convertFromFile () {
    if (program.file) {
            process.stdout.write(transformCsvToJson(program.file));
            process.exit();
    } else {
        console.log('Error: No file path found.');
    }
}

/*Transform CSV to JSON */
function transformCsvToJson(filePath) {
    const csvData =  fs.readFileSync(filePath, "utf8");
    return JSON.stringify(csvjson.toObject(csvData));
}

/* Read CSV data and convert in to JSON and create new JSON file*/
function convertToFile () {
    if (program.file) {
        const filePath = program.file;
        const writeStream = fs.createWriteStream('./data/output.json');
        const csvData = transformCsvToJson(filePath);
        writeStream.write(csvData);
        writeStream.end();
    } else{
        console.log('Error: No file path found.');
    }
}

/* Bundling multiple css files in to single file and appending remote css file content to bundle.css */
function cssBundler() {
    const files = fs.readdirSync(`${process.cwd()}/${program.path}`);
    const writeStream = fs.createWriteStream(`${program.path}/bundle.css`);
    files.forEach((fileName) => {
        const cssFileData = fs.readFileSync(`${process.cwd()}/${program.path}/${fileName}`, "utf8");      
        writeStream.write(cssFileData);        
    });
    writeStream.end();

    https.get('https://epa.ms/nodejs18-hw3-css', function(res){
        res.setEncoding('utf8');
        res.on('data', function(cssData) {
            fs.appendFileSync(`${program.path}/bundle.css`, cssData);
            console.log("CSS conntent added successfully!");
        }); 
    });
}