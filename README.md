# @nibih/search
The @nibih/search package provides a powerful search function that allows you to easily search through a nested object and find any keys or values that match a given query. The search is case-insensitive and uses the DiceCoefficient algorithm to calculate the similarity between the query and the keys or values in the object. This allows for approximate matching, so even if the query doesn't match exactly, it will still return results that are similar.

The updated search function(from 1.1.0) no longer relies on the natural package for calculating the Dice coefficient similarity, as this calculation has been added directly to the search function. Additionally, the resultsIndexes array has been replaced with a Set, which is more efficient for checking if an element exists in the set than in the array.

## Installation
To install the @nibih/search package, use the following command:

```bash
npm install @nibih/search
```
## Usage
To use the @nibih/search package, require the search function in your JavaScript code:

```javascript
const search = require('@nibih/search');
```
Once you have the search function available, you can use it to search through any nested object by passing in the query and the object as arguments:


```javascript
const results = search('doe', data);
```
The search function returns an array of objects that have keys or values that match the query. By default, the search is approximate and will return results that are similar to the query, even if they don't match exactly.

To enable strict mode, pass true as the third argument to the search function. In strict mode, the search will only return exact matches to the query:

```javascript
const results = search('doe', data, true);
```
Here's an example of how the search function might be used:

```javascript
const data = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
    characters: [
      {
        name: 'Jay Gatsby',
        description: 'The wealthy, mysterious protagonist of the novel.',
      },
      {
        name: 'Nick Carraway',
        description: "The novel's narrator and Gatsby's neighbor in West Egg.",
      },
      {
        name: 'Daisy Buchanan',
        description:
          "Gatsby's love interest and a symbol of the corrupt wealthy elite.",
      },
    ],
  },
  {
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    characters: [
      {
        name: 'Winston Smith',
        description:
          "The novel's protagonist, a low-ranking member of the Party.",
      },
      {
        name: 'Julia',
        description:
          "Winston's love interest and a fellow rebel against the Party.",
      },
      {
        name: 'Big Brother',
        description:
          'The leader of the Party and the figurehead of the oppressive government.',
      },
    ],
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: 1960,
    characters: [
      {
        name: 'Scout Finch',
        description:
          "The novel's narrator and protagonist, a young girl growing up in the Deep South.",
      },
      {
        name: 'Atticus Finch',
        description:
          "Scout's father, a lawyer and moral backbone of the novel.",
      },
      {
        name: 'Tom Robinson',
        description:
          'A black man falsely accused of rape, whose trial is at the center of the novel.',
      },
    ],
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    year: 1813,
    characters: [
      {
        name: 'Elizabeth Bennet',
        description:
          "The novel's protagonist and one of five daughters of Mr. and Mrs. Bennet.",
      },
      {
        name: 'Mr. Darcy',
        description:
          'A wealthy and proud gentleman who is initially hostile towards Elizabeth.',
      },
      {
        name: 'Jane Bennet',
        description:
          "Elizabeth's older sister and the novel's primary romantic heroine.",
      },
    ],
  },
];

// search for 'Prejudice and Pride' (approximate mode)
const results = search('predjudice and pride', data);

// [
//   {
//     title: 'Pride and Prejudice',
//     author: 'Jane Austen',
//     year: 1813,
//     characters: [
//       {
//         name: 'Elizabeth Bennet',
//         description:
//           "The novel's protagonist and one of five daughters of Mr. and Mrs. Bennet.",
//       },
//       {
//         name: 'Mr. Darcy',
//         description:
//           'A wealthy and proud gentleman who is initially hostile towards Elizabeth.',
//       },
//       {
//         name: 'Jane Bennet',
//         description:
//           "Elizabeth's older sister and the novel's primary romantic heroine.",
//       },
//     ],
//   }
// ]

// search for 'Prejudice and Pride' (strict mode)
const results = search('predjudice and pride', data, true);

// []

// search for 'Pride and Prejudice' (strict mode)
const results = search('Pride and Prejudice', data, true)

// [
//   {
//     title: 'Pride and Prejudice',
//     author: 'Jane Austen',
//     year: 1813,
//     characters: [
//       {
//         name: 'Elizabeth Bennet',
//         description:
//           "The novel's protagonist and one of five daughters of Mr. and Mrs. Bennet.",
//       },
//       {
//         name: 'Mr. Darcy',
//         description:
//           'A wealthy and proud gentleman who is initially hostile towards Elizabeth.',
//       },
//       {
//         name: 'Jane Bennet',
//         description:
//           "Elizabeth's older sister and the novel's primary romantic heroine.",
//       },
//     ],
//   }
// ]

```
The search function is powerful and flexible, allowing you to easily search through nested objects and find the keys or values that you're looking for. Whether you're searching for exact matches or approximate matches, the @nibih/search package has you covered.

## License
The @nibih/search package is licensed under the MIT license. See the LICENSE file for more details.

## Contributing
If you'd like to contribute to the @nibih/search package, please read the CONTRIBUTING file for more details.

## Code of Conduct
The @nibih/search package has adopted the Contributor Covenant as its Code of Conduct. See the CODE_OF_CONDUCT file for more details.

## Acknowledgements
The @nibih/search package was inspired by the need for a "one size fits all" fast and powerful search function that could handle nested objects. The DiceCoefficient algorithm was chosen for its ability to calculate the similarity between strings, allowing for approximate matching in the search function.

We would like to thank the developers of the natural package for their implementation of the DiceCoefficient algorithm, which was used as a reference for the implementation in the @nibih/search package.


