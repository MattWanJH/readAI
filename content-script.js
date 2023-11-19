charLimit = 1000000;

window.onload = () => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.msg === 'getWordCount' && message.from=='popup') {
            // Get the text content of the entire body of the webpage
            const text = document.body.innerText || document.body.textContent;
            
            // Split the text into words using spaces and various punctuation marks as delimiters
            const words = text.match(/\b\w+\b/g);
            
            // Count the number of words
            const wordCount = words ? words.length : 0;
            
            alert(wordCount);
            //   const wordCount = document.body.innerText.split(/\s+/g).length;
            //   sendResponse({ wordCount });
        }
    });
} 

window.onload = () => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.msg === 'getSummary' && message.from=='popup') {
            //alert("SUMMARIZE!!!");
            function summarize(text) {
                // Use the user's stored API key
                chrome.storage.sync.get('apiKey', key => {
                    // Set up the request to send to the endpoint
                    options = {
                        "method": "POST",
                        "headers": {
                            "accept": "application/json",
                            "content-type": "application/json",
                            "authorization": "Bearer " + key.apiKey
                        },
                        // These are the summarize endpt paramters.
                        // Try playing around with them and reloading the extension to see
                        // how they affect the summarization behaviour.
                        // Reference: https://docs.cohere.com/reference/summarize-2
                        "body": JSON.stringify({
                            "length": "short",
                            "format": "auto",
                            "model": "summarize-xlarge",
                            "extractiveness": "low",
                            "temperature": 0.1,
                            "text": text,
                            // We tell the model that it's summarizing a webpage
                            "additional_command": "of this webpage"
                        })
                    }});
                    
                    fetch('https://api.cohere.ai/v1/summarize', options)
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.summary === undefined) {
                            // If there's no summary in the endpoint's response,
                            // display whatever error message it returned
                            display("There was an error: " + response.message);
                        } else {
                            // Otherwise, display the summary
                            display("tl;dr: " + response.summary);
                        }
                    });
                }};
            });
        }
        
// Returns only the visible text from the page
function getVisibleText() {
// Using jQuery selectors, try to find the page's main body of content,
// often in a content or main element. Fall back to using the whole
// body which is ~universal.
var body = document.querySelector('body')
if (document.querySelector('#content')) {
    body = document.querySelector('#content');
}
if (document.main) {
    body = document.querySelector('main');
}
var allTags = body.getElementsByTagName('*');

let visibleText = [];
var nChars = 0;
// Select all visible text in the body, up to charLimit
for (var i = 0, max = allTags.length; i < max; i++) {
    var elem = allTags[i];
    if (!isHidden(elem)) {
        
        var text = $(elem).contents().filter(function() {
            return this.nodeType == Node.TEXT_NODE;
        });
        if (text === undefined || text.length == 0) {
            continue;
        }
        text = text[0].nodeValue
        nChars += text.length + 1; // for newline
        if (nChars < charLimit) {
            visibleText.push(text);
        } else {
            break
        }
    }
}
// Separate all the text elements with a newline
return visibleText.join('\n');
}

function display(text) {
    // Create a purple header
    header = document.createElement("div");
    header.style.backgroundColor = "#d18ee2";
    header.style.padding = "5px";

    // Write the text with a bit of styling and add it to the header
    tldr = document.createElement("p");
    tldr.textContent = text;
    tldr.style.margin = "10px 100px";
    tldr.style.fontSize = "medium";
    tldr.style.color = "white";
    tldr.style.textAlign = "center";
    tldr.style.fontFamily = "Verdana, Geneva, sans-serif";
    header.appendChild(tldr);

    // Insert the header immediately before the HTML body
    document.body.parentNode.insertBefore(header, document.body);
}

function isHidden(el) {
    var style = window.getComputedStyle(el);
    return ((style.display === 'none') || (style.visibility === 'hidden'))
}