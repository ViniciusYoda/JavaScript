// Unicode, String internals
// Advanced knowledge

// The section goes deeper into string internals. This knowledge will be useful for you if you plan to deal with emoji, rare mathematical or hieroglyphic characters, or other rare symbols.

// As we already know, JavaScript strings are based on Unicode: each character is represented by a byte sequence of 1-4 bytes.

// JavaScript allows us to insert a character into a string by specifying its hexadecimal Unicode code with one of these three notations:

//     \xXX

//     XX must be two hexadecimal digits with a value between 00 and FF, then \xXX is the character whose Unicode code is XX.

//     Because the \xXX notation supports only two hexadecimal digits, it can be used only for the first 256 Unicode characters.

//     These first 256 characters include the Latin alphabet, most basic syntax characters, and some others. For example, "\x7A" is the same as "z" (Unicode U+007A).

// alert( "\x7A" ); // z
// alert( "\xA9" ); // ©, the copyright symbol

// \uXXXX XXXX must be exactly 4 hex digits with the value between 0000 and FFFF, then \uXXXX is the character whose Unicode code is XXXX.

// Characters with Unicode values greater than U+FFFF can also be represented with this notation, but in this case, we will need to use a so called surrogate pair (we will talk about surrogate pairs later in this chapter).

// alert( "\u00A9" ); // ©, the same as \xA9, using the 4-digit hex notation
// alert( "\u044F" ); // я, the Cyrillic alphabet letter
// alert( "\u2191" ); // ↑, the arrow up symbol

// \u{X…XXXXXX}

// X…XXXXXX must be a hexadecimal value of 1 to 6 bytes between 0 and 10FFFF (the highest code point defined by Unicode). This notation allows us to easily represent all existing Unicode characters.

//     alert( "\u{20331}" ); // 佫, a rare Chinese character (long Unicode)
//     alert( "\u{1F60D}" ); // 😍, a smiling face symbol (another long Unicode)

// Surrogate pairs

// All frequently used characters have 2-byte codes (4 hex digits). Letters in most European languages, numbers, and the basic unified CJK ideographic sets (CJK – from Chinese, Japanese, and Korean writing systems), have a 2-byte representation.

// Initially, JavaScript was based on UTF-16 encoding that only allowed 2 bytes per character. But 2 bytes only allow 65536 combinations and that’s not enough for every possible symbol of Unicode.

// So rare symbols that require more than 2 bytes are encoded with a pair of 2-byte characters called “a surrogate pair”.

// As a side effect, the length of such symbols is 2:

// alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
// alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
// alert( '𩷶'.length ); // 2, a rare Chinese character

// That’s because surrogate pairs did not exist at the time when JavaScript was created, and thus are not correctly processed by the language!

// We actually have a single symbol in each of the strings above, but the length property shows a length of 2.

// Getting a symbol can also be tricky, because most language features treat surrogate pairs as two characters.

// For example, here we can see two odd characters in the output:

// alert( '𝒳'[0] ); // shows strange symbols...
// alert( '𝒳'[1] ); // ...pieces of the surrogate pair

// Pieces of a surrogate pair have no meaning without each other. So the alerts in the example above actually display garbage.

// Technically, surrogate pairs are also detectable by their codes: if a character has the code in the interval of 0xd800..0xdbff, then it is the first part of the surrogate pair. The next character (second part) must have the code in interval 0xdc00..0xdfff. These intervals are reserved exclusively for surrogate pairs by the standard.

// So the methods String.fromCodePoint and str.codePointAt were added in JavaScript to deal with surrogate pairs.

// They are essentially the same as String.fromCharCode and str.charCodeAt, but they treat surrogate pairs correctly.

// One can see the difference here:

// // charCodeAt is not surrogate-pair aware, so it gives codes for the 1st part of 𝒳:

// alert( '𝒳'.charCodeAt(0).toString(16) ); // d835

// // codePointAt is surrogate-pair aware
// alert( '𝒳'.codePointAt(0).toString(16) ); // 1d4b3, reads both parts of the surrogate pair

// That said, if we take from position 1 (and that’s rather incorrect here), then they both return only the 2nd part of the pair:

// alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3
// alert( '𝒳'.codePointAt(1).toString(16) ); // dcb3
// // meaningless 2nd half of the pair

// You will find more ways to deal with surrogate pairs later in the chapter Iterables. There are probably special libraries for that too, but nothing famous enough to suggest here.
// Takeaway: splitting strings at an arbitrary point is dangerous

// We can’t just split a string at an arbitrary position, e.g. take str.slice(0, 4) and expect it to be a valid string, e.g.:

// alert( 'hi 😂'.slice(0, 4) ); //  hi [?]

// Here we can see a garbage character (first half of the smile surrogate pair) in the output.

// Just be aware of it if you intend to reliably work with surrogate pairs. May not be a big problem, but at least you should understand what happens.
// Diacritical marks and normalization

// In many languages, there are symbols that are composed of the base character with a mark above/under it.

// For instance, the letter a can be the base character for these characters: àáâäãåā.

// Most common “composite” characters have their own code in the Unicode table. But not all of them, because there are too many possible combinations.

// To support arbitrary compositions, the Unicode standard allows us to use several Unicode characters: the base character followed by one or many “mark” characters that “decorate” it.

// For instance, if we have S followed by the special “dot above” character (code \u0307), it is shown as Ṡ.

// alert( 'S\u0307' ); // Ṡ

// If we need an additional mark above the letter (or below it) – no problem, just add the necessary mark character.

// For instance, if we append a character “dot below” (code \u0323), then we’ll have “S with dots above and below”: Ṩ.

// For example:

// alert( 'S\u0307\u0323' ); // Ṩ

// This provides great flexibility, but also an interesting problem: two characters may visually look the same, but be represented with different Unicode compositions.

// For instance:

// let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
// let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above

// alert( `s1: ${s1}, s2: ${s2}` );

// alert( s1 == s2 ); // false though the characters look identical (?!)

// To solve this, there exists a “Unicode normalization” algorithm that brings each string to the single “normal” form.

// It is implemented by str.normalize().

// alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true

// It’s funny that in our situation normalize() actually brings together a sequence of 3 characters to one: \u1e68 (S with two dots).

// alert( "S\u0307\u0323".normalize().length ); // 1

// alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true

// In reality, this is not always the case. The reason is that the symbol Ṩ is “common enough”, so Unicode creators included it in the main table and gave it the code.

// If you want to learn more about normalization rules and variants – they are described in the appendix of the Unicode standard: Unicode Normalization Forms, but for most practical purposes the information from this section is enough.