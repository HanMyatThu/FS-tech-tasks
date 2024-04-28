// Write a function to find the longest common prefix string amongst an array of strings.

// If there is no common prefix, return an empty string "".

// Example 1:
// Input: strs = ["flower","flow","flight"]
// Output: "fl"

// Example 2:
// Input: strs = ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.

// Constraints:
// * 1 <= strs.length <= 200
// * 0 <= strs[i].length <= 200
// * strs[i] consists of only lower-case English letters.

const getLongestCommonPrefix = (text) => {
  if (text.length === 0) return "";

  let prefix = text[0];

  for (let i = 1; i < text.length; i++) {
    while (text[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }

  return prefix;
};

//getLongestCommonPrefix(["flower", "flow", "flight"])
// result -> fl

// getLongestCommonPrefix(["dog","racecar","car"])
//  result -> ''
