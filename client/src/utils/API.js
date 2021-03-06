import axios from './authAxios';

export default {
  getPosts: (params) => {
    return axios.get('/api/posts', { params })
  },

  createPost: (data) => {
    return axios.post('/api/posts', data)
      .catch(error => console.log('API.createPost Error:', error));
  },

  getPost: (id) => {
    return axios.get('/api/posts/' + id)
  },

  upvotePost: (id) => {
    return axios.get(`/api/posts/${id}/vote`)
  },

  purchasePost: (id) => {
    return axios.get(`/api/posts/${id}/purchase`)
  },

  getAllPostComments: (postId) => {
    return axios.get(`/api/posts/${postId}/comments/`)
  },

  getCategoryInfo: (categoryName) => {
    console.log("getting Category Info")
    return axios.get(`/api/categories/info/${categoryName}`, {
      displayName: categoryName.displayName,
      description: categoryName.description,
      tags: categoryName.tags
    });
  },

  getCategory: (categoryName) => {
    return axios.get(`/api/categories/${categoryName}`)
      .then(result => result.data)
      .catch(err => console.log('API.getCategory ERR: ', err))
  },

  getCategoriesTags: (categoryName) => {
    //console.log("getting Category Info")
    return axios.get(`/api/categories`)
  },

  createComment: (postId, commentData) => {
    return axios.post(`/api/posts/${postId}/comments`, commentData)
      .catch(error => console.log('API.createComment Err: ', error));
  },

  getUserPosts: (userID, params) => {
    return axios.get(`/api/users/id/${userID}/posts/`, { params });
  },

  getUserDrafts: (id) => {
    return axios.get(`/api/users/id/${id}/posts/drafts`)
  },

  deletePost: (id) => {
    console.log(id)
    return axios.delete('/api/posts/' + id);
  },
  updatePost: (id, updatedData) => {
    return axios.put('/api/posts/' + id, updatedData)
      .then(response => {
        console.log('updatePost response', response);
        return response;
      })
      .catch(error => {
        console.log('updatePost error', error);
      });
  },
  getPostsAndBio: (id, params) => {
    // returns public profile object of the form
    // {
    //         user: {
    //             username: <name>,
    //             bio: <bio
    //         },
    //         posts: [],
    //         comments: []
    // }
    return axios.get(`/api/users/id/${id}/profile`, { params })
  },

  updateProfile: (id, updatedData) => {
    console.log(updatedData)
    return axios.put(`/api/users/id/${id}`, updatedData)
  },

  submitDraft: (postID, data) => {
    data.isDraft = true
    return axios.put('/api/posts/' + postID, data)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log('API.submitDraft ERR: ', error);
      });
  },

  getMoneyButton: (id) => {
    return axios.get(`/api/users/id/${id}/profile`)//May need to change. Wherever we can publicly grab the MB id from
  },

  createTransaction: (tx) => {
    return axios.post('/api/transactions', tx)
  },

  // breaking convention a bit here.  Cleaning up the response to only return the number
  getTotalPaidFromUser: (id) => {
    return axios.get(`/api/users/${id}/tx/from/total`)
      .then(response => response.data[0].total)
      .catch(err => console.log('API.getTotalPaidFromUser ERR:', err))
  },

  getTotalPaidToUser: (id) => {
    return axios.get(`/api/users/${id}/tx/to/total`)
      .then(response => response.data[0].total)
      .catch(err => console.log('API.getTotalPaidToUser ERR:', err))
  },

  // where params is an object like { limit: 10, page: 1 }
  getTxFromUser: (userId, params) => {
    return axios.get(`/api/users/${userId}/tx/from`, { params })
  },

  getTxToUser: (userId, params) => {
    return axios.get(`/api/users/${userId}/tx/to`, { params })
  },

  getAllTx: (userId, params) => {
    return axios.get(`api/users/${userId}/tx`, { params })
  }
};