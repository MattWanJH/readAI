function generateWordCount() {
    window.alert("test");

     // Get the text content of the entire body of the webpage
  const text = document.body.innerText || document.body.textContent;

  // Split the text into words using spaces and various punctuation marks as delimiters
  const words = text.match(/\b\w+\b/g);

  // Count the number of words
  const wordCount = words ? words.length : 0;
  alert(wordCount);

  //return wordCount;

    // text = document.querySelector("body").innertext;
    // window.alert("test2");
    // alert("word count: "+ text);

    // const wordCount = document.body.innerText.split(/\s+/g).length;
    //sendResponse({ wordCount });

    /*
    let wordcount = 0;
        var data=clickData.selectionText;
        for(let i=0;i<data.length;i++)
        {
            if(data[i]===' ')
            {
                if (data[i + 1]!==' ')
                {
                    wordcount++;
                }
            }
        }
        wordcount=wordcount+1;//To count the last word of selection. */
        // alert("Number of words in the given selection is "+wordCount);
}

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
            alert(summarize(getVisibleText()));
            const tab = tabs[0];
            chrome.tabs.sendMessage(tab.id, {from: 'popup', msg: 'getSummary'});
            }
        )
    }
})


