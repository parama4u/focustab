// const tabs = await chrome.tabs.query({
//     url: [
//       "https://developer.chrome.com/docs/webstore/*",
//       "https://developer.chrome.com/docs/extensions/*",
//     ],
//   });

let queryOptions = { };
const tabs = await chrome.tabs.query(queryOptions);


const template = document.getElementById("opentab");
const elements = new Set();


  for (const tab of tabs) {
    const element = template.content.firstElementChild.cloneNode(true);
  
    const title = tab.title.split("-")[0].trim();
    // const pathname = new URL(tab.url).pathname.slice("/docs".length);
    const pathname = tab.url
    element.querySelector(".title").textContent = title;
    element.querySelector(".pathname").textContent = pathname;
    elements.add(element);
  }
  document.querySelector("ul").append(...elements);