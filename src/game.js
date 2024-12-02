#!/usr/bin/env node
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const makeQuestion = async (msg, number) => {
  const newAnswer = await rl.question(msg);
  return await answerParses(newAnswer, number);
}

const answerParses = async (answer, number) => {
  if (answer === null) {
    return await makeQuestion('Загадано число в диапазоне от 0 до 100 ', number);
  }

  if (!Number.isInteger(Number(answer))) {
    return await makeQuestion('Некорректное значение, повторите попытку ', number);
  }

  if (Number(answer) > Number(number)) {
    return await makeQuestion('Меньше ', number);
  }

  if (Number(answer) < Number(number)) {
    return await makeQuestion('Больше ', number);
  }

  return answer;
}

const rl = readline.createInterface({ input, output });
const number = Math.round(Math.random() * 100);
const answer = await answerParses(null, number);

console.log(`Отгадано число ${answer}`);

rl.close();