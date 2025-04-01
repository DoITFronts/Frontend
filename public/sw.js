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
    const f = (e) => a(e, t),
      r = { module: { uri: t }, exports: n, require: f };
    s[t] = Promise.all(c.map((e) => r[e] || f(e))).then((e) => (i(...e), n));
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
          revision: "50872c57ee2e66294d777bd169b62d0f",
        },
        {
          url: "/_next/static/0sCNQf5dzfCgcB1FNu1IU/_buildManifest.js",
          revision: "54c84142cb4f916c97b4a2d0dd966cfa",
        },
        {
          url: "/_next/static/0sCNQf5dzfCgcB1FNu1IU/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/1034-894b2775346f694d.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/1034-894b2775346f694d.js.map",
          revision: "c5b61b77f946e89b1f5bbeddbd7e8e51",
        },
        {
          url: "/_next/static/chunks/1228-c216c5ad2c353f1d.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/1228-c216c5ad2c353f1d.js.map",
          revision: "50fe2125afc81be8beb668f4352d429c",
        },
        {
          url: "/_next/static/chunks/13633bf0-3b42f53da5d34119.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/13633bf0-3b42f53da5d34119.js.map",
          revision: "9490b59117ef39755c347ce7f9c7feac",
        },
        {
          url: "/_next/static/chunks/1992-6f6e16cc0ca8c105.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/1992-6f6e16cc0ca8c105.js.map",
          revision: "c21b7dce965b2b9e1744dfa80ff50305",
        },
        {
          url: "/_next/static/chunks/2074-f728950600c24441.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/2074-f728950600c24441.js.map",
          revision: "a8cd9c963d42b8c0f4b984730cfff98b",
        },
        {
          url: "/_next/static/chunks/2421-838a6f64c12908b2.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/2421-838a6f64c12908b2.js.map",
          revision: "e759f6b0de25b150568405aade8df555",
        },
        {
          url: "/_next/static/chunks/245-27774660e1294120.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/245-27774660e1294120.js.map",
          revision: "e531a693a7281b49cfb4d51652d5448e",
        },
        {
          url: "/_next/static/chunks/2997-862bd94c7519c293.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/2997-862bd94c7519c293.js.map",
          revision: "149acb4271c4abe92fce530416f84450",
        },
        {
          url: "/_next/static/chunks/3685-ec6357672a238e00.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/3685-ec6357672a238e00.js.map",
          revision: "7a319c3f7783a8d88116f2256410867e",
        },
        {
          url: "/_next/static/chunks/3910-32d7c1a69979acfc.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
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
          url: "/_next/static/chunks/4993-d3d739c6948c119c.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/4993-d3d739c6948c119c.js.map",
          revision: "c9b3e304de34688072dd281b0a4b9dc5",
        },
        {
          url: "/_next/static/chunks/4bd1b696-a2ac18057338f07c.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/4bd1b696-a2ac18057338f07c.js.map",
          revision: "38afaee3f667c33d75dbf5ce2b00abf0",
        },
        {
          url: "/_next/static/chunks/5521-a527d2e90a844dc9.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/5521-a527d2e90a844dc9.js.map",
          revision: "ff92ce3cd3280084a6c5b18377156c2e",
        },
        {
          url: "/_next/static/chunks/5784-d7b152f4f58aa391.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/5784-d7b152f4f58aa391.js.map",
          revision: "ec627c5f9aeae29a3c3eed277c69d196",
        },
        {
          url: "/_next/static/chunks/722-e50ecd22a758d1b2.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/722-e50ecd22a758d1b2.js.map",
          revision: "e78eb19112224dc0aa90b3ac77e96f3a",
        },
        {
          url: "/_next/static/chunks/7728-09e4a28d6b78abbe.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/7728-09e4a28d6b78abbe.js.map",
          revision: "d2773d146a5c98942bc91e35b6f50a4a",
        },
        {
          url: "/_next/static/chunks/773-26edcf98d20c6681.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/773-26edcf98d20c6681.js.map",
          revision: "a78db4af53ed58899180de06565fb58c",
        },
        {
          url: "/_next/static/chunks/7848-5204b6a7e06c805e.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/7848-5204b6a7e06c805e.js.map",
          revision: "d632b1dd9ceadd94335bc5928bc56d24",
        },
        {
          url: "/_next/static/chunks/8084-6a9bd46445555034.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/8084-6a9bd46445555034.js.map",
          revision: "588e7e7b5c3ee4a1741b907996886268",
        },
        {
          url: "/_next/static/chunks/8765-1920b7f4329da2ab.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/8765-1920b7f4329da2ab.js.map",
          revision: "847ac3d93bfc25db25fb0744677fb0f7",
        },
        {
          url: "/_next/static/chunks/8808-52d0b4043dc9b023.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/8808-52d0b4043dc9b023.js.map",
          revision: "7fbf55c75ca623dba34e9e914d55104d",
        },
        {
          url: "/_next/static/chunks/9341-bb6937b583a17552.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/9341-bb6937b583a17552.js.map",
          revision: "32fcc558837b5ee5397cd99742fe4c95",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-e419c1f00c3ca9b2.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/layout-0e1d30000a4378c6.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/layout-0e1d30000a4378c6.js.map",
          revision: "e89a924fb1138fedf5bd45d8bbfd3699",
        },
        {
          url: "/_next/static/chunks/app/liked/page-e41ccc107d251187.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/liked/page-e41ccc107d251187.js.map",
          revision: "44005322deb059e192f690e2788fc01f",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@bottombar/page-9f89ac45f14c9d8a.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@bottombar/page-9f89ac45f14c9d8a.js.map",
          revision: "f1d160d1699a5bcd488e234fc032e79a",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@card/page-c6cdeba1b899d33e.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@card/page-c6cdeba1b899d33e.js.map",
          revision: "4ed23278c0d4b7be5cc32d7be015807f",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@description/page-ad504c4709d23559.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@description/page-ad504c4709d23559.js.map",
          revision: "4ae346df658bcf3c7ed5f7251542b105",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@host/page-1514e0362ba5f5d2.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@host/page-1514e0362ba5f5d2.js.map",
          revision: "115ca8694109847603cb8db51a678874",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@location/page-0a5978539bb34c5b.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@location/page-0a5978539bb34c5b.js.map",
          revision: "9c6c6966da51f0d32c99454245d37893",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@reviews/page-4392976f1e5ab4a8.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/@reviews/page-4392976f1e5ab4a8.js.map",
          revision: "01417793432aedaa9b66eb1cd902ee1f",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/layout-445a31154f98bc16.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/meeting/detail/%5Bid%5D/layout-445a31154f98bc16.js.map",
          revision: "8dc0c2b13fd3d730211043b2c588745b",
        },
        {
          url: "/_next/static/chunks/app/meeting/list/@meetingList/page-79a82990b6a5c4d5.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/meeting/list/@meetingList/page-79a82990b6a5c4d5.js.map",
          revision: "113f55953378bb858466a4525d096698",
        },
        {
          url: "/_next/static/chunks/app/meeting/list/@title/page-319f0d303e2e654f.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/meeting/list/@title/page-319f0d303e2e654f.js.map",
          revision: "31345bdc2cf5427e8078781abe59abb0",
        },
        {
          url: "/_next/static/chunks/app/meeting/list/layout-1b05b7086171c8e2.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/meeting/list/layout-1b05b7086171c8e2.js.map",
          revision: "a2ec70af767433e3af1ead8966273a8d",
        },
        {
          url: "/_next/static/chunks/app/myprofile/@meeting/page-b03bfa33925fb2aa.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/myprofile/@meeting/page-b03bfa33925fb2aa.js.map",
          revision: "f5557d4d7c4addf558a3340211c26a8c",
        },
        {
          url: "/_next/static/chunks/app/myprofile/@profile/page-4e989e15cfaa0040.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/myprofile/@profile/page-4e989e15cfaa0040.js.map",
          revision: "609b43063c1f69c6c265b50a18d3f4a6",
        },
        {
          url: "/_next/static/chunks/app/myprofile/layout-9aaf9a0d1e3be0b7.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/not-found-c0aa38b0de6cd239.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/not-found-c0aa38b0de6cd239.js.map",
          revision: "b596a6a63b6338dbc3d8d9060dd556ba",
        },
        {
          url: "/_next/static/chunks/app/page-0b4ea1fa9f2fe0ae.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/page-0b4ea1fa9f2fe0ae.js.map",
          revision: "9492389137e0ee62bee03a761dab50db",
        },
        {
          url: "/_next/static/chunks/app/review/@reviewList/page-d96149689860ab49.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/review/@reviewList/page-d96149689860ab49.js.map",
          revision: "e31c06aecc08a672613eea8b123893fa",
        },
        {
          url: "/_next/static/chunks/app/review/@title/page-651d35ecc7eee4d9.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/review/layout-c5b4759d7c361149.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/review/layout-c5b4759d7c361149.js.map",
          revision: "ba7887bff990da9c934e522118c77fbe",
        },
        {
          url: "/_next/static/chunks/app/user/signin/page-05d91f4ae3c9adb3.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/user/signin/page-05d91f4ae3c9adb3.js.map",
          revision: "f6f68931579a8b8406c3013240634fba",
        },
        {
          url: "/_next/static/chunks/app/user/signup/page-5a1e5f069077a0b9.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/app/user/signup/page-5a1e5f069077a0b9.js.map",
          revision: "183cf81ddd5c94b23607cb67b09caf1c",
        },
        {
          url: "/_next/static/chunks/c16f53c3-7e628cfada1172cd.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/c16f53c3-7e628cfada1172cd.js.map",
          revision: "e244c283d55c4f3c5ed29b0b00fae5c3",
        },
        {
          url: "/_next/static/chunks/dc112a36-7aeb8aeb535c3b24.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/dc112a36-7aeb8aeb535c3b24.js.map",
          revision: "807937164b2947c404a763e2e4e020fe",
        },
        {
          url: "/_next/static/chunks/framework-01ff2bbc6a92c1cb.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/framework-01ff2bbc6a92c1cb.js.map",
          revision: "24a5b0aa026479b9e4535fefd391343d",
        },
        {
          url: "/_next/static/chunks/main-app-f09fbd17622eacf9.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/main-app-f09fbd17622eacf9.js.map",
          revision: "06d1612d07e2f5abdd1a69bdb35284e7",
        },
        {
          url: "/_next/static/chunks/main-eca669efbdc2132b.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/main-eca669efbdc2132b.js.map",
          revision: "7f8c4b861a9a6f0209f083fe15411961",
        },
        {
          url: "/_next/static/chunks/pages/_app-119e0983628b43ff.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/pages/_app-119e0983628b43ff.js.map",
          revision: "93340a1ea0f9d72cdf9d3fc193c8339d",
        },
        {
          url: "/_next/static/chunks/pages/_error-2dcd09d4b4b29a8f.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/pages/_error-2dcd09d4b4b29a8f.js.map",
          revision: "40fe23c5073bebeb5edc3bcfd2dbf818",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-ca5b3802f20fc7fb.js",
          revision: "0sCNQf5dzfCgcB1FNu1IU",
        },
        {
          url: "/_next/static/chunks/webpack-ca5b3802f20fc7fb.js.map",
          revision: "8dd3e2a29772e663f1b04e3762861095",
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
          url: "/_next/static/css/7d7bae49d5e0d686.css",
          revision: "7d7bae49d5e0d686",
        },
        {
          url: "/_next/static/css/7d7bae49d5e0d686.css.map",
          revision: "471aff8e49ab02ae83300d4ede2a961d",
        },
        {
          url: "/_next/static/css/c76b3368c770cdd3.css",
          revision: "c76b3368c770cdd3",
        },
        {
          url: "/_next/static/css/c76b3368c770cdd3.css.map",
          revision: "94ae7ef11038eef133646a43905287f3",
        },
        {
          url: "/_next/static/media/calendar.6eca7a71.svg",
          revision: "cd7c28aab95466a1a293cf27c85bfb2f",
        },
        {
          url: "/_next/static/media/logo.924d08a9.svg",
          revision: "e6b82f2ba3a71c02dd98468106e188e3",
        },
        {
          url: "/_next/static/media/logoWhite.cdd7be8f.svg",
          revision: "4c87d09893030c735023897315d15c3c",
        },
        {
          url: "/_next/static/media/section02.2c914dfd.svg",
          revision: "5ff53e23dbc21f3354978c7f37b9793c",
        },
        {
          url: "/_next/static/media/userProfile.82791342.svg",
          revision: "110fbbc40ea7821a4332f6d00702da28",
        },
        { url: "/assets/X.svg", revision: "73eaf4a69d8072906acc641214ea3496" },
        {
          url: "/assets/calendar.svg",
          revision: "cd7c28aab95466a1a293cf27c85bfb2f",
        },
        {
          url: "/assets/card/example_image.png",
          revision: "1cc276b03bbedaac5b4cfbb3ed26668d",
        },
        {
          url: "/assets/card/location-marker.svg",
          revision: "0cb6aeb07cd2efce4fd460087caa673a",
        },
        {
          url: "/assets/card/user.svg",
          revision: "dc00c71676d1788d370441fa4b2e3ae7",
        },
        {
          url: "/assets/chat/chat.svg",
          revision: "8fa5e61b183ea081ca12e41d53859113",
        },
        {
          url: "/assets/chat/send.svg",
          revision: "fde3dfeee7503a7b68a821355376110d",
        },
        {
          url: "/assets/chevron_down.svg",
          revision: "af28a9d9a29bf231ea76505b1f6eb4bb",
        },
        {
          url: "/assets/cursor/cursor-click.svg",
          revision: "c0b176c5b0081b7abec9a8c13758eaf7",
        },
        {
          url: "/assets/cursor/cursor-hover.svg",
          revision: "b2b23c78f0a3e98d83f61cf3d42a71cb",
        },
        {
          url: "/assets/cursor/cursor.svg",
          revision: "5c8c32d7575fd9ffc2e8af450b196f5f",
        },
        {
          url: "/assets/exit.svg",
          revision: "3832f58753bf51ecaae36a3e05420f95",
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
          revision: "5e04108e709a3c36c897f29493534d84",
        },
        {
          url: "/assets/landing/section02.svg",
          revision: "5ff53e23dbc21f3354978c7f37b9793c",
        },
        {
          url: "/assets/logo/logo.svg",
          revision: "e6b82f2ba3a71c02dd98468106e188e3",
        },
        {
          url: "/assets/logo/logoWhite.svg",
          revision: "4c87d09893030c735023897315d15c3c",
        },
        {
          url: "/assets/logo/splash.svg",
          revision: "c467de376d0f5c3b3e7b4e75281b2a86",
        },
        {
          url: "/assets/profile/avatar.svg",
          revision: "e10b2248457d04b926e4682be480cab1",
        },
        {
          url: "/assets/profile/editAvatar.svg",
          revision: "cb0feda6c1397c0cf3b43fd2d574ebc3",
        },
        {
          url: "/assets/profile/profileCardBg.svg",
          revision: "4a80c1eed0048e3c43627f23abf3925e",
        },
        {
          url: "/assets/profile/userProfileDarkDefault.svg",
          revision: "4b3777b8fdb77e6b98dd01d89f8ffa99",
        },
        {
          url: "/assets/profile/userProfileDefault.svg",
          revision: "d7e12551b1895a960260da2734cb4d39",
        },
        {
          url: "/assets/review/heart_empty.svg",
          revision: "91a2ccc7f7592c3f8251020f7f5441b6",
        },
        {
          url: "/assets/review/heart_full.svg",
          revision: "c17613b5bb48a0f089cecc66a3c57dea",
        },
        {
          url: "/assets/review/reviewIcon.svg",
          revision: "c328f66e45ee846ad0f53d5c4b5aca36",
        },
        {
          url: "/assets/sort.svg",
          revision: "e99e680137b73366945bd1085857a870",
        },
        {
          url: "/assets/user/kakaoLogo.svg",
          revision: "1df9b044c9b5b089457463c5d44929ed",
        },
        {
          url: "/assets/user/unVisibility.svg",
          revision: "945ff85906008c34d22dfbd9531ff8df",
        },
        {
          url: "/assets/user/visibility.svg",
          revision: "52fbac21f69771d43aed8c87b8224807",
        },
        {
          url: "/assets/userProfile.svg",
          revision: "110fbbc40ea7821a4332f6d00702da28",
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
        { url: "/offline.html", revision: "138249eeb7919cfc73d746e552808c4d" },
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
