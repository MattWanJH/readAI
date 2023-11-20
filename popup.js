
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#mybutton").addEventListener("click", test);
    function test() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const tab = tabs[0];
            chrome.tabs.sendMessage(tab.id, {from: 'popup', msg: 'getWordCount'});
            }
        )
    }
})

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#summarizebutton").addEventListener("click", test2);
    function test2() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const tab = tabs[0];
            chrome.tabs.sendMessage(tab.id, {from: 'popup', msg: 'getSummary'});
            }
        )
    }
})


