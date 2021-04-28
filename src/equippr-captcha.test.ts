import { getAnswer } from './equippr-captcha';

const testTable = [
  [
    `Du wurdest zu einer Captcha ausgewählt!

Löse folgende Aufgabe mit !solve <Lösung> in #:robot:｜befehle: 75+37`,
    '112',
  ],
  [
    `Du wurdest zu einer Captcha ausgewählt!

Löse folgende Aufgabe mit !solve <Lösung> in #:robot:｜befehle: 75-25`,
    '50',
  ],
  [
    `Du wurdest zu einer Captcha ausgewählt!

Löse folgende Aufgabe mit !solve <Lösung> in #:robot:｜befehle: 75/25`,
    '3',
  ],
  [
    `Du wurdest zu einer Captcha ausgewählt!

Löse folgende Aufgabe mit !solve <Lösung> in #:robot:｜befehle: 75*2`,
    '150',
  ],
];

test.each(testTable)('Should solve captcha test', (txt, answer) => {
  expect(getAnswer(txt)).toBe(answer);
});
