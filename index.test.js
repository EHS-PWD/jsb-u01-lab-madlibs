import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const setupDomAndScript = async (scriptPath) => {
  const html = fs.readFileSync('./student work/index.html', 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });

  global.window = dom.window;
  global.document = dom.window.document;
  global.prompt = jest.fn();

  const scriptCode = fs.readFileSync(scriptPath, 'utf8');
  const scriptEl = dom.window.document.createElement('script');
  scriptEl.textContent = scriptCode;
  dom.window.document.body.appendChild(scriptEl);

  await new Promise((res) => setTimeout(res, 100));
  return dom;
};

describe('Mad Libs Output Tests', () => {
  test('scriptAC.js produces expected sentence', async () => {
    prompt.mockReturnValueOnce('Disney World').mockReturnValueOnce('dragon').mockReturnValueOnce('sneezed');
    const dom = await setupDomAndScript('./student work/scripts/scriptAC.js');
    const output = dom.window.document.querySelector('#madLib').innerHTML;
    expect(output).toMatch(/Disney World.*dragon.*sneezed/);
  });

  test('scriptLZ.js produces expected sentence', async () => {
    prompt.mockReturnValueOnce('run').mockReturnValueOnce('banana').mockReturnValueOnce('laughed');
    const dom = await setupDomAndScript('./student work/scripts/scriptLZ.js');
    const output = dom.window.document.querySelector('#madLib').innerHTML;
    expect(output).toMatch(/run.*banana.*laughed/);
  });

  test('scriptDK.js produces expected sentence', async () => {
    prompt.mockReturnValueOnce('Halloween').mockReturnValueOnce('balloons').mockReturnValueOnce('spaceship');
    const dom = await setupDomAndScript('./student work/scripts/scriptDK.js');
    const output = dom.window.document.querySelector('#madLib').innerHTML;
    expect(output).toMatch(/Halloween.*balloons.*spaceship/);
  });
});