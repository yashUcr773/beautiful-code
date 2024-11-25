#include <iostream>

// Function declarations
int matchhere(const char *regexp, const char *text);  // Search for the regexp at the beginning of text
int matchstar(int c, const char *regexp, const char *text);  // Search for c*regexp at the beginning of text
int match(const char *regexp, const char *text);  // Search for the regexp anywhere in the text

/* matchhere: 
   This function tries to match a regular expression (regexp) at the beginning of the text. 
   It recursively checks different conditions for the regular expression. 
   - If the regexp starts with a null character ('\0'), it's a match (empty regex matches).
   - If the second character of the regexp is '*', it invokes matchstar for handling repetition.
   - If the regexp ends with '$', it checks that the text also ends at that position.
   - If the current character of the regexp matches the current text or the regexp has a '.', 
     it continues checking recursively on the rest of the regexp and text.
*/
int matchhere(const char *regexp, const char *text)
{
    if (regexp[0] == '\0')  // End of regexp: successful match
        return 1;
    if (regexp[1] == '*')   // If next character in regexp is '*', handle it with matchstar
        return matchstar(regexp[0], regexp+2, text);
    if (regexp[0] == '$' && regexp[1] == '\0')  // If '$' at the end, match only if text ends
        return *text == '\0';  // End of text must match
    if (*text != '\0' && (regexp[0] == '.' || regexp[0] == *text))  // Match current character or any with '.'
        return matchhere(regexp+1, text+1);  // Check the next characters
    return 0;  // No match
}

/* matchstar:
   This function handles the '*' character in regular expressions, meaning that the preceding character
   (denoted as c) can repeat zero or more times.
   - It keeps trying to match the regexp starting with "c*" and recursing over the rest of the text.
   - If the current character matches 'c' or is any character ('.'), it keeps checking.
   - If the rest of the regexp matches at any point, it returns a match.
*/
int matchstar(int c, const char *regexp, const char *text)
{
    do {  // Try matching zero or more occurrences of 'c'
        if (matchhere(regexp, text))  // If match is found, return success
            return 1;
    } while (*text != '\0' && (*text++ == c || c == '.'));  // Keep checking as long as the current character matches c or is '.'
    return 0;  // No match
}

/* match:
   This function attempts to find a match for the regexp anywhere in the text.
   - If the regexp starts with '^', it forces the match to begin at the start of the text.
   - Otherwise, it checks the text starting from every position, including an empty string.
*/
int match(const char *regexp, const char *text)
{
    if (regexp[0] == '^')  // If regexp starts with '^', match must start from the beginning of the text
        return matchhere(regexp+1, text);  // Skip '^' and match the rest
    do {  // If no '^', try matching from every position in text
        if (matchhere(regexp, text))  // If a match is found, return success
            return 1;
    } while (*text++ != '\0');  // Continue to the next character in text
    return 0;  // No match found in the entire text
}

int main() {
    // Define a pattern and an input string
    const char* pattern = "$";  // Pattern to match: the end of the string
    const char* input = "abc";  // Input string to check

    // Call the match function to check if the pattern matches the input
    std::cout << match(pattern, input) << std::endl;  // Output the result (1 for match, 0 for no match)

    return 0;  // Return 0 to indicate successful execution
}
