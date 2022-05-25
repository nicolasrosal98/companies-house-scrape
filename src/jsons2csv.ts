const fs = require("fs");

fs.readdir('./companyInformation', function (err: string, files: any[]) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    console.log(files)
    files.forEach(function (file) {
        // Do whatever you want to do with the file
    });
});

[]