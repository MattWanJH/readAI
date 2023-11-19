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
        };

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
    });
}