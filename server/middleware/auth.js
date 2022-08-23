import jwt, { decode } from 'jsonwebtoken'
// import User

const auth = async (req, res, next ) => {
    try {
        const length = req.headers.authorization.length;
        const token = req.headers.authorization.split(' ')[1];
        // console.log('HELLO THIS IS TEST TO SEE FI TI WORKED')
        // console.log(token) substring(7, length)

        const isCustomAuth = token.length < 500;
        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            
            console.log(decodedData)
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub
        }
        
        next();

    } catch (error) {
        console.log(error)
    }
}

export default auth;