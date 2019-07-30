export default function parseCookies (error, request, response, next) {
    let parsedCookiesList = {},
        requestData = request.headers.cookie;

        requestData && requestData.split(';').forEach(( cookie ) => {
        let splittedParts = cookie.split('=');
        parsedCookiesList[splittedParts.shift().trim()] = decodeURI(splittedParts.join('='));
    });
    request.parsedCookies = parsedCookiesList;
    
    next();
}