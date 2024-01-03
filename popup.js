document.getElementById('get-summary').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        console.log("正在发送消息到 content.js");
        chrome.tabs.sendMessage(activeTab.id, {"action": "fetch_book_summary"}, function(response) {
            if (chrome.runtime.lastError) {
                // 处理错误情况
                console.error(chrome.runtime.lastError.message);
            } else {
                // 在这里处理书籍总结的响应
                console.log('从 content.js 收到的响应:', response);
                console.log('书籍总结:', response.summary);
            }
        });
    });
});

document.getElementById('settings').addEventListener('click', function() {
    chrome.runtime.openOptionsPage();
});
