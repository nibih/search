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

const search = (query, data, strict_mode = false) => {
  const flattened = flatten(data);
  // if query is empty return all data
  if (!query) {
    return data;
  }
  // split query into array of words
  const queryArray = query.toString().toLowerCase();
  // if strict mode is on, return only exact matches

  const strictModeResults = flattened.map((item) => {
    // if strict mode is enabled and queryArray is part of item[item.length - 1]
    // return item
    if (strict_mode && item[item.length - 1].includes(queryArray)) {
      return item;
    }
  });

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

  // if not strict mode, "filtered" is approximated results, if strict mode, "filtered" is strictmode results
  let filtered;
  if (strict_mode) {
    filtered = strictModeResults;
  } else {
    filtered = similarities.map((item) => {
      if (item[0] >= highest) {
        // return item without similarity score
        return item[1];
      }
    });
  }

  let resultsIndexes = new Set();

  //   get indexes of filtered results
  filtered.reduce((acc, item) => {
    //   get first entry of valid item use validation

    if (item) {
      resultsIndexes.add(item[0]);
    }
  }, 0);

  //   return results

  const results = [];
  resultsIndexes.forEach((index) => {
    results.push(data[index]);
  });
  
  return results;
};

module.exports = search;
