import route from './route'
import request from './request'

const api = {
    authToken : (auth) => request.post(route.authToken(), auth),
    getUserInfo : (token) => request.get(route.getUserInfo(), {}, {}, token),
    getBooks : (sid, page) => request.get(route.getBooks(sid, page)),
    getHostSearch : () => request.get(route.getHostSearch()),
    getUserLikeBooks : () => request.get(route.getUserLikeBooks()),
    getBookDetail : (id) => request.get(route.getBookDetail(id)),
    getLastChapter : (id, chapterId) => request.get(route.getChapterDetail(id, chapterId)),
    getCategories : () => request.get(route.getCategories()),
    getChapters : (id, page) => request.get(route.getChapters(id, page)),
    postSearch : (keyword, page) => request.get(route.postSearch(keyword, page)),
    postFavorite : (id, token) => request.post(route.postFavorite(id), {}, {}, token),
    getFavorites : (page, token) => request.get(route.getFavorites(page), {}, {}, token),
    getOperation : (id, token) => request.get(route.getOperation(id), {}, {}, token),
}

export default api