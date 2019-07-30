export default function parseQuery(error, request, res, next) {
    let query = {};
    const queryString = request.query;
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (const i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    request.parsedQuery = query;    
    next();
}