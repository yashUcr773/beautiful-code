// Rules
// 'c' - Matches literal character c
// '.'(period) - Matches any single character
// '^' - Matches the beginning of input string
// '$' - Matches the end of input string
// '*' - Matches zero or more occurences of the previous character

# Sample Test Cases for Regex Patterns

## 1. Test Literal Match (`c`)

| **Regex** | **Input String** | **Expected Output** | **Description** |
|-----------|------------------|---------------------|------------------|
| `abc`     | `abc`            | Match               | Exact match for "abc". |
| `abc`     | `abcd`           | No Match            | "abcd" contains extra characters. |
| `a`       | `a`              | Match               | Single literal match. |
| `a`       | `b`              | No Match            | Literal "a" does not match "b". |

---

## 2. Test Any Single Character (`.`)

| **Regex** | **Input String** | **Expected Output** | **Description** |
|-----------|------------------|---------------------|------------------|
| `a.c`     | `abc`            | Match               | `.` matches "b". |
| `a.c`     | `adc`            | Match               | `.` matches "d". |
| `a.c`     | `ac`             | No Match            | Missing a character for `.`. |
| `.`       | `z`              | Match               | `.` matches any single character. |

---

## 3. Test Start of String (`^`)

| **Regex** | **Input String** | **Expected Output** | **Description** |
|-----------|------------------|---------------------|------------------|
| `^abc`    | `abc`            | Match               | String starts with "abc". |
| `^abc`    | `xabc`           | No Match            | String does not start with "abc". |
| `^a.c`    | `adc`            | Match               | Matches at the start of the string. |
| `^`       | `abc`            | Match               | Always matches the start of a string. |

---

## 4. Test End of String (`$`)

| **Regex** | **Input String** | **Expected Output** | **Description** |
|-----------|------------------|---------------------|------------------|
| `abc$`    | `abc`            | Match               | String ends with "abc". |
| `abc$`    | `abcd`           | No Match            | String does not end with "abc". |
| `a.c$`    | `adc`            | Match               | Matches "adc" at the end of the string. |
| `$`       | `abc`            | Match               | Always matches the end of a string. |

---

## 5. Test Zero or More (`*`)

| **Regex** | **Input String** | **Expected Output** | **Description** |
|-----------|------------------|---------------------|------------------|
| `a*`      | `aaa`            | Match               | Matches all occurrences of "a". |
| `a*`      | ``               | Match               | Zero occurrences of "a". |
| `ab*c`    | `abc`            | Match               | `b*` matches one "b". |
| `ab*c`    | `ac`             | Match               | `b*` matches zero occurrences of "b". |
| `a.*c`    | `axxxc`          | Match               | `.*` matches any sequence between "a" and "c". |

---

## 6. Combined Patterns

| **Regex**   | **Input String** | **Expected Output** | **Description** |
|-------------|------------------|---------------------|------------------|
| `^a.c$`     | `abc`            | Match               | Matches "abc" from start to end. |
| `^a.*c$`    | `axxxxxxc`       | Match               | `.*` matches any characters between "a" and "c". |
| `^a*b*c$`   | `aaabbbc`        | Match               | `a*`, `b*` match multiple occurrences. |
| `^a*b*c$`   | `ac`             | Match               | `a*` and `b*` match zero occurrences. |
| `a.*c`      | `abcc`           | Match               | Matches a substring starting with "a" and ending with "c". |
