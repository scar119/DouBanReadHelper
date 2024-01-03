// content.js
console.log("content script loaded");

// 创建对话框结构
function createDialog() {
  const dialog = document.createElement('div');
  dialog.id = 'chat-with-books';
  dialog.style.position = 'fixed';
  dialog.style.right = '20px';
  dialog.style.bottom = '20px';
  dialog.style.width = '300px';
  dialog.style.backgroundColor = 'white';
  dialog.style.padding = '10px';
  dialog.style.border = '1px solid black';
  dialog.style.zIndex = '1000';
  dialog.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  dialog.innerHTML = `
    <textarea id="user-input" placeholder="请输入您的问题..." style="width: 100%; box-sizing: border-box;"></textarea>
    <button id="submit-question" style="width: 100%; margin-top: 10px;">提交</button>
    <div id="response-area" style="margin-top: 10px;">等待回复...</div>
  `;
  document.body.appendChild(dialog);
}

function fetchBookSummary(bookTitle, apiKey) {
    const prompt = `请根据以下书籍信息,简洁明了，准确无误的，语句通顺连贯的给出书籍总结：书名《${bookTitle}》。`; // 构建一个适当的提示

    fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 150
        })
    })
    .then(response => response.json())
    .then(data => {
        const summary = data.choices[0].text.trim();
        document.getElementById('response-area').innerText = summary; // 显示总结
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('response-area').innerText = '获取书籍总结时出错。';
    });
}

// 主逻辑
function main() {
    createDialog(); // 创建对话框
    let bookTitle = document.title; // 示例：使用网页标题作为书籍名称

    // 获取存储的API Key并尝试获取书籍总结
    chrome.storage.sync.get('openAIKey', function(data) {
        if (data.openAIKey) {
            fetchBookSummary(bookTitle, data.openAIKey); // 使用API Key和书籍标题获取总结
        } else {
            document.getElementById('response-area').innerText = '请先设置您的OpenAI API Key!';
        }
    });
}

// 运行主逻辑
main();