import config from '../config';

let apiKey = config.api_key;
let urlPrefix = config.api_url;

export default {
    getDefine: async(params) => {
        const defineResults = await req('GET', '/define', params);
        return defineResults;
    }
}

/**
 * generics
 */
async function req(method, url, params = {}, contentType = 'application/json') {
 
    const reqUrl = (method === 'GET')
    ? urlPrefix + url + queryParams(params)
    : urlPrefix + url;
  
    const body = (method === 'GET')
    ? null
    : (contentType === 'application/json')
      ? JSON.stringify(params)
      : params;
      
    const fetchOptions = {
      method,
      body,
      headers: {
        'Content-Type': contentType,
        'X-RapidAPI-Key': apiKey
      },
      mode: 'cors',
      cache: 'default'
      };
      console.log('[' + method + ' Request] ' + url);
  
    try {
      const response = await fetch(reqUrl, fetchOptions);
  
      if (response.status === 401) {
        await logout();
        throw 'Unauthorized Error';
      }
  
      const responseJson = await response.json();
  
      if (responseJson && responseJson.status === false) {
        throw responseJson.error || JSON.stringify(responseJson);
      }

      return responseJson;
    } catch(error) {
      console.warn('API error - ' + error);
      throw error;
    }
  }
  
  
  function queryParams(params) {
    let result = Object
      .keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
    return result
      ? '?' + result
      : '';
  }