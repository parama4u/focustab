
// Bulding the list

let queryOptions = { };
const tabs = await chrome.tabs.query(queryOptions);
const template = document.getElementById("opentab");
const settings = document.getElementById("settings")
const elements = new Set();

  // for (const tab of tabs) {
  //   const element = template.content.firstElementChild.cloneNode(true);
  //   const title = tab.title;
  //   const pathname = tab.url;
  //   element.querySelector(".title").textContent = title;
  //   elements.add(element);
  //   setConfig(tab.id.toString(),tab.title,tab.url);
  //   let test = Object.getOwnPropertyNames(getConfig(tab));
  //   console.log("result:" + test);
  // }
  // document.querySelector("ul").append(...elements);

  async function getCurrentTab() {
    //just for the active tab
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    const element = template.content.firstElementChild.cloneNode(true);
    element.querySelector(".title").textContent = "Current:" + tab.title;
    element.querySelector(".movetab").hidden = true;
    document.querySelector(".items").append(element);
    return tab;
  }

  async function getOpenTabs(){
    //for all inactive tabs
    let queryOptions = { active: false };
    const tabs = await chrome.tabs.query(queryOptions);
    for (const tab of tabs) {
      const element = template.content.firstElementChild.cloneNode(true);
      element.querySelector(".title").textContent = tab.title;
      element.querySelector(".movetab").addEventListener("click",
                                                                function(){
                                                                openTab(tab.id);
                                                                }  
                                                        )
      element.querySelector(".navsetting").addEventListener("click",
                                                        function(){
                                                          toggleSettings(tab);
                                                        }  
                                                )
      elements.add(element);
    }
    document.querySelector(".items").append(...elements);
  }
  
  function openTab(tab_id){
    //To make the tab active 
    chrome.tabs.update(tab_id, {selected: true})
  }

  function toggleSettings(tab,show=true){
    if(show){
      document.querySelector("#itemlist").classList.add("hide")
      const element = settings.content.cloneNode(true);
      element.querySelector(".save").addEventListener("click",
                                                                function(){
                                                                toggleSettings(tab,false);
                                                                }  
                                                        )
      document.querySelector(".setitems").append(element);
      document.querySelector("#pgesettings").classList.remove("hide")
    }
    else{
      document.querySelector("#itemlist").classList.remove("hide")
      document.querySelector("#pgesettings").classList.add("hide")

    }
    
  }

  getCurrentTab();
  getOpenTabs();

  function getConfig(tab){
              let res = {}
              console.log(tab.id);
              let tab_id=tab.id.toString();
              chrome.storage.local.get(tab_id,function(data){ 
                        Object.assign(res,data);
                        console.log("Result0:"+ data[tab_id].stale_config);  
                        }
                        );
                      console.log("Result1:"+ data[tab_id]);
                      return res;
                      }
  
  function closeTab(tab_id)
        {
          //call this function when stale_time >= config time
          return;
        }
        

  function setConfig(tab_id=null,title_pattern=null, url_pattern = null, stale_time = 60){ 
    let config = {
      title_pattern: title_pattern,
      url_pattern: url_pattern,
      stale_config: stale_time,
      stale_current:0,
    };
    let data = {};
    data[tab_id] = config;
    console.log("Setting config" + data[tab_id].stale_config + " for:" + tab_id);
    chrome.storage.local.set(data);

  }

  function removeConfig(tab_id)
  {
  return;
  }