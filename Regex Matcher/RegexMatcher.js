let testcases = [
    ['abc', 'abc', true], ['abc', 'abcd', false], ['a', 'a', true], ['a', 'b', false],
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
function match(regex, text) {

    if (regex[0] === '^') {
        return matchInitial(regex.substring(1), text)
    }

    do {
        if (matchInitial(regex, text)) {
            return true;
        }
    } while (text != "" && (text = text.substring(1)));

    return false;

}

function matchInitial(regex, text) {
    if (regex.length === 0) {
        return true
    }

    if (regex[1] === '*') {
        return matchStar(regex[0], regex.substring(2), text);
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

function test() {
    for (let [regex, text, expectedAns] of testcases) {
        let ans = match(regex, text)
        if (ans != expectedAns) {
            console.log(regex, text, expectedAns, ans)
        }
    }
}

test();