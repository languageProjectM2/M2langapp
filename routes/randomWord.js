const router = require("express").Router();
const axios = require('axios');
const Word = require('../models/Word')
const User = require('../models/User.model')

require("dotenv/config");


router.get("/random-path", (req, res, next) => {
  // console.log("req.session.user: ", req.session.user);

  axios
    .get(
      "https://raw.githubusercontent.com/RazorSh4rk/random-word-api/master/words.json"
    )
    .then((response) => {
      const randomIndex = Math.floor(Math.random() * response.data.length)
      const randomWord = response.data[randomIndex]
      console.log(response.data)
      axios.get(`https://od-api.oxforddictionaries.com/api/v2/translations/en/de/${randomWord || "Error"}?strictMatch=false`)
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
  })

module.exports = router;

