const router = require("express").Router();
const axios = require('axios');
// const process = require('process');
const { uploader, cloudinary } = require('../config/cloudinary');
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
  console.log(req.body)
  Word.create({searchedWord, translatedWord, engSentence, gerSentence,ipaWord, owner: req.session.user._id
  })
    .then((savedWord) => {
      console.log("saved here!",savedWord)
      res.redirect('/list-words')
    }).catch(err => {
      next(err);
    })
});

router.get("/word-detailpage/:id", (req, res, next) => {
  const wordId = req.params.id;
  Word.findById(wordId)
  .then(wordsFromDB => {
    console.log("THIS IS OUR CONSOLE LOG",wordsFromDB)
    res.render('detailpage', {words: wordsFromDB});
  })
  .catch(err => {
    next(err);
  });
}), 


router.post('/words/edit/:id', uploader.single('image'), (req, res, next) => {
console.log("THIS IS OUR REQ", req.file)
 const wordId = req.params.id;
 if (req.file){
   Word.findByIdAndUpdate(wordId, {
      comment: req.body.comment,
      imageUrl: req.file.path
    })
  .then(word => {
    console.log("THIS IS OUR CONSOLE LOG",word)
    res.redirect(`/word-detailpage/${word._id}`)
  })
  .catch(err => {
    next(err);
  }); 
 }
else {
  Word.findByIdAndUpdate(wordId, {
    comment: req.body.comment,
  })
.then(word => {
  console.log("THIS IS OUR CONSOLE LOG",word)
  res.redirect(`/word-detailpage/${word._id}`)
})
.catch(err => {
  next(err);
}); 
}
})

router.get('/words/delete/:id', (req, res, next) => {
  const wordId = req.params.id;
  Word.findByIdAndDelete(wordId)
  .then(()=> {
      res.redirect("/list-words")
    })
  .catch(err => {
      next(err);
  });
})

// Score

/* let score = 0;
function addScore() {
  score += 20;
  let scoreDiv = document.getElementById('score');
  scoreDiv.innerText = `Score : ${score}`
}
 
let cardContainer = document.getElementById('cardContainer');
cardContainer.addEventListener('mouseover', addScore); */




module.exports = router;

