const router = require("express").Router();
const axios = require('axios');
// const process = require('process');
const Word = require('../models/Word')
const User = require('../models/User.model')

require("dotenv/config");


axios.defaults.headers.common["app_id"] = process.env.appId;
axios.defaults.headers.common["app_key"] = process.env.keyApi;

router.get('/dashboard', (req, res) => {
  res.render("dashboard");
})

router.get("/random-word", (req, res, next) => {
  // console.log("req.session.user: ", req.session.user);
  axios
    .get(
      //"https://raw.githubusercontent.com/RazorSh4rk/random-word-api/master/words.json"
      "https://raw.githubusercontent.com/jonschlinkert/common-words/master/words.json"
    )
    .then((response) => {
      const randomIndex = Math.floor(Math.random() * response.data.length)
      console.log("RANDOM INDEX LOOK LOOK LOOK" , randomIndex)
      const randomWord = response.data[randomIndex].word
      console.log("RANDOM WORD LOOK LOOK LOOK" , response.data[randomIndex].word)
      //console.log('fuck', response.data)
      //console.log('RANDOM WORD IS HEEEEEERRRRRRRRREEEEE', randomWord)
     axios
        .get(
          `https://od-api.oxforddictionaries.com/api/v2/translations/en/de/${randomWord}?strictMatch=false` 
        )
          .then((picked) => {
            //console.log('AND THIS IS PICKED', picked)
            const searchedWord = picked.data.results[0].id;
            const translatedWord = picked.data.results[0].lexicalEntries[0].entries[0].senses[0].translations[0].text
            const engSentence = picked.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].translations[0].text
            const gerSentence = picked.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text
            const ipaWord = picked.data.results[0].lexicalEntries[0].entries[0].pronunciations[0].phoneticSpelling
            console.log('loook heeeerrre',{ searchedWord, translatedWord, gerSentence, engSentence, ipaWord, randomWord } )
            res.render("random-word", { searchedWord, translatedWord, gerSentence, engSentence, ipaWord });
          })
        .catch(err => {
          console.log(err)
        })
        })
    .catch(err => {
      console.log(err);
    })
  })




module.exports = router;


// english sentence example
//def.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text
// german sentence example
//def.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].translations[0].text
// ipa 
//def.data.results[0].lexicalEntries[0].entries[0].pronunciations[0]