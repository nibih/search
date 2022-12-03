# @nibih/search
The @nibih/search package provides a powerful search function that allows you to easily search through a nested object and find any keys or values that match a given query. The search is case-insensitive and uses the DiceCoefficient algorithm from the natural package to calculate the similarity between the query and the keys or values in the object. This allows for approximate matching, so even if the query doesn't match exactly, it will still return results that are similar.

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

The search function returns an array of objects that have keys or values that match the query. Here's an example of how the search function might be used:

```javascript
const data = {
  users: [
    {
      name: 'John Doe',
      email: 'johndoe@gmail.com'
    },
    {
      name: 'Jane Doe',
      email: 'janedoe@gmail.com'
    }
  ],
  products: [
    {
      name: 'Widget',
      price: 9.99
    },
    {
      name: 'Gadget',
      price: 19.99
    }
  ]
};

// search for 'doe'
const results = search('doe', data);

/*
  [
    {
      name: 'John Doe',
      email: 'johndoe@gmail.com'
    },
    {
      name: 'Jane Doe',
      email: 'janedoe@gmail.com'
    }
  ]
*/
```
In this example, the search function is used to search the data object for keys or values that match the query 'doe'. The search is case-insensitive, so it will return both 'John Doe' and 'Jane Doe' as results.

## License
The @nibih/search package is licensed under the MIT license. See the LICENSE file for more information.