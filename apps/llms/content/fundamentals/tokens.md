# Tokens and tokenizers

A tokenizer cuts text into pieces from a fixed vocabulary, usually whole common words and fragments of rarer ones, and the model only ever sees the numbers of those pieces.

## What a token looks like

With a typical English tokenizer, "Tokenization is unavoidable." might become:

| Piece | `Token` | `ization` | ` is` | ` unavoid` | `able` | `.` |
| --- | --- | --- | --- | --- | --- | --- |
| ID | 3404 | 2065 | 374 | 84116 | 481 | 13 |

(The IDs are illustrative. Every tokenizer numbers its pieces differently.)

Notice the leading spaces: most tokenizers fold the space into the following word, so " is" and "is" are different tokens.

Rules of thumb for English with modern tokenizers:

- One token is about **four characters** or **three quarters of a word**.
- 1,000 tokens is about 750 words, a page and a half of text.
- Code, numbers and non-Latin scripts usually take more tokens per character.

## Why not letters, or whole words?

- **Letters** would make sequences four or five times longer. Attention cost grows with sequence length, so that is expensive.
- **Whole words** would need an enormous vocabulary and still fail on new words, names, typos and code.
- **Subwords** are the compromise: common words get one token, rare words are built from pieces, and anything at all can be spelled out from bytes.

## Byte-pair encoding

Most current models use a variant of **byte-pair encoding** (BPE).

1. Start with a vocabulary of the 256 possible bytes, so any text can be written.
2. Count every adjacent pair of symbols in a large sample of text.
3. Merge the most frequent pair into a new symbol and add it to the vocabulary.
4. Repeat until the vocabulary reaches the target size, often 32,000 to 256,000 entries.

Encoding new text applies the learned merges in order. The result is deterministic: the same text always gives the same tokens.

Other schemes exist, such as **WordPiece** (used by BERT) and **Unigram** (in the SentencePiece library), but they serve the same purpose.

## Special tokens

Tokenizers also have tokens that never appear in normal text, such as beginning-of-text, end-of-text, and the markers that a [[fundamentals/what-is-an-llm#Base models and assistants|chat template]] uses to separate system, user and assistant turns. Models that use tools or show their reasoning have further special tokens for those.

## Consequences you will notice

- **Spelling and counting letters are hard.** The model sees " strawberry" as one or two tokens, not ten letters, so "how many r's" asks about something it cannot directly see.
- **Arithmetic is uneven.** Numbers may be split into irregular chunks ("1234" as "123" and "4"). Some tokenizers split digits one by one to help.
- **Context limits and prices are in tokens, not words.** A 128K-token context holds roughly 95,000 English words.
- **Languages are not equal.** Text in languages that are rare in the tokenizer's training sample costs more tokens for the same meaning, so it is slower, uses more context and costs more.
- **The tokenizer is fixed to the model.** You cannot swap one model's tokenizer for another's. A [[local/gguf|GGUF]] file carries its tokenizer inside it for this reason.

## See also

- [[fundamentals/embeddings|Embeddings and the residual stream]], next on the reading path
- [[training/data|Training data]]
