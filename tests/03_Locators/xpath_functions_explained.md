# XPath Functions Cheatsheet — Line-by-Line Explanation

This document explains `xpath_functions_cheatsheet.md` line by line so every XPath concept is clear, even for beginners.

---

## File Structure Overview

The file has **7 sections**:
1. Basic Node Functions
2. Node Position
3. Node Relationship
4. String Functions
5. Numeric Functions
6. Logical & Boolean Functions
7. Operators

Then two code sections: **Playwright XPath Notes** and **Common Use-Cases**, followed by **Tips**.

Each section uses a **table** with 3 columns:
- **Function** → the name of the XPath function
- **Description** → what it does
- **Example** → a real XPath snippet using it

---

# SECTION 1: Basic Node Functions

These are the most common functions used to find elements.

### Line 6: `text()` — Selects text of a node
```xpath
//button[text()='Login']
```
**Breaking it down:**
- `//` → search anywhere in the document
- `button` → find elements named `button`
- `[ ... ]` → the condition (filter)
- `text()='Login'` → the text inside must be exactly `Login`
- **Result:** finds `<button>Login</button>`

### Line 7: `contains()` — Checks if a string contains a substring
```xpath
//input[contains(@id, 'user')]
```
- `contains(A, B)` → returns `true` if A contains B
- `@id` → the `id` attribute of the element
- **Result:** finds any `<input>` whose `id` contains the word `user`
  - ✅ matches `id="user-email"`, `id="login-user"`
  - ❌ does NOT match `id="username-1"`? Actually it DOES — `username` contains `user`!

### Line 8: `starts-with()` — Checks if a string starts with a substring
```xpath
//input[starts-with(@id, 'user')]
```
- Only matches if the attribute **starts** with `user`
  - ✅ `id="user-email"`
  - ❌ `id="my-user"`

### Line 9: `ends-with()` — Checks if a string ends with a substring (XPath 2.0)
```xpath
//img[ends-with(@src, '.png')]
```
- Only matches if the attribute **ends** with `.png`
  - ✅ `src="logo.png"`
  - ❌ `src="logo.png?v=2"` (because it doesn't *end* with `.png`)
- Note: this requires XPath 2.0, which browser's native XPath does **not** support. Use only when needed.

### Line 10: `normalize-space()` — Trims extra whitespace
```xpath
//a[normalize-space()='Login']
```
- `normalize-space()` removes leading/trailing spaces and collapses multiple spaces into one
- **Use case:** the element looks like `"   Login   "` in HTML. `text()='Login'` would FAIL, but `normalize-space()='Login'` matches

### Line 11: `string()` — Converts a value to a string
```xpath
//div[string(number)='123']
```
- Converts the element's numeric value to a string so you can compare it
- **Use case:** `number` evaluates to a number, `string(...)` turns it into text

### Line 12: `concat()` — Concatenates (joins) strings
```xpath
concat('a', 'b', 'c')
```
- Joins multiple strings into one → result is `"abc"`

### Line 13: `substring()` — Returns part of a string
```xpath
substring('playwright', 1, 5)
```
- `substring(text, start, length)`
- Start at position 1, take 5 characters → result is `"playw"`
- Note: XPath is **1-indexed** (position 1 = first character)

---

# SECTION 2: Node Position

Functions that work with an element's position among its siblings.

### Line 18: `position()` — Position of a node in a node-set
```xpath
//li[position()=2]
```
- Finds the **2nd** `<li>` among its siblings
- `position()=2` means "I am the second child"

### Line 19: `last()` — The last node in a node-set
```xpath
//li[last()]
```
- Finds the **last** `<li>` in the list
- Equivalent to `position()=last()`

### Line 20: `first()` — The first node (XPath 3.0)
```xpath
//li[first()]
```
- Finds the **first** `<li>`
- Same as `position()=1`. Requires XPath 3.0 (rarely used in browsers)

### Line 21: `count()` — Counts nodes in a node-set
```xpath
//ul[count(li)>3]
```
- `count(li)` → counts how many `<li>` elements are inside this `<ul>`
- `> 3` → only match if there are more than 3
- **Result:** finds `<ul>` lists that have 4+ items

### Line 22: `index()` — Index of a node (XPath 3.0)
```xpath
//li[index()=2]
```
- Modern version of `position()`. Requires XPath 3.0, so rarely used in browsers

---

# SECTION 3: Node Relationship

Functions/axes that navigate up, down, or sideways in the document tree.

### Line 27: `name()` — Returns the name of the current node
```xpath
//*[name()='button']
```
- `//*` → any element (the `*` is a wildcard)
- `name()='button'` → but only if its tag name is `button`
- **Result:** same as `//button`, but more flexible

### Line 28: `local-name()` — Returns the local part of a node name
```xpath
//*[local-name()='input']
```
- Ignores the namespace prefix (e.g., `x:input` still has `local-name()='input'`)
- **Use case:** XML/SVG documents that use namespaces

### Line 29: `namespace-uri()` — Returns the namespace URI
```xpath
//*[namespace-uri()='http://www.w3.org/1999/xhtml']
```
- Matches elements that belong to a specific XML namespace (advanced, rare in web testing)

### Line 30: `ancestor::` — Selects ancestors (parents up the tree)
```xpath
//a[text()='x']/ancestor::form
```
- Start from an `<a>` with text `x`
- `/ancestor::form` → walk UP the tree to the `<form>` that contains it
- **Use case:** find the form that wraps a specific link/button

### Line 31: `following-sibling::` — Selects siblings that come AFTER
```xpath
//label[text()='x']/following-sibling::input
```
- Find a `<label>` with text `x`
- Then go to the `<input>` that comes **immediately after** it (same parent)
- **Use case:** "the input box next to this label"

### Line 32: `preceding-sibling::` — Selects siblings that come BEFORE
```xpath
//input[1]/preceding-sibling::label
```
- Find an `<input>` (first one)
- Then get the `<label>` that comes **before** it
- **Use case:** "the label that belongs to this input"

---

# SECTION 4: String Functions

Tools for working with and transforming text.

### Line 37: `string-length()` — Returns the length of a string
```xpath
//input[string-length(@value)>5]
```
- `string-length(@value)` → how many characters in the `value` attribute
- `> 5` → only match inputs whose value is longer than 5 characters

### Line 38: `translate()` — Replaces characters
```xpath
translate('abc', 'a', 'x')
```
- Replace every `a` with `x` → result is `"xbc"`
- Signature: `translate(text, characters-to-find, characters-to-replace)`

### Line 39: `substring-before()` — The part before a substring
```xpath
substring-before('abc@mail', '@')
```
- Everything before the first `@` → result is `"abc"`
- **Use case:** extract the username from an email

### Line 40: `substring-after()` — The part after a substring
```xpath
substring-after('abc@mail', '@')
```
- Everything after the first `@` → result is `"mail"`
- **Use case:** extract the domain from an email

### Line 41: `upper-case()` — Uppercase a string
```xpath
//div[upper-case(.)='LOGIN']
```
- `upper-case(.)` → converts the element's own text to uppercase
- `.` = current element's text content
- **Use case:** match a button whether it says `Login` or `LOGIN`
  - `upper-case('Login') = 'LOGIN'` ✅ matches

### Line 42: `lower-case()` — Lowercase a string
```xpath
//div[lower-case(.)='login']
```
- Converts the element's text to lowercase, then compares to `login`
- **Use case:** case-insensitive matching

### Line 43: `string()` — Converts to string (repeated for completeness)
```xpath
//div[string(@data-id)='123']
```
- Converts the `data-id` attribute value to a string for comparison

---

# SECTION 5: Numeric Functions

Functions for working with numbers.

### Line 48: `number()` — Converts a value to a number
```xpath
number('10')
```
- Turns the string `'10'` into the number `10`
- `'10' + number('10')` → `20`

### Line 49: `sum()` — Sum of node-set values
```xpath
//td[sum(@value)>100]
```
- `sum(@value)` → adds up all `value` attributes of child `<td>` elements
- `> 100` → only match if the total is above 100
- **Use case:** find the row where the total price exceeds a limit

### Line 50: `floor()` — Rounds DOWN
```xpath
floor(3.7)
```
- Rounds down to the nearest whole number → `3`

### Line 51: `ceiling()` — Rounds UP
```xpath
ceiling(3.2)
```
- Rounds up to the nearest whole number → `4`

### Line 52: `round()` — Rounds to the NEAREST number
```xpath
round(3.5)
```
- Rounds to the nearest whole number → `4` (`.5` rounds up)

### Line 53: `abs()` — Absolute value
```xpath
abs(-5)
```
- Removes the negative sign → `5`

### Line 54: `min()` / `max()` — Min / max of a node-set
```xpath
//p[min(@data-n)]
```
- `min(@data-n)` → the smallest value among all `data-n` attributes
- `max(...)` would be the largest
- **Use case:** "find the paragraph with the smallest number"

---

# SECTION 6: Logical & Boolean Functions

Functions that work with `true`/`false` values.

### Line 59: `not()` — Negates (reverses) a boolean
```xpath
//button[not(@disabled)]
```
- `not(@disabled)` → true when the `disabled` attribute does NOT exist
- **Result:** finds buttons that are ENABLED (not disabled)
- One of the most useful XPath patterns for testing!

### Line 60: `true()` — Always `true`
```xpath
//input[boolean(@checked)=true()]
```
- `true()` → the boolean value `true`
- `boolean(@checked)` → converts the `checked` attribute to true/false
- **Result:** finds checked inputs

### Line 61: `false()` — Always `false`
```xpath
//input[boolean(@checked)=false()]
```
- Finds inputs where `checked` is false (not checked)

### Line 62: `boolean()` — Converts a value to a boolean
```xpath
//div[boolean(@id)]
```
- `boolean(@id)` → `true` if the `id` attribute exists, `false` if it doesn't
- **Result:** finds `<div>` elements that HAVE an `id`

---

# SECTION 7: Operators

Symbols used to combine conditions.

### Line 67: `and` — Logical AND (both must be true)
```xpath
//input[@type='text' and @name='user']
```
- Must have `type="text"` **AND** `name="user"`
- **Result:** only matches inputs that satisfy BOTH conditions

### Line 68: `or` — Logical OR (at least one must be true)
```xpath
//a[text()='Login' or text()='Sign in']
```
- Matches if the text is `Login` **OR** `Sign in`
- **Use case:** find either of two possible buttons

### Line 69: `!=` — Not equal
```xpath
//div[@class!='hide']
```
- Matches elements whose `class` is NOT `hide`
- **Warning:** `!=` can also match elements that have NO class attribute at all. Use `[not(@class='hide')]` for strict behavior.

### Line 70: `=`, `<`, `>`, `<=`, `>=` — Comparisons
```xpath
//li[@data-id>=5]
```
- Matches `<li>` elements where `data-id` is 5 or greater
- Works with numbers or strings

### Line 71: `|` — Union of node-sets
```xpath
//h1 | //h2
```
- The pipe combines two selections into ONE result
- **Result:** gets all `<h1>` AND all `<h2>` elements together
- (In the cheatsheet it's written `//h1 \| //h2` because `|` is escaped in Markdown tables)

### Line 72: `*` — Any element (wildcard)
```xpath
//div/*
```
- Matches ALL child elements of a `<div>`, regardless of tag name
- **Result:** every element inside every `<div>` (direct children only)

---

# CODE SECTION 1: Playwright XPath Notes

Real TypeScript examples showing how to use XPath inside Playwright.

### Lines 76–77: Basic XPath locator
```typescript
// Playwright supports XPath locators
await page.locator("//input[@id='username']").click();
```
- `page.locator("...")` → creates a locator. Playwright auto-detects `//` and treats it as XPath
- Finds `<input id="username">` and clicks it

### Lines 79–80: Combine with CSS-style filters
```typescript
await page.locator("//div[contains(@class, 'card')]").filter({ hasText: 'Login' });
```
- `locator("//div[contains(@class, 'card')]")` → all divs with `card` in their class
- `.filter({ hasText: 'Login' })` → narrows to only the ones containing the text `Login`

### Lines 82–83: XPath with text
```typescript
await page.locator("//button[text()='Make Appointment']").click();
```
- Finds a button whose exact text is `Make Appointment` and clicks it

### Lines 85–86: XPath with contains
```typescript
await page.locator("//input[contains(@placeholder, 'Email')]").fill('test@test.com');
```
- Finds an input whose `placeholder` contains `Email` and types an email into it
- `fill('test@test.com')` → the typed value

### Lines 88–90: Chaining (relative XPath)
```typescript
const form = page.locator("//form[@id='login-form']");
await form.locator(".//input[@name='user']").fill('admin');
```
- First find the `<form id="login-form">`
- `.//input` → search for the input **inside** the form only (the `.` means "relative to here")
- Compare: `//input` (double slash at start) would search the WHOLE page
- **Result:** a scoped search = faster and more reliable

### Lines 92–93: Multiple attributes
```typescript
await page.locator("//button[@type='submit' and @class='btn']").click();
```
- Uses `and` to require BOTH `type="submit"` AND `class="btn"`

---

# CODE SECTION 2: Common Use-Cases

Ready-to-use patterns for real testing situations.

### Lines 98–99: Click a specific nth element
```typescript
await page.locator("(//button)[2]").click();
```
- `(//button)` → get all buttons (parentheses group them into one set)
- `[2]` → pick the **second** one
- **Note:** the brackets go OUTSIDE the parentheses `( ... )[2]`

### Lines 101–102: Element that follows a text label
```typescript
await page.locator("//label[text()='Password']/following-sibling::input").fill('secret');
```
- Find `<label>Password</label>`
- `/following-sibling::input` → the `<input>` right after it
- Types `secret` into that input
- **Use case:** form fields where the input has no useful id

### Lines 104–105: Element that contains text in a parent
```typescript
await page.locator("//div[contains(., 'Welcome')]//span").textContent();
```
- `contains(., 'Welcome')` → the `.` checks the div's text INCLUDING all its children
- `//span` → then find a span inside that div
- `.textContent()` → reads the text
- **Key:** `.` in `contains(., ...)` = text of node AND descendants

### Lines 107–108: Get all text elements in a section
```typescript
await page.locator("//section[@id='main']//*[text()]").allTextContents();
```
- `//section[@id='main']` → the main section
- `//*[text()]` → any element that has text
- `.allTextContents()` → returns an array of all their texts

### Lines 110–111: Button that is NOT disabled
```typescript
await page.locator("//button[not(@disabled)]").click();
```
- Finds enabled buttons only (the opposite of disabled)
- **Use case:** click the active button when there are disabled duplicates

### Lines 113–114: Input by placeholder AND type
```typescript
await page.locator("//input[@placeholder='Email' and @type='email']").fill('a@b.com');
```
- Requires both the placeholder AND the type to match
- Very precise = unlikely to match the wrong element

---

# TIPS Section (Lines 117–122)

### Line 118: XPath is slower — use as fallback
- CSS locators and `data-testid` are faster because they use native browser APIs
- XPath runs through a slower evaluation engine
- **Rule:** prefer built-in locators, keep XPath for the hard cases

### Line 119: Prefer built-in Playwright locators
- `getByRole`, `getByText`, `getByTestId`, `getByLabel` are more readable and more robust
- They mimic how a real user / accessibility tree sees the page

### Line 120: `.` in `contains(., 'text')`
- `contains(text(), 'Welcome')` only checks the DIRECT text of the node
- `contains(., 'Welcome')` checks the node text PLUS all descendants' text
- **Use case:** when the text is nested inside child elements

### Line 121: Escaping quotes
- If your attribute value contains a single quote, wrap the XPath in double quotes:
  ```xpath
  //input[@placeholder="Don't click"]
  ```
- Or the reverse: use single quotes around a value containing double quotes

### Line 122: `//` anywhere vs `.//` relative
- `//` at the start → searches the **entire document**
- `.//` → searches only the **current context** (e.g., inside a previously-found element)
- `//` after an element (e.g., `//div//span`) → searches within that div
- **Use `.//` in chained locators for better performance and fewer surprise matches**

---

# Quick Memory Tricks
| Rule | Remember it as |
|------|----------------|
| `text()` | Exact text match |
| `contains()` | "Has these characters somewhere" |
| `starts-with()` | "Begins with" |
| `position()` / `[n]` | "Which child number" |
| `last()` | "The final one" |
| `following-sibling::` | "The one right after" |
| `ancestor::` | "The box that wraps it" |
| `not(@attr)` | "Doesn't have this attribute" |
| `.` | "This element's whole text (incl. children)" |
