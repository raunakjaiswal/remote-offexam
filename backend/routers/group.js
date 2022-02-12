const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Group= require('../models/groups');
const messagefeedback=require('../function/messagefeedback')

//create group
router.post('/creategroup',auth,async(req,res)=>{
    console.log(req.body)
    const group = new Group({...req.body,owner: req.user._id})
    try {
        await group.save();
        return res.send({'msg': 'group created successfully'})
    } catch (error) {
        return res.send({'error': 'error'})
    }
})

// get all group basic info
router.get('/getgroup', auth,async(req,res)=>{
   try {
       const group = await Group.find({owner: req.user._id})
       const groupinfo=[];
       group.forEach((grp)=>{
           let pp = {
               name: grp.name,
               description: grp.description,
               id: grp._id
           }
           groupinfo.push(pp)
       })
       res.send(groupinfo)
   } catch (error) {
    return res.send({'error': 'error'})
   }
})

//get particular group info
router.get('/getgroup/:id', auth, async(req,res)=>{
    const _id = req.params.id
    try {
        const group = await Group.findById({_id});
        if(group.owner.toString()===req.user._id.toString())
        {
            return res.send(group)
        }
        return res.send({'msg': 'something went wrong'})
    } catch (error) {
        return res.send({'error': 'error'})
    }
})

// add student to list
router.post('/getgroup/adduser/:id', auth,async(req,res)=>{

   const _id=  req.params.id;
   let name= req.body.name;
   let rollnumber = req.body.rollnumber;
   let phonenumber = req.body.phonenumber;
   try {
       const group = await Group.findById({_id});
       const update = {
           name: name,
           rollnumber: rollnumber,
           phonenumber: phonenumber,
       }
       let found = group.studentlist.some(el => el.rollnumber === rollnumber);
       if(found)
       {
           return res.send("this roll number alteady exist")
       }
       group.studentlist = group.studentlist.concat(update);
       console.log(group)
       await group.save()
       return res.send(group)
   } 
   catch (error) {
       console.log(error)
       return res.send({'error': 'error'})
   }
})

//remove student from list
router.post('/group/removeuser/:id/:id2', auth, async(req,res)=>{
    const groupid = req.params.id;
    const studentid = req.params.id2;
    const group = await  Group.findById({_id: groupid});
    let list =[]
    group.studentlist.forEach((item)=>{
           if(item._id.toString()!=studentid)
           {
               list.push(item)
           }
    })
   group.studentlist = list;
    await group.save()
    res.send(group)
})

router.post('/checkgetlog',async(req,res)=>{
    let str = 'https://api.twilio.com/2010-04-01/Accounts/AC898b219c14d15fb49aad768b898d8044/Messages/SM2af0db3d83f5483eb2301811ff5100d2.json'
   let pp = await messagefeedback(str);
    res.send(pp)
})

module.exports = router;