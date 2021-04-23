import { getUserMentionsFromMessage } from './discord';

test('Should parse mentions', () => {
  const msg = '<@332845525156102146> Den Befehl kannst du alle **3 Minuten** wieder verwenden.';
  expect(getUserMentionsFromMessage(msg)).toMatchInlineSnapshot(`
    Array [
      "332845525156102146",
    ]
  `);
});
