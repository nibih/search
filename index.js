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

    // calculate Dice coefficient similarity
    const a = queryArray.split('');
    const b = itemString.split('');
    const intersection = a.filter((x) => b.includes(x)).length;
    const union = a.length + b.length - intersection;
    const diceCoefficient = (2 * intersection) / union;

    return [diceCoefficient, item];
  });
  //   get highest similarity score number
  const highest = Math.max(...similarities.map((item) => item[0]));
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
  for (const item of filtered) {
    if (item) {
      resultsIndexes.add(item[0]);
    }
  }

  //   return results

  const results = [];
  resultsIndexes.forEach((index) => {
    results.push(data[index]);
  });

  return results;
};

module.exports = search;
