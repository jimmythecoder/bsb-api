/**
 * Cross origin resource requests middleware
 */
const allowOriginWhitelist = ['http://localhost:3000', 'https://dev.pegasus.morningstar.com.au', 'https://next.morningstar.com.au'];

function corsMiddleware(req, res, next) {

    if(allowOriginWhitelist.indexOf(req.get('Origin')) !== -1) {
        res.header("Access-Control-Allow-Origin", req.get('Origin'));        
    }

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    next();
}

module.exports = corsMiddleware;
