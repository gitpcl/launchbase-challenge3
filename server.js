const express = require("express")
const nunjucks = require("nunjucks")

const server = express()

const challenges = require("./data") //get data from data.js

server.use(express.static('styles')) //get all the style css
server.use(express.static('assets')) //get all the images 
server.use(express.static('scripts')) //get all the scripts 

server.set("view engine", "html") //define the template engine

nunjucks.configure("views", { //configure nunjucks
    express:server,
    autoescape:false //allows nunjucks to print HTML
})

server.get("/", function(req,res){ 
    const about = {
        avatar_url: "/launchbase.png",
        name: "Challenge 3: Starting <span>Back-End</span>",
        role: "About this challange",
        description:'This challenge is composed of three parts:<br><span><a href="/p1">build a server</a></span>, <span><a href="/p2">use nunjucks files dynamically</a></span>, <span><a href="/p3">create challenge description page</a></span>.',
        links: [
            { 
                name:"Pedro Lopes", 
                url:"https://www.pedroclopes.com"
            }
        ]
    }
    return res.render("about", { about: about }) //render the index page, pass about variable
})

server.get("/challenges", function(req,res){ 
    return res.render("challenges", { items: challenges}) //render the videos page
})

server.get("/challenge", function(req,res){ 
    const id = req.query.id

    const challenge = challenges.find(function(challenge){
        return challenge.id == id
    })

    if (!challenge) {
        return res.send("Challenge not found")
    }

    return res.render("challenge", { item: challenge}) //render the challenges page
})

server.use(function(req, res) {
    res.status(404).render("not-found");
  });

server.listen(5000, function() {
    console.log("Server is running...")
})
