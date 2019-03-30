import config from '../config';
import { IDefineResult } from '../interfaces/intefaces';

let apiKey = config.api_key;
let urlPrefix = config.api_url;

export default {
    /**
     * Get word defination from server
     * @param {Object} params
     * @param {String} params.term Word that is going to search
     */
    getDefine: async(params) => {
        const defineResults: IDefineResult = await req('GET', '/define', params);
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
      
    const fetchOptions: RequestInit = {
      method,
      body,
      headers: {
        'Content-Type': contentType,
        'X-RapidAPI-Key': apiKey
      },
      mode: 'cors',
      };
      console.log('[' + method + ' Request] ' + url);
  
    try {
      const response = await fetch(reqUrl, fetchOptions);
  
      if (response.status === 401) {
        // await logout();
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