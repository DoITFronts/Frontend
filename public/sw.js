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
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[n]) return;
    let t = {};
    const r = (e) => a(e, n),
      d = { module: { uri: n }, exports: t, require: r };
    s[n] = Promise.all(c.map((e) => d[e] || r(e))).then((e) => (i(...e), t));
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
          revision: "438bde611576b51b0fb6c1c2ef60ed09",
        },
        {
          url: "/_next/static/chunks/1034-894b2775346f694d.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/1034-894b2775346f694d.js.map",
          revision: "cf6122b8c7389f71bf19f1d46336a700",
        },
        {
          url: "/_next/static/chunks/1082-ba5d4c17201f3b1d.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/1082-ba5d4c17201f3b1d.js.map",
          revision: "b7ec2c615cafb54f8523d092d49b0de7",
        },
        {
          url: "/_next/static/chunks/1228-c216c5ad2c353f1d.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/1228-c216c5ad2c353f1d.js.map",
          revision: "50fe2125afc81be8beb668f4352d429c",
        },
        {
          url: "/_next/static/chunks/13633bf0-3b42f53da5d34119.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/13633bf0-3b42f53da5d34119.js.map",
          revision: "9490b59117ef39755c347ce7f9c7feac",
        },
        {
          url: "/_next/static/chunks/1992-6f6e16cc0ca8c105.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/1992-6f6e16cc0ca8c105.js.map",
          revision: "c21b7dce965b2b9e1744dfa80ff50305",
        },
        {
          url: "/_next/static/chunks/3477.f8d2a8e95ee898d3.js",
          revision: "f8d2a8e95ee898d3",
        },
        {
          url: "/_next/static/chunks/3477.f8d2a8e95ee898d3.js.map",
          revision: "ad942b71bd79662ecf035327a99ecb69",
        },
        {
          url: "/_next/static/chunks/3685-ec6357672a238e00.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/3685-ec6357672a238e00.js.map",
          revision: "7a319c3f7783a8d88116f2256410867e",
        },
        {
          url: "/_next/static/chunks/3908.ce7c53f53eea6dc0.js",
          revision: "ce7c53f53eea6dc0",
        },
        {
          url: "/_next/static/chunks/3908.ce7c53f53eea6dc0.js.map",
          revision: "5ddd3bb4c60c8749f183a5749ab022a6",
        },
        {
          url: "/_next/static/chunks/3910-32d7c1a69979acfc.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/3910-32d7c1a69979acfc.js.map",
          revision: "6937805f8ee14c11ff54e95b3987a0bc",
        },
        {
          url: "/_next/static/chunks/4740.8c950903ed344189.js",
          revision: "8c950903ed344189",
        },
        {
          url: "/_next/static/chunks/4740.8c950903ed344189.js.map",
          revision: "5f3c5248e403a2581ac659e84237af4f",
        },
        {
          url: "/_next/static/chunks/4815-c6b6b2ba244c09ae.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/4815-c6b6b2ba244c09ae.js.map",
          revision: "ef14761a24dcbf373dd8d3db3f0fda2d",
        },
        {
          url: "/_next/static/chunks/4993-d3d739c6948c119c.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/4993-d3d739c6948c119c.js.map",
          revision: "c9b3e304de34688072dd281b0a4b9dc5",
        },
        {
          url: "/_next/static/chunks/4bd1b696-a2ac18057338f07c.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/4bd1b696-a2ac18057338f07c.js.map",
          revision: "38afaee3f667c33d75dbf5ce2b00abf0",
        },
        {
          url: "/_next/static/chunks/5061-60e275ccbcb59ff0.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/5061-60e275ccbcb59ff0.js.map",
          revision: "cdf34bdafe6a1337ffcee395c883b45a",
        },
        {
          url: "/_next/static/chunks/5375-d136162a0cf752b3.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/5375-d136162a0cf752b3.js.map",
          revision: "7a46fc55b5da20995fa2632ef06ad598",
        },
        {
          url: "/_next/static/chunks/6018-b8b124df938973f6.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/6018-b8b124df938973f6.js.map",
          revision: "1b9351bb9b83af584d409e028629bc35",
        },
        {
          url: "/_next/static/chunks/6259-db09cd3830f80bc8.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/6259-db09cd3830f80bc8.js.map",
          revision: "7134c3dd333f3a9c385889985df93e07",
        },
        {
          url: "/_next/static/chunks/722-e50ecd22a758d1b2.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/722-e50ecd22a758d1b2.js.map",
          revision: "e78eb19112224dc0aa90b3ac77e96f3a",
        },
        {
          url: "/_next/static/chunks/7474-cb83ea7721c52d8c.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/7474-cb83ea7721c52d8c.js.map",
          revision: "0265d238e55265b0280c656cd117074b",
        },
        {
          url: "/_next/static/chunks/7728-09e4a28d6b78abbe.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/7728-09e4a28d6b78abbe.js.map",
          revision: "d2773d146a5c98942bc91e35b6f50a4a",
        },
        {
          url: "/_next/static/chunks/790-e5dfaf1317b57180.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/790-e5dfaf1317b57180.js.map",
          revision: "c9151c254cbfce9727b7396af6de3779",
        },
        {
          url: "/_next/static/chunks/8084-6a9bd46445555034.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/8084-6a9bd46445555034.js.map",
          revision: "588e7e7b5c3ee4a1741b907996886268",
        },
        {
          url: "/_next/static/chunks/8808-52d0b4043dc9b023.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/8808-52d0b4043dc9b023.js.map",
          revision: "7fbf55c75ca623dba34e9e914d55104d",
        },
        {
          url: "/_next/static/chunks/9279-4da6d269bb5f3647.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/9279-4da6d269bb5f3647.js.map",
          revision: "5d59dee534e3c1496a883f4c8cb05793",
        },
        {
          url: "/_next/static/chunks/9742-1950af6722a6a15d.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/9742-1950af6722a6a15d.js.map",
          revision: "76a1ac81a1f5172acfda67f6b5ede5e5",
        },
        {
          url: "/_next/static/chunks/9846-f734f3acb1375edb.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/9846-f734f3acb1375edb.js.map",
          revision: "d1956e68fad2bb9f80b3ec7da61e0224",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-e419c1f00c3ca9b2.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/layout-ad7848df9d592301.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/layout-ad7848df9d592301.js.map",
          revision: "5190d5aded34eaa635e4f1f1ebf5c573",
        },
        {
          url: "/_next/static/chunks/app/liked/page-80164d0e8fb32414.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/liked/page-80164d0e8fb32414.js.map",
          revision: "df752b64f4200c13680cbce9422541e7",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@bottombar/page-b883bb0f1a6702c1.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@bottombar/page-b883bb0f1a6702c1.js.map",
          revision: "8c7c91543699461017378a66cf7c05a0",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@card/page-a7ba69909f7398c4.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@card/page-a7ba69909f7398c4.js.map",
          revision: "39ef8c9579ed5ba1d9b9e4067d0f36bc",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@description/page-2b4eab92b563621c.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@description/page-2b4eab92b563621c.js.map",
          revision: "9f960d93d013ee56e68ed7ddc85325d4",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@host/page-d5daf10000eaa0b8.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@host/page-d5daf10000eaa0b8.js.map",
          revision: "e6c3f3d48ec6e157a1b3e18cb7250a97",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@location/page-28ad6270ce9db9d5.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@location/page-28ad6270ce9db9d5.js.map",
          revision: "d4a4b8e2339dcd37702f15a9be75880a",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@reviews/page-23767925016581f6.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@reviews/page-23767925016581f6.js.map",
          revision: "f96f049975c7956dd2a4627f1ed541b5",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/layout-a1b94c9692673bd6.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/layout-a1b94c9692673bd6.js.map",
          revision: "2ae5470342ed467c00a7c5daeed54b47",
        },
        {
          url: "/_next/static/chunks/app/meeting/list/@meetingList/page-6236f9123d2e9e4f.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/meeting/list/@meetingList/page-6236f9123d2e9e4f.js.map",
          revision: "a0247e9bf0b6e9ad4e386aeb9e3c93df",
        },
        {
          url: "/_next/static/chunks/app/meeting/list/@title/page-ef3e36c18bc81d54.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/meeting/list/@title/page-ef3e36c18bc81d54.js.map",
          revision: "91290be8ab62f273503b21dcc9bbd949",
        },
        {
          url: "/_next/static/chunks/app/meeting/list/layout-528254df42ee1cc9.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/meeting/list/layout-528254df42ee1cc9.js.map",
          revision: "9fb3876325c253d178e2c70f1621f194",
        },
        {
          url: "/_next/static/chunks/app/myprofile/@meeting/page-af0aecab1663805e.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/myprofile/@meeting/page-af0aecab1663805e.js.map",
          revision: "fa37128b1dc9ce0c37f8fdc8084156bc",
        },
        {
          url: "/_next/static/chunks/app/myprofile/@profile/page-0c5ed60bb162de6d.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/myprofile/@profile/page-0c5ed60bb162de6d.js.map",
          revision: "28e1cf4c206cc7c2c56bdcf51cd11b8b",
        },
        {
          url: "/_next/static/chunks/app/myprofile/layout-9aaf9a0d1e3be0b7.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/not-found-9057305ca77e839e.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/not-found-9057305ca77e839e.js.map",
          revision: "5e17facb82b9c8bd88a993d5bbd2e162",
        },
        {
          url: "/_next/static/chunks/app/page-01c6563767e74316.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/page-01c6563767e74316.js.map",
          revision: "549bbfaa83c5062b0bcedd8213da7248",
        },
        {
          url: "/_next/static/chunks/app/review/@reviewList/page-2638519f2c358475.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/review/@reviewList/page-2638519f2c358475.js.map",
          revision: "1226524942423772feb10b417697503a",
        },
        {
          url: "/_next/static/chunks/app/review/@title/page-651d35ecc7eee4d9.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/review/layout-16f289942e6d6c14.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/review/layout-16f289942e6d6c14.js.map",
          revision: "2ebec54d0f03fb0a410959170e9b8d61",
        },
        {
          url: "/_next/static/chunks/app/user/signin/page-cccfc4a2c869b9fc.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/user/signin/page-cccfc4a2c869b9fc.js.map",
          revision: "f8820ef102cafd67426a8414bed88d98",
        },
        {
          url: "/_next/static/chunks/app/user/signup/page-92e87f3ea46c80be.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/app/user/signup/page-92e87f3ea46c80be.js.map",
          revision: "b6d1010e1561b7e822fa101e72a8e613",
        },
        {
          url: "/_next/static/chunks/c16f53c3-7e628cfada1172cd.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/c16f53c3-7e628cfada1172cd.js.map",
          revision: "e244c283d55c4f3c5ed29b0b00fae5c3",
        },
        {
          url: "/_next/static/chunks/dc112a36-7aeb8aeb535c3b24.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/dc112a36-7aeb8aeb535c3b24.js.map",
          revision: "807937164b2947c404a763e2e4e020fe",
        },
        {
          url: "/_next/static/chunks/framework-01ff2bbc6a92c1cb.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/framework-01ff2bbc6a92c1cb.js.map",
          revision: "24a5b0aa026479b9e4535fefd391343d",
        },
        {
          url: "/_next/static/chunks/main-app-4cb4d98230781fa5.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/main-app-4cb4d98230781fa5.js.map",
          revision: "f735f8f62e735bdc167f9ff2e2a3bb89",
        },
        {
          url: "/_next/static/chunks/main-c78619e47918724d.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/main-c78619e47918724d.js.map",
          revision: "8f11dc055094f75f5f0689ff72ee86b5",
        },
        {
          url: "/_next/static/chunks/pages/_app-51efd557558a9422.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/pages/_app-51efd557558a9422.js.map",
          revision: "dae0de650eb21ee5ffda30389dfa3e4e",
        },
        {
          url: "/_next/static/chunks/pages/_error-7a7e97da818efc42.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/pages/_error-7a7e97da818efc42.js.map",
          revision: "3539761c379ff3cc931c4210ba58c719",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-ac9a812b51032a49.js",
          revision: "nYUkUr-zbxTJMg12NVKzH",
        },
        {
          url: "/_next/static/chunks/webpack-ac9a812b51032a49.js.map",
          revision: "695205e61e984ff10ae2b8ebe79a2713",
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
          url: "/_next/static/css/0e55a4a16c18a862.css",
          revision: "0e55a4a16c18a862",
        },
        {
          url: "/_next/static/css/0e55a4a16c18a862.css.map",
          revision: "3af5986374a2bdff4e08f17d3b48e0df",
        },
        {
          url: "/_next/static/css/7d7bae49d5e0d686.css",
          revision: "7d7bae49d5e0d686",
        },
        {
          url: "/_next/static/css/7d7bae49d5e0d686.css.map",
          revision: "471aff8e49ab02ae83300d4ede2a961d",
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
          url: "/_next/static/nYUkUr-zbxTJMg12NVKzH/_buildManifest.js",
          revision: "5b1648c7ad33c3817baa26b211641451",
        },
        {
          url: "/_next/static/nYUkUr-zbxTJMg12NVKzH/_ssgManifest.js",
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
          url: "/assets/chat/chat.svg",
          revision: "8d190aebaedc734d1c9837cd0779d0f8",
        },
        {
          url: "/assets/chat/send.svg",
          revision: "d65f1782dabf6b463bce4a6b1fa1b7ec",
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
          url: "/fallback/fallback_alcohol.png",
          revision: "ef15e15ccc4487bbf268456e47e8441c",
        },
        {
          url: "/fallback/fallback_board_game.png",
          revision: "dac0e29c9b271cc36875714ba36ad985",
        },
        {
          url: "/fallback/fallback_cafe.png",
          revision: "fa2fd4f605c306f0ce7f07a096d1cb88",
        },
        {
          url: "/fallback/fallback_default.png",
          revision: "56d87349eec0256365f96cb9dd857fef",
        },
        {
          url: "/fallback/fallback_gourmet.png",
          revision: "86d17d23cd272fc07fedabd593cb926c",
        },
        {
          url: "/fonts/DungGeunMo.woff2",
          revision: "60513aaa7442397557e52236ec6f8c51",
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
