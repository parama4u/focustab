
// Bulding the list

let queryOptions = { };
const tabs = await chrome.tabs.query(queryOptions);
const template = document.getElementById("opentab");
const elements = new Set();

  for (const tab of tabs) {
    const element = template.content.firstElementChild.cloneNode(true);
    const title = tab.title;
    // const pathname = new URL(tab.url).pathname.slice("/docs".length);
    const pathname = tab.url;
    element.querySelector(".title").textContent = title;
    // element.querySelector(".pathname").textContent = pathname;
    elements.add(element);
    setConfig();
    getConfig(tab);
  }
  document.querySelector("ul").append(...elements);

  function getConfig(tab){
                const res = chrome.storage.local.get("title_pattern",function(title_pattern){
                          return tab.title.search(title_pattern.title_pattern);
                        });
                console.log (tab.title + ":" + res );
      }  
        

  function setConfig(title_pattern = null, url_pattern = null, stale_time = 60){ 
    let data = {
      title_pattern: "Google Search",
      url_pattern : "google.com",
      stale_time : 60
    };
   chrome.storage.local.set(data);

  }