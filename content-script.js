(() => {
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;
    if (type === "NEW") {
      getData();
    }
  });
  const getData = () => {
    var jxlsx = document.createElement("script");
    jxlsx.src =
      "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.5/xlsx.full.min.js";
    document.getElementsByTagName("head")[0].appendChild(jxlsx);

    let rates = [];
    let csvRow = [];
    const achats = document.querySelectorAll('[id="middle"]');

    const ventes = document.querySelectorAll('[id="right"]');

    const currency = document.querySelectorAll('[id="left"]');
    for (let i = 0; i < achats.length; i++) {
      rates.push({
        currency: currency[i].innerText,
        achat: achats[i].innerText,
        vente: ventes[i].innerText,
      });
    }
    // console.log(rates);

    const headers = Object.keys(rates[0]);
    csvRow.push(headers.join(","));

    for (let row of rates) {
      const value = headers.map((header) => {
        const val = row[header];
        const escape = ("" + row[header]).replace(/"/g, '\\"');
        return `"${escape}"`;
      });
      csvRow.push(value.join(","));
    }

    const data = csvRow.join("\n");
    console.log(data);

    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "rates.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  getData();
})();
