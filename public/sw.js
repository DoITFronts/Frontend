if (!self.define) {
  let e,
    s = {};
  const a = (a, c) => (
    (a = new URL(a + ".js", c).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, i) => {
    const t =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[t]) return;
    let n = {};
    const r = (e) => a(e, t),
      d = { module: { uri: t }, exports: n, require: r };
    s[t] = Promise.all(c.map((e) => d[e] || r(e))).then((e) => (i(...e), n));
  };
}
define(["./workbox-4754cb34"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "5f8202b05d04923f14fd0fd5617299db",
        },
        {
          url: "/_next/static/chunks/1385-62d65103de40ef19.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/1385-62d65103de40ef19.js.map",
          revision: "4dd49a8982f02a8d10a84326b7c58799",
        },
        {
          url: "/_next/static/chunks/1681-1dde28871e54786a.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/1681-1dde28871e54786a.js.map",
          revision: "b4c48cbceb1c6ca83874ee7f1c4ca066",
        },
        {
          url: "/_next/static/chunks/178-ae6bc44a6ccb57f8.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/178-ae6bc44a6ccb57f8.js.map",
          revision: "56ec8035c82de932a8fcd450a69b2f8e",
        },
        {
          url: "/_next/static/chunks/2331-b7c3da449db22b5e.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/2331-b7c3da449db22b5e.js.map",
          revision: "353914dbc93c2342392f492cfce34492",
        },
        {
          url: "/_next/static/chunks/281-d09c1e1e01a30cb0.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/281-d09c1e1e01a30cb0.js.map",
          revision: "a9d18bd731246be7d629748158cfd5ee",
        },
        {
          url: "/_next/static/chunks/3292-85fe406baeb6daf0.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/3292-85fe406baeb6daf0.js.map",
          revision: "f0d0d1cd7f1b850a22c7d40ae4e994c4",
        },
        {
          url: "/_next/static/chunks/3349-b8e41f301f07a6fa.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/3349-b8e41f301f07a6fa.js.map",
          revision: "7b0e29e6d79b10b278d3757071c5f06e",
        },
        {
          url: "/_next/static/chunks/3359-4d9b44f66b01b462.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/3359-4d9b44f66b01b462.js.map",
          revision: "0797df1cdf533c8d364253dc2a09bbcf",
        },
        {
          url: "/_next/static/chunks/3961-d0b235f6dc647c2b.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/3961-d0b235f6dc647c2b.js.map",
          revision: "bba048aab36ecaf0dbc2385d632df67b",
        },
        {
          url: "/_next/static/chunks/4253-ab564cd6a70cfc87.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/4253-ab564cd6a70cfc87.js.map",
          revision: "35685b680df497f4c6e3d7cc6b5209a7",
        },
        {
          url: "/_next/static/chunks/4380-0b317059c704ec4c.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/4380-0b317059c704ec4c.js.map",
          revision: "f4b766f976110acc5723305e12cff416",
        },
        {
          url: "/_next/static/chunks/4386-a010093da211ae95.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/4386-a010093da211ae95.js.map",
          revision: "b0a2a4a66210b23a215a292903168d46",
        },
        {
          url: "/_next/static/chunks/4996-faa36eaa92f79af6.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/4996-faa36eaa92f79af6.js.map",
          revision: "0e4c204849e2d583cdd498ad9d6a164e",
        },
        {
          url: "/_next/static/chunks/4bd1b696-22cedffa400d461c.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/4bd1b696-22cedffa400d461c.js.map",
          revision: "5be3f4e5c2c19ffb2c3487d9781e8cb1",
        },
        {
          url: "/_next/static/chunks/4bed7f16-b06bf819017f8cdb.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/4bed7f16-b06bf819017f8cdb.js.map",
          revision: "a7e94247b78635fd251ade537c54aa0a",
        },
        {
          url: "/_next/static/chunks/5139-562cff1e4b02b632.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/5139-562cff1e4b02b632.js.map",
          revision: "1e7e07fb3c642af90fc3a1190934569f",
        },
        {
          url: "/_next/static/chunks/5499-a1c2e4895673efbc.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/5499-a1c2e4895673efbc.js.map",
          revision: "e13f44e01794442947d1a4d0578944e3",
        },
        {
          url: "/_next/static/chunks/586-9dfe8c74a7108c68.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/586-9dfe8c74a7108c68.js.map",
          revision: "77d766216f12e8c4740f5d2f7e88cdb0",
        },
        {
          url: "/_next/static/chunks/6149.45a4f3e786d8bfb7.js",
          revision: "45a4f3e786d8bfb7",
        },
        {
          url: "/_next/static/chunks/6149.45a4f3e786d8bfb7.js.map",
          revision: "771dedf93d6a59e72ace88d4a352d952",
        },
        {
          url: "/_next/static/chunks/6279.78cced27667a1940.js",
          revision: "78cced27667a1940",
        },
        {
          url: "/_next/static/chunks/6279.78cced27667a1940.js.map",
          revision: "4eb80114acb519f85f42532606e97abf",
        },
        {
          url: "/_next/static/chunks/6955-533ea6d8cec9cf63.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/6955-533ea6d8cec9cf63.js.map",
          revision: "23e550d060fe8424dbf9be7893ab35fe",
        },
        {
          url: "/_next/static/chunks/7128-db5c0e1163f061ca.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/7128-db5c0e1163f061ca.js.map",
          revision: "b695eeab85a8fda7ee36fc8e63e408b7",
        },
        {
          url: "/_next/static/chunks/7135-5654d4521c2fb44d.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/7135-5654d4521c2fb44d.js.map",
          revision: "4aba5ddc28abf4ceee463aaa6eaf5f3f",
        },
        {
          url: "/_next/static/chunks/7225-52095292a43316b6.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/7577-8063a7eaf01eb128.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/7597-b6be802938e68edc.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/7597-b6be802938e68edc.js.map",
          revision: "190428ef23cb5c29aa12aecaa3cb5705",
        },
        {
          url: "/_next/static/chunks/8124-c392620788ebc7ab.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/8366.cbe60b75cd5075fb.js",
          revision: "cbe60b75cd5075fb",
        },
        {
          url: "/_next/static/chunks/8366.cbe60b75cd5075fb.js.map",
          revision: "f0060980412124dbc239833cd9f62344",
        },
        {
          url: "/_next/static/chunks/9085-2987e0215b70051b.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/9085-2987e0215b70051b.js.map",
          revision: "ae15e00e4b8aa8bfb23e79d85bba90eb",
        },
        {
          url: "/_next/static/chunks/9164-080a76f9aa455ba3.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/9164-080a76f9aa455ba3.js.map",
          revision: "ca0b982648975fe6e27ccb43ab61951d",
        },
        {
          url: "/_next/static/chunks/9428-3957daa154cdecc6.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/9428-3957daa154cdecc6.js.map",
          revision: "6e44756b1b2e320c6043babc7dafc267",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-07792388344b3a1a.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/api/sentry-example-api/route-19829154c60f2f10.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/layout-98c47d37ed917352.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/layout-98c47d37ed917352.js.map",
          revision: "eac398b7627298e5adabe0938a2fbe29",
        },
        {
          url: "/_next/static/chunks/app/liked/page-33525c88e9d2a4b3.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/liked/page-33525c88e9d2a4b3.js.map",
          revision: "9928848e4831e1d19e5ae75572ce7ff0",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@bottombar/page-8ef3cd28285ca68f.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@bottombar/page-8ef3cd28285ca68f.js.map",
          revision: "4490b5bd36f75a681938924e62cc1a7a",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@card/page-04b59436dc9c38e1.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@card/page-04b59436dc9c38e1.js.map",
          revision: "5385d60a319d58e443290d544f70f203",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@description/page-9da6479a4d643abf.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@description/page-9da6479a4d643abf.js.map",
          revision: "629306c8428e3c46a0b52cf486ef8e56",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@host/page-d4928ea9bb90122c.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@host/page-d4928ea9bb90122c.js.map",
          revision: "2dd544dfedc8082aaf24b77720e49d77",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@location/page-32616a50b8342556.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@location/page-32616a50b8342556.js.map",
          revision: "ee0216970eccbda2a873f7f5032cc0f0",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@reviews/page-648c23a57a5d87b5.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@reviews/page-648c23a57a5d87b5.js.map",
          revision: "d383f4db04ac527e03fde85bab7a0cf9",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/layout-d7e7bd0606fc9f67.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/layout-d7e7bd0606fc9f67.js.map",
          revision: "0fa02adeca006878715c332a0a0a4e8f",
        },
        {
          url: "/_next/static/chunks/app/meeting/list/@meetingList/page-fa4abe98f25a72ac.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/meeting/list/@meetingList/page-fa4abe98f25a72ac.js.map",
          revision: "144e757f5a671d2f8238019e0340fd12",
        },
        {
          url: "/_next/static/chunks/app/meeting/list/@title/page-6b7a1fe66d9af638.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/meeting/list/@title/page-6b7a1fe66d9af638.js.map",
          revision: "0c8493a4104d2e95453cbe3a54dde4b1",
        },
        {
          url: "/_next/static/chunks/app/meeting/list/layout-13cce355cc2f3399.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/meeting/list/layout-13cce355cc2f3399.js.map",
          revision: "6de9a91e4b071bb0edb0872ffd16a995",
        },
        {
          url: "/_next/static/chunks/app/myprofile/@meeting/page-12b0891c28af29c0.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/myprofile/@meeting/page-12b0891c28af29c0.js.map",
          revision: "f3e1a02502a7e1e0c8ab0693817eb1a2",
        },
        {
          url: "/_next/static/chunks/app/myprofile/@profile/page-3b633a5258365820.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/myprofile/@profile/page-3b633a5258365820.js.map",
          revision: "9d8ed9aae440f411d7a2e7e9d2b84e90",
        },
        {
          url: "/_next/static/chunks/app/myprofile/layout-b497f77d63dd1134.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/not-found-0fb3858420592efd.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/not-found-0fb3858420592efd.js.map",
          revision: "1a77e18c9eb0566e7ad0196a92e6fa35",
        },
        {
          url: "/_next/static/chunks/app/page-d5981248f99ec75f.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/page-d5981248f99ec75f.js.map",
          revision: "20e5252b3582dda7fb8c07a413788d3e",
        },
        {
          url: "/_next/static/chunks/app/review/@reviewList/page-c2e91a2abf95c71d.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/review/@reviewList/page-c2e91a2abf95c71d.js.map",
          revision: "16cddce7d9ee538506159c4f718c4b24",
        },
        {
          url: "/_next/static/chunks/app/review/@title/page-7d394a47e1a98010.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/review/layout-c91b2edf0a87f2a2.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/review/layout-c91b2edf0a87f2a2.js.map",
          revision: "2c8c238ef13437707142fcd5566e0fa1",
        },
        {
          url: "/_next/static/chunks/app/user/signin/page-9895d8f15988669d.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/user/signin/page-9895d8f15988669d.js.map",
          revision: "4ce338dc07bdcfcddce024a3fb4d61af",
        },
        {
          url: "/_next/static/chunks/app/user/signup/page-01d5f9a9840bf43a.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/app/user/signup/page-01d5f9a9840bf43a.js.map",
          revision: "07c9ee65c061d2ef913f53d257f241db",
        },
        {
          url: "/_next/static/chunks/dc112a36-c92d0c7bf4e0e0e5.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/dc112a36-c92d0c7bf4e0e0e5.js.map",
          revision: "3fe39228ec15cbcadfa9319bbfd47b81",
        },
        {
          url: "/_next/static/chunks/df220e5b-02f036a59121e505.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/df220e5b-02f036a59121e505.js.map",
          revision: "cb68d693df6dab816273169d1d03976c",
        },
        {
          url: "/_next/static/chunks/e8686b1f-92b59a70dddd13d2.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/e8686b1f-92b59a70dddd13d2.js.map",
          revision: "03e2ea62291c4df3a785e853d038f074",
        },
        {
          url: "/_next/static/chunks/framework-01ff2bbc6a92c1cb.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/framework-01ff2bbc6a92c1cb.js.map",
          revision: "24a5b0aa026479b9e4535fefd391343d",
        },
        {
          url: "/_next/static/chunks/main-8ba33aa285d48847.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/main-8ba33aa285d48847.js.map",
          revision: "10302c43969dbb50897c670402a9434c",
        },
        {
          url: "/_next/static/chunks/main-app-b79e7bce14ed0052.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/main-app-b79e7bce14ed0052.js.map",
          revision: "f1fedc08c90d5eb4cb55cffd04019a11",
        },
        {
          url: "/_next/static/chunks/pages/_app-6e2a23ea69a1630e.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/pages/_app-6e2a23ea69a1630e.js.map",
          revision: "139b37c69241cb6f5cbbd4e9c25c7520",
        },
        {
          url: "/_next/static/chunks/pages/_error-a7433928e4d02bfe.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/pages/_error-a7433928e4d02bfe.js.map",
          revision: "3dca76e17b6b5b446bb1f8be850b1083",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-0b852a8090dd317e.js",
          revision: "zM0R2lrwE68yAk4t0qBj6",
        },
        {
          url: "/_next/static/chunks/webpack-0b852a8090dd317e.js.map",
          revision: "d29ea3cde77a62e05c674d57ef664ab4",
        },
        {
          url: "/_next/static/css/0acef4df005bbe6c.css",
          revision: "0acef4df005bbe6c",
        },
        {
          url: "/_next/static/css/0acef4df005bbe6c.css.map",
          revision: "04cc164dd7b5f326972a480667f5e04c",
        },
        {
          url: "/_next/static/css/24cf6cd9164e72ac.css",
          revision: "24cf6cd9164e72ac",
        },
        {
          url: "/_next/static/css/24cf6cd9164e72ac.css.map",
          revision: "086cc1e7a9a4fbba64b5da965858168b",
        },
        {
          url: "/_next/static/media/calendar.c3b8a004.svg",
          revision: "dee351dc1095ffd54a6f080c4705362b",
        },
        {
          url: "/_next/static/media/logo.9ed44987.svg",
          revision: "b148eac3a5cf1b76a19453d15dd44eb4",
        },
        {
          url: "/_next/static/media/logoWhite.efbfdb14.svg",
          revision: "196a65a8b5c336e2be5bff559bc5a21a",
        },
        {
          url: "/_next/static/media/section02.9b15d5b2.svg",
          revision: "960ca553dc80408e273e9d381e601006",
        },
        {
          url: "/_next/static/media/userProfile.3064f573.svg",
          revision: "aadce18d1e8322368e1b735f74986b0e",
        },
        {
          url: "/_next/static/zM0R2lrwE68yAk4t0qBj6/_buildManifest.js",
          revision: "a3fe017d7aec812b743ca48d62223a79",
        },
        {
          url: "/_next/static/zM0R2lrwE68yAk4t0qBj6/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        { url: "/assets/X.svg", revision: "cc03ad77e28d6f36efcd5dbefaf6241c" },
        {
          url: "/assets/calendar.svg",
          revision: "dee351dc1095ffd54a6f080c4705362b",
        },
        {
          url: "/assets/card/example_image.png",
          revision: "1cc276b03bbedaac5b4cfbb3ed26668d",
        },
        {
          url: "/assets/card/location-marker.svg",
          revision: "d3a0e2ae1a489ebcfecacf742f3d3ae2",
        },
        {
          url: "/assets/card/user.svg",
          revision: "c9123fe48ac1461bead793fb9c174bdb",
        },
        {
          url: "/assets/chat.svg",
          revision: "8d190aebaedc734d1c9837cd0779d0f8",
        },
        {
          url: "/assets/chevron_down.svg",
          revision: "48947f0d30e1c1298aa0a998adbed92b",
        },
        {
          url: "/assets/cursor/cursor-click.svg",
          revision: "ca3ab2df536765e8e624c0c8e56d27bb",
        },
        {
          url: "/assets/cursor/cursor-hover.svg",
          revision: "b4550903ef9b5b2f83724df03630ce4d",
        },
        {
          url: "/assets/cursor/cursor.svg",
          revision: "27a084b6b6e0bb226e2170d6e70eabb0",
        },
        {
          url: "/assets/exit.svg",
          revision: "ce86ce45c052da403ac0035c079c5838",
        },
        {
          url: "/assets/file.svg",
          revision: "d09f95206c3fa0bb9bd9fefabfd0ea71",
        },
        {
          url: "/assets/globe.svg",
          revision: "2aaafa6a49b6563925fe440891e32717",
        },
        {
          url: "/assets/landing/fireworks.json",
          revision: "9911e3627955b9f992d19d521b98af9a",
        },
        {
          url: "/assets/landing/section01.svg",
          revision: "f4c4780c06b7dfa404591a9af757177d",
        },
        {
          url: "/assets/landing/section02.svg",
          revision: "960ca553dc80408e273e9d381e601006",
        },
        {
          url: "/assets/logo/logo.svg",
          revision: "b148eac3a5cf1b76a19453d15dd44eb4",
        },
        {
          url: "/assets/logo/logoWhite.svg",
          revision: "196a65a8b5c336e2be5bff559bc5a21a",
        },
        {
          url: "/assets/logo/splash.svg",
          revision: "32a86148963bae53d091f744876d3163",
        },
        {
          url: "/assets/profile/avatar.svg",
          revision: "db3395a610b051c77075b294c35e4297",
        },
        {
          url: "/assets/profile/editAvatar.svg",
          revision: "7d1e2328b08607d44af8416e549c2443",
        },
        {
          url: "/assets/profile/profileCardBg.svg",
          revision: "37abbda846fd8b8fec5e804c2d9a2d49",
        },
        {
          url: "/assets/profile/userProfileDarkDefault.svg",
          revision: "e3b8ae9a5c1af929f135512dee19e69a",
        },
        {
          url: "/assets/profile/userProfileDefault.svg",
          revision: "7ef31fdf243075f888f309a795640f86",
        },
        {
          url: "/assets/review/heart_empty.svg",
          revision: "1dfc1f7d39280260573b0f9e5929a943",
        },
        {
          url: "/assets/review/heart_full.svg",
          revision: "8ec97c7e4a502f385dae492fd38bd53e",
        },
        {
          url: "/assets/sort.svg",
          revision: "789dd164b176c7cc3a5284fb68f41a0b",
        },
        {
          url: "/assets/user/kakaoLogo.svg",
          revision: "5af0c45788afc524fd88b9b21ab9d270",
        },
        {
          url: "/assets/user/unVisibility.svg",
          revision: "63583bd8994c2953d877e0f18559c102",
        },
        {
          url: "/assets/user/visibility.svg",
          revision: "16983634f5185d9f4a569ecbf8c625d9",
        },
        {
          url: "/assets/userProfile.svg",
          revision: "aadce18d1e8322368e1b735f74986b0e",
        },
        {
          url: "/assets/window.svg",
          revision: "a2760511c65806022ad20adf74370ff3",
        },
        {
          url: "/fallback/fallback_board_game.png",
          revision: "f35fa713984db00460883379495ce0e4",
        },
        {
          url: "/fallback/fallback_cafe.png",
          revision: "71d81820b16c370d2d9f6c5ffc17df8d",
        },
        {
          url: "/fallback/fallback_default.png",
          revision: "d2a6ee043bb7a0228dc68d98adcea01f",
        },
        {
          url: "/fallback/fallback_gourmet.png",
          revision: "c19b5bb414ba57e2696bdac0683348ba",
        },
        {
          url: "/icons/icon-192x192.png",
          revision: "0fe4816708274be8df415b21169da547",
        },
        {
          url: "/icons/icon-512x512.png",
          revision: "5420cda2b5ea2f9d06016b3ee7e12795",
        },
        { url: "/offline.html", revision: "d396fefa1bd5642ed1f2c8775cde5905" },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: c,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET",
    );
});
//# sourceMappingURL=sw.js.map
