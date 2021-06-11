const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch({ headless: false });
  const page = await browser.newPage();
  await page.route('**/index.php/lizmap/service/?repository=testsrepository&project=time_manager&LAYERS**', (route, request) => {
    console.log(request.postDataBuffer());
  })
  await page.goto('http://lizmap.local:8130/index.php/view/map/?repository=testsrepository&project=time_manager');
  await page.click('#button-timemanager');
  //await response.body();
  await browser.close();
})();