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