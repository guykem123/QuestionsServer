const path = require('path')
const fs = require('fs');
const fileName = path.join(__dirname, 'questions.json');

async function findQuestion(name) {
  const questions = await readFromQuestions();
  const question = questions.find(u => u.name == name || u.id == name)
  return question
}

async function getAllQuestions() {
  const questions = await readFromQuestions();
  return questions;
}

async function addQuestion(question) {
  await addToQuestions(question)
}

async function updateQuestion(qId, newUser) {
  let questions = await readFromQuestions();
  let question = questions.find(x => x.id == qId)
  const keys = Object.keys(newUser)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    question[key] = newUser[key]
  }
  await rewriteQuestions(questions)
  return question
}


async function deleteQuestion(qId) {
  let questions = await readFromQuestions();
  questions = questions.filter(u => u.id != qId)
  await rewriteQuestions(questions)
}


async function restartQuestions() {
  await rewriteQuestions([])
}


function addToQuestions(question) {
  return createPromise(() => {
    let questionsDb = fs.readFileSync(fileName);
    questionsDb = JSON.parse(questionsDb)
    question.id = `Q${questionsDb.identity}`
    questionsDb.identity += 1
    const questions = questionsDb.questions;
    questions.push(question)
    let data = JSON.stringify(questionsDb);
    return fs.writeFileSync(fileName, data);
  })
}

function rewriteQuestions(questions) {
  return createPromise(() => {
    let questionsDb = fs.readFileSync(fileName);
    questionsDb = JSON.parse(questionsDb)
    questionsDb.questions = questions
    let data = JSON.stringify(questionsDb);
    return fs.writeFileSync(fileName, data);
  })
}

function readFromQuestions() {
  return createPromise(() => {
    const questionsDb = fs.readFileSync(fileName);
    return JSON.parse(questionsDb).questions;
  })
}

function createPromise(callback) {
  return new Promise((res, rej) => {
    try {
      const value = callback();
      res(value);
    } catch (err) {
      rej(err);
    }
  })
}

module.exports = {
  findQuestion,
  addQuestion,
  getAllQuestions,
  deleteQuestion,
  updateQuestion,
  restartQuestions
};
