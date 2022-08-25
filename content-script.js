(() => {
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;
    if (type === "NEW") {
      //   currentVideo = videoId;
      //   newVideoLoaded();
      getData();
    } else if (type === "PLAY") {
      //   youtubePlayer.currentTime = value;
    } else if (type === "DELETE") {
      //   currentVideoBookmarks = currentVideoBookmarks.filter(
      //     (b) => b.time != value
      //   );
      //   chrome.storage.sync.set({
      //     [currentVideo]: JSON.stringify(currentVideoBookmarks),
      //   });
      //   response(currentVideoBookmarks);
    }
  });
  const getData = () => {
    // const xlsx = require("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.5/xlsx.full.min.js");
    let rate = [];
    const achats = document.querySelectorAll('[id="middle"]');

    const ventes = document.querySelectorAll('[id="right"]');

    const currency = document.querySelectorAll('[id="left"]');
    for (let i = 0; i < achats.length; i++) {
      rate.push({
        currency: currency[i].innerText,
        achat: achats[i].innerText,
        vente: ventes[i].innerText,
      });
    }
    console.log(rate);
    var myFile = "rate.xlsx";
    var myWorkSheet = xlsx.utils.json_to_sheet(rate);
    var myWorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(myWorkBook, myWorkSheet, "rates");
    xlsx.writeFile(myWorkBook, myFile);
  };
  //   newVideoLoaded();
  getData();
})();
