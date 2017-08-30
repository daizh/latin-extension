// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// The onClicked callback function.
function onClickHandler(info, tab) {
    chrome.tabs.sendMessage(tab.id, {method: "getSelection"}, function(response){
        sendServiceRequest(response.data);
    });
};

function sendServiceRequest(selectedText){
    var serviceCall = "http://nodictionaries.com/novifex?text=" + selectedText;
    chrome.tabs.create({url: serviceCall});
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
    var id = chrome.contextMenus.create({"title": "no dictionaries!", "contexts":["selection"],
                                         "id": "selection"});
});


