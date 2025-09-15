import fs from 'fs';
import { JSDOM } from 'jsdom';

const setupDomAndScript = async () => {
  const html = fs.readFileSync('./student-work/index.html', 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });

  global.window = dom.window;
  global.document = dom.window.document;
  global.prompt = jest.fn();

  prompt
    .mockReturnValueOnce('Halloween')
    .mockReturnValueOnce('balloons')
    .mockReturnValueOnce('spaceship');

  const scriptCode = fs.readFileSync('./student-work/scripts/scriptDK.js', 'utf8');
  const scriptEl = dom.window.document.createElement('script');
  scriptEl.textContent = scriptCode;
  dom.window.document.body.appendChild(scriptEl);

  await new Promise((res) => setTimeout(res, 100));
  return dom;
};

test('scriptDK.js generates the correct Mad Lib', async () => {
  const dom = await setupDomAndScript();
  const output = dom.window.document.querySelector('#madLib').innerHTML;
  expect(output).toMatch(/Halloween.*balloons.*spaceship/);
});