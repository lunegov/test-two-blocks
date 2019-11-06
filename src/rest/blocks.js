const getBlocks = () => {
  const URL = '/assets/data.json';
  const params = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    cache: 'no-cache',
  };
  return fetch(URL, params).then(response => {
    if (response.status === 200) {
      return response.json();
    }

    throw new Error(`Error of getting JSON file: ${URL}`);
  });
};

const saveBlocks = (blocks) => {
  const URL = '/api/save';
  const data = new FormData();
  data.append('json', JSON.stringify(blocks));

  const params = {
    method: 'POST',
    mode: 'cors',
    body: data,
    credentials: 'include',
    cache: 'no-cache',
  };
  return fetch(URL, params).then(response => {
    if (response.status === 200) {
      return response.json();
    }

    throw new Error(`Error of getting JSON file: ${URL}`);
  });
};

export { getBlocks, saveBlocks };
