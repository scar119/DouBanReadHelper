document.getElementById('save').addEventListener('click', function() {
    var apiKey = document.getElementById('api-key').value;
    chrome.storage.sync.set({ 'openAIKey': apiKey }, function() {
        console.log('API Key saved');
        alert('API Key saved successfully!');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('openAIKey', function(data) {
        if (data.openAIKey) {
            document.getElementById('api-key').value = data.openAIKey;
        }
    });
});
