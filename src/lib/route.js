let config = require('../constants/config');
let getBaseUrl = () => {
    return config.getDomain(config.currentMode);
};
let getAuthUrl = () =>{
    return config.getAuthDomain(config.currentMode);
}

module.exports = {
    authToken: () => getAuthUrl() + '/oauth/token',
    getUserInfo: () => getAuthUrl() + '/api/user',
    getBooks: (sid, page = 1) => getBaseUrl() + `/books?sid=${sid}&page=${page}`,
    getHostSearch: () => getBaseUrl() + '/search/host',
    getUserLikeBooks: () => getBaseUrl() + '/books/like',
    getBookDetail: (id) => getBaseUrl() + '/books/' + id,
    getChapterDetail: (id, chapterId) => getBaseUrl() + `/books/${id}/chapter/${chapterId}`,
    getCategories: () => getBaseUrl() + `/categories`,
    getChapters: (id, page = 1) => getBaseUrl() + `/books/${id}/chapters?page=${page}`,
    postSearch: (keyword, page = 1) => getBaseUrl() + `/search?keyword=${keyword}&page=${page}`,
    postFavorite: (id) => getBaseUrl() + `/books/${id}/favorite`,
    getFavorites: (page = 1) => getBaseUrl() + `/books/favorites?page=${page}`,
    getOperation: (id) => getBaseUrl() + `/books/${id}/operation`,
};




