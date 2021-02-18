// const router = require("express").Router();
// const axios = require('axios');
// const Word = require('../models/Word')
// const User = require('../models/User.model')

// require("dotenv/config");


// router.get("/random-path", (req, res, next) => {
//   // console.log("req.session.user: ", req.session.user);

//   axios
//     .get(
//      // "https://raw.githubusercontent.com/RazorSh4rk/random-word-api/master/words.json"
//      "https://github.com/dwyl/english-words/blob/master/words_dictionary.json"
//     )
//     .then((response) => {
//       const randomIndex = Math.floor(Math.random() * response.data.length)
//       const randomWord = response.data[randomIndex]
//       console.log(response.data[randomIndex]) 
//     axios
//     .get(
//       `https://od-api.oxforddictionaries.com/api/v2/translations/en/de/${randomWord || "Error"}?strictMatch=false`
//     )
//       const searchedWord = response.data.results[0].id;
//       const translatedWord = response.data.results[0].lexicalEntries[0].entries[0].senses[0].translations[0].text
//       const engSentence = response.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].translations[0].text
//       const gerSentence = response.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text
//       const ipaWord = response.data.results[0].lexicalEntries[0].entries[0].pronunciations[0].phoneticSpelling
//       res.render("search-results", { searchedWord, translatedWord, gerSentence, engSentence, ipaWord, wordInput });
//     })
//     .catch(err => {
//       console.log(err);
//     })
//   })

// module.exports = router;

