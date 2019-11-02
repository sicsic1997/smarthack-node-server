var express = require('express');
var router = express.Router();
const fs = require('fs')


/* GET home page. */
router.get('/get-experience', function(req, res, next) {
  res.send({"experience-sets": loadExperiences()});
});

router.post('/save-experience', function(req, res, next) {
  var name = writeToFile(req.body["name"], req.body["experienceChangeSet"]);
  res.send({'filename': name});
});

function loadExperiences() {
  try {
    //Folder path - should return all files as an array of string content
    var files = fs.readdirSync(".\\resources")
    var result = [];
    files.forEach(function (file) {
      result.push(fs.readFileSync(".\\resources\\" + file, "utf8"))
    });
    return result;
  }
  catch(error) {
    return [];
  }
}

function writeToFile(name, changesList) {
  fs.writeFileSync(".\\resources\\" + name, changesList);
  return name;
}

module.exports = router;
