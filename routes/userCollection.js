const router = require("express").Router();
const axios = require('axios');
// const process = require('process');
const Word = require('../models/Word')
const User = require('../models/User.model')

require("dotenv/config");


const loginCheck = () => {
  return (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  }
}

// show the user's personal collection of saved words
router.get('/list-words', (req, res) => {
  Word.find({ owner: req.session.user._id })
      .then(savedWords => {
       res.render('list-words', { words: savedWords })
      })
     .catch(err => {
       console.log(err);
     })
})


router.post("/addWord", loginCheck(), (req, res, next) => {
  const {searchedWord, translatedWord, engSentence, gerSentence,ipaWord} = req.body;
  Word.create({searchedWord, translatedWord, engSentence, gerSentence,ipaWord, owner: req.session.user._id
  })
    .then((savedWord) => {
      console.log("saved here!",savedWord)
      res.redirect('/list-words')
    }).catch(err => {
      next(err);
    })
});

router.get("/word-detailpage", (req, res) => {
  res.render("detailpage")
}), 

router.post('/words/edit/:id', (req,res) => {
  const wordId = req.params.id;
  console.log("THIS IS OUR WORD ID", wordId)
  Word.findById(wordId)
  .then(wordsFromDB => {
    console.log("THIS IS OUR CONSOLE LOG",wordsFromDB)
    res.render('detailpage', {word: wordsFromDB});
  })
  .catch(err => {
    next(err);
  });
})




module.exports = router;
