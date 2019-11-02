var express = require('express');
var router = express.Router();
const fs = require('fs')


/* GET home page. */
router.get('/get-experience', function(req, res, next) {
  res["experience-list-stringified"] = loadExperiences(req.params["path"]);
});

router.post('/save-experience', function(req, res, next) {
  console.log(req);
  writeToFile(req.headers["name"], req.headers["changesList"]);
});

function loadExperiences(path) {
  try {
    //Folder path - should return all files as an array of string content
    var files = fs.readdirSync(path)
    var result = [];
    files.forEach(function (file) {
      result.push(fs.readFileSync(path + "\\" + file))
    });
    return result;
  }
  catch(error) {
    return [];
  }
}

function writeToFile(path, changesList) {
  fs.writeFileSync(".\\resources\\" + path, changesList);
}

module.exports = router;
