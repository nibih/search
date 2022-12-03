const natural = require('natural');

const flatten = (obj, path = []) => {
    return Object.keys(obj).reduce((acc, key) => {
      const value = obj[key];
      const newPath = [...path, key];
      if (typeof value === 'object') {
        return [...acc, ...flatten(value, newPath)];
      }
      return [...acc, newPath.concat(value.toString().toLowerCase())];
    }, []);
  };
  
   const search = (query, data) => {
    const flattened = flatten(data);
    // if query is empty return all data
    if (!query) {
      return data;
    }
    // split query into array of words
    const queryArray = query.toString().toLowerCase();
  
    // find similarity between query and each flattened array
    const similarities = flattened.map((item) => {
      // join item array into string and lower case
      const itemString = item.join(' ').toString().toLowerCase();
      return [natural.DiceCoefficient(itemString, queryArray), item];
    });
    //   get highest similarity score number
    const highest = similarities.reduce((acc, item) => {
      if (item[0] > acc) {
        return item[0];
      }
      return acc;
    }, 0);
    //   filter similarities by highest similarity score(approximate)
    const filtered = similarities.filter((item) => {
      return item[0] > highest - 0.05;
    });
  
    let resultsIndexes = new Set();
    //   get indexes of filtered results
    filtered.forEach((item) => {
      const index = item[1][0];
      resultsIndexes.add(index);
    });
    //   return results
  
    const results = [];
    resultsIndexes.forEach((index) => {
      results.push(data[index]);
    });
  
    return results;
  };
  
  module.exports = search;