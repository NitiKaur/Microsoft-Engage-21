'use strict';

const express = require("express");
const router = express.Router();

const {upload} = require('../helpers/filehelper');
const {singleFileUpload, multipleFileUpload,
     getallSingleFiles, getallMultipleFiles} = require('../controllers/fileuploaderController');

// @route POST api/upload/
// @desc upload file(s)
// @access Public
router.post('/singleFile', upload.single('file'), singleFileUpload);
router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);
router.get('/getMultipleFiles', getallMultipleFiles);


module.exports=router;