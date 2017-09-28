const fs = require('fs')
const _ = require('lodash')
const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities()
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const speak = require("speakeasy-nlp")
const Tokenizer = require('sentence-tokenizer')
const tokenizer = new Tokenizer('Self')

const json = JSON.parse(fs.readFileSync('talkspace.json').toString())

const allMsgs = json.jsonMessages.messages
const myMsgs = _.filter(allMsgs, (value, key) => value.user_type === 2)

const timezones = []

const getSentenceStats = (sentence) => {
  const classification = speak.classify(sentence)
  const negativity = speak.sentiment.negativity(sentence)
  const positivity = speak.sentiment.positivity(sentence)
  const analysis = speak.sentiment.analyze(sentence)

  return {
    classification,
    negativity,
    positivity,
    analysis
  }
}

const getMsgStats = (msg) => {
  //const date = new Date(msg.message_date)
  const [date, time] = msg.message_date.split(' ')
  const text = entities.decode(msg.message_text)
  const words_per = text.split(' ').length

  tokenizer.setEntry(text)
  const sentences = tokenizer.getSentences()
  const analyzedSentences = _.map(sentences, getSentenceStats)
  const score = _.sum(_.map(analyzedSentences, (sentence) => sentence.analysis.score))

  return {
    date,
    time,
    words_per,
    text,
    sentences: analyzedSentences,
    score: score,
  }
}

const csvWriter = createCsvWriter({
    path: 'output.csv',
    header: [
        {id: 'date', title: 'Date'},
        {id: 'time', title: 'Time'},
        {id: 'words_per', title: 'Words Per Message'},
        {id: 'score', title: 'Score'},
        {id: 'text', title: 'Message Text'},
    ]
});

const myProcessedMsgs = _.map(myMsgs, getMsgStats)

fs.writeFileSync('output.json', JSON.stringify(myProcessedMsgs, null, 2))

csvWriter.writeRecords(myProcessedMsgs)       // returns a promise
    .then(() => {
        console.log('...Done');
    });
