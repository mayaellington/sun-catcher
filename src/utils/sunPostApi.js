import tokenService from './tokenService';

const BASE_URL = '/api/sunPosts';

export function create(sunPost) {
    return fetch(BASE_URL, {
      method: 'POST',
      body: sunPost,
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    
    }).then(res => {
      if(res.ok) return res.json();
      throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!!')
    })
  }

  export function getAll() {
    return fetch(BASE_URL, {
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    })
    .then(res => {
      if(res.ok) return res.json();
    })
  }

  export function removeSunPost(id){
    // console.log(`${BASE_URL}/${id}`)

    return fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
          }
    }).then(res => res.json());
}