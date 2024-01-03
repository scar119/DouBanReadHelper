chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === "install") {
        console.log("扩展已安装");
        // 在这里执行安装时的初始化操作
    } else if (details.reason === "update") {
        console.log("扩展已更新");
        // 在这里执行更新时的操作
    }
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "fetch_book_summary") {
        console.log("收到获取书籍总结的请求");

        // 这里实现与OpenAI API的交互
        // 您需要根据API的要求来调整请求的细节
        // 示例代码
        console.log("正在向 OpenAI API 发送请求...");
        fetch('https://api.openai.com/v1/engines/davinci/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + request.apiKey
            },
            body: JSON.stringify({
                prompt: request.question, // 使用问题作为提示
                max_tokens: 100
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("从 OpenAI API 收到的响应:", data);
            sendResponse({data: data});
        })
        .catch(error => {
            console.error('与 OpenAI API 交互时出错:', error);
            console.error('Error:', error);
            sendResponse({error: error});
        });
        return true; // 保持消息通道开放
    }
});
