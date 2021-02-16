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

router.get("/word-search", (req, res, next) => {
  const {wordInput} = req.query;
  // const defaultRandomWord = getRandomWord()
  // console.log('REQQQQQQQQQQQQQQ', req.query);
  axios.get(`https://od-api.oxforddictionaries.com/api/v2/translations/en/de/${wordInput || "Error"}?strictMatch=false`)
    .then(def => {
      
      // console.log('DEFFFFF', def.data.results[0].lexicalEntries[0].entries[0].senses[0].translations[0].text);
      const searchedWord = def.data.results[0].id;
      const translatedWord = def.data.results[0].lexicalEntries[0].entries[0].senses[0].translations[0].text
      const engSentence = def.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].translations[0].text
      const gerSentence = def.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text
      const ipaWord = def.data.results[0].lexicalEntries[0].entries[0].pronunciations[0].phoneticSpelling
      res.render("search-results", { searchedWord, translatedWord, gerSentence, engSentence, ipaWord, wordInput });
    })
    .catch(err => {
      console.log(err);
    })
});

// here we will add a shuffling function

//function getRandomWord()







module.exports = router;


// english sentence example
//def.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text
// german sentence example
//def.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].translations[0].text
// ipa 
//def.data.results[0].lexicalEntries[0].entries[0].pronunciations[0]