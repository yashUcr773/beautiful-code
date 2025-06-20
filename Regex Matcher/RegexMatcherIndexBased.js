let testcases = [
    ['abc', 'abc', true], ['abc', 'abcd', true], ['a', 'a', true], ['a', 'b', false],
    ['a.c', 'abc', true], ['a.c', 'adc', true], ['a.c', 'ac', false], ['.', 'z', true],
    ['^abc', 'abc', true], ['^abc', 'xabc', false], ['^a.c', 'adc', true], ['^', 'abc', true],
    ['abc$', 'abc', true], ['abc$', 'abcd', false], ['a.c$', 'adc', true], ['$', 'abc', true],
    ['a*', 'aaa', true], ['a*', '', true], ['ab*c', 'abc', true], ['ab*c', 'ac', true], ['a.*c', 'axxxc', true], ['a.*c', 'acccccccc', true], ['a.*c', 'axyzc', true],
    ['^a.c$', 'abc', true], ['^a.*c$', 'axxxxxxc', true], ['^a*b*c$', 'aaabbbc', true], ['^a*b*c$', 'ac', true], ['a.*c', 'abcc', true]
]

/**
 * Search for the regex in any of the text
 * @param {*} regex:string - Given regex with above rules.
 * @param {*} text:string - Given text to search. 
 */
function match(regex, text, regexIdx, textIdx) {

    if (regex[regexIdx] === '^') {
        return matchInitial(regex, text, regexIdx + 1, textIdx)
    }
    do {

        if (matchInitial(regex, text, regexIdx, textIdx)) {
            return true;
        }
    } while (textIdx++ < text.length)

    return false;

}

function matchInitial(regex, text, regexIdx, textIdx) {
    if (regex.length === regexIdx) {
        return true
    }

    if (regex[regexIdx+1] === '*') {
        return matchStar(regex[regexIdx], regex, text, regexIdx+2, textIdx);
    }

    if (regex[0] === '$' && regex.length === 1) {
        return text === "";
    }

    if (text != "" && (regex[0] === '.' || regex[0] === text[0])) {
        return matchInitial(regex.substring(1), text.substring(1))
    }

    return false
}

function matchStar(character, regex, text) {
    do {
        if (matchInitial(regex, text)) {
            return true
        }

    } while (text != "" && (text[0] === character || character === '.') && (text = text.substring(1)))
    return false
}

// const pattern = "$";  // Pattern to match: the end of the string
// const input = "abc";
// console.log(match(pattern, input))

function test() {
    for (let [regex, text, expectedAns] of testcases) {
        let ans = match(regex, text)
        if (ans != expectedAns) {
            console.log(regex, text, expectedAns, ans)
        }
    }
}

test();