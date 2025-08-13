---
title: Sort text lines
navOrder: 100
pubDate: 2025-08-13
keywords: tool, sort text lines
description: Sorts a text block alphabetically
---

I created this to help maintain things like cspell dictionaries. It sorts rows of text alphabetically and can remove duplicates.

<fieldset>
<legend>Sort text lines</legend>
<p><label><input type="checkbox" id="remove-duplicates"> Remove duplicates?</label></p>
<p><label for="input-output">Add your text below</label></p>
<p><textarea rows="30" id="input-output"></textarea></p>
<p><button id="start-sort">Sort</button> <button id="copy-text">Copy to Clipboard</button></p>
</fieldset>

<script>
const textarea = document.getElementById('input-output');
const sortButton = document.getElementById('start-sort');
const copyButton = document.getElementById('copy-text');
const removeDuplicatesCheckbox = document.getElementById('remove-duplicates');

// Add click event listener to the sort button
sortButton.addEventListener('click', function() {
    const text = textarea.value;
    
    let lines = text
        .split('\n')
        .filter(line => line.trim() !== '');
    
    if (removeDuplicatesCheckbox.checked) {
        lines = [...new Set(lines)];
    }
    
    const sortedText = lines
        .sort()
        .join('\n') + '\n';
    
    textarea.value = sortedText;
});

// Add click event listener to the copy button
copyButton.addEventListener('click', async function() {
    try {
        await navigator.clipboard.writeText(textarea.value);
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
        textarea.select();
        document.execCommand('copy');
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 2000);
    }
});
</script>