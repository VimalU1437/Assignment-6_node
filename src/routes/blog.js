const router = require('express').Router();
const express = require('express');
const mongoose = require("mongoose");
const Blog = require('../models/Blog')
// Your routing code goes here


router.route('/').get(async (req,res)=>{
    try{
    
        const que = req.query;
        // console.log((que.page-1) * 5);
        const queryData = await Blog.find({topic : que.search}).skip((que.page-1)*5).limit(5);
        
        res.json({
            status:"success",
            result:queryData
        })



        // console.log(req.query);
        // res.send("end");
    }
    catch(err){
        res.status(406).json({
            status : "",
            message:err.message, 
        })
    }
})

.post(async (req,res)=>{

    try{
        console.log(req.body);
        const user = await Blog.create(req.body);
        res.status(200).json({
            status : "Success",
            result : user
        })
    }
    catch(e){
        res.status(406).json({
            status : "Failed",
            message : e.message
        })
    }
})

//using id operation.
router.route("/:id").put(async (req,res)=>{
    try{
        const found = await Blog.findOne({_id:req.params.id});
        found.posted_by = "sweet";
        found.save();
        res.json({
            status : "success",
            result:found
        })     
    }
    catch(e){
        res.status(406).json({
            status : "Failed",
            message : e.message
        })
    }
})
.delete(async (req,res)=>{
    try{
        const found = await Blog.findOne({_id:req.params.id});
        const deleted =  await Blog.deleteOne({_id:req.params.id});
        res.json({
            status : "success",
            result:found,
            deleted:deleted,
        })
    }   
    catch(e){
        res.status(406).json({
            status : "Failed",
            message : e.message
        })
    }
})


module.exports = router;