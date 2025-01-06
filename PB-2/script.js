

function manipulateText(action) {
    const inputText = document.getElementById('inputText').value;
    const searchPattern = document.getElementById('searchPattern').value || '';
    const replacePattern = document.getElementById('replacePattern').value || '';
    const resultText = document.getElementById('resultText');

    try {
        const regex = new RegExp(searchPattern, 'g');
        let output;

        switch (action) {
            case 'search':
                output = inputText.match(regex)?.join('\n') || 'No matches found.';
                break;
            case 'replace':
                output = inputText.replace(regex, replacePattern);
                break;
            case 'format':
                output = inputText.replace(/\b\w/g, char => char.toUpperCase());
                break;
            default:
                output = 'Invalid action.';
        }

        resultText.value = output;
    } catch (e) {
        resultText.value = 'Invalid regular expression.';
    }
}
