
// Bulding the list

let queryOptions = { };
const tabs = await chrome.tabs.query(queryOptions);
const template = document.getElementById("opentab");
const elements = new Set();

  for (const tab of tabs) {
    const element = template.content.firstElementChild.cloneNode(true);
    const title = tab.title;
    // const pathname = new URL(tab.url).pathname.slice("/docs".length);
    const pathname = tab.url
    element.querySelector(".title").textContent = title;
    // element.querySelector(".pathname").textContent = pathname;
    elements.add(element);
    setConfig();
    getConfig(tab);
  }
  document.querySelector("ul").append(...elements);

  function getConfig(tab){
    let data = chrome.storage.local.get();
    if(tab.title.match(data["title_pattern"]))
      {
        console.log("its a mattch" + tab.title);
    }
    else{
      console.log("Not a match");
    }
  }

  function setConfig(title_pattern = null, url_pattern = null, stale_time = 60){
    let data = {
      title_pattern: "Google Search",
      url_pattern : "google.com",
      stale_time : 60
    };
   chrome.storage.local.set(data);

  }