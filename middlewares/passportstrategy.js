import passport from 'passport';
import Local from 'passport-local';
import Facebook from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';

export default function passportStrategy(loginCredentials) {
     
    const facebookAuth = {
        'clientID'        : '723109324794534', // facebook App ID
        'clientSecret'    : 'b422c216415e3a7b5319be668b751722', // facebook App Secret
        'callbackURL'     : 'http://localhost:8080/facebook/login/callback'
    };

    const googleAuth = {
        'clientID'        : '1078625973718-b9og3esmotuact0qmi5i23jlipk87fp8.apps.googleusercontent.com', // Google App ID
        'clientSecret'    : 'fz1jo6Xep6N-tnj_qrRGDboC', // Google App Secret
        'callbackURL'     : 'http://localhost:8080/google/login/callback'
    };

    passport.serializeUser((user, next) => {
        next(null, user);
      });
       
    passport.deserializeUser((id, next) => {
        next(err, user);
    });

    // Local Strategy

    passport.use('local', new Local.Strategy((username, password, done) => { 
        if(loginCredentials.data.username === username && loginCredentials.data.password === password){
            done(null, loginCredentials);
        } else {
            done(null, false, "Invalid login credentials!");
        }
    }));
    
    // Facebook Strategy
    passport.use('facebook', new Facebook.Strategy({
        "clientID"        : facebookAuth.clientID,
        "clientSecret"    : facebookAuth.clientSecret,
        "callbackURL"     : facebookAuth.callbackURL
    }, (token, refreshToken, profile, done) => {
        done(null, {facebookProfileId:  profile.id});
    }));

    // Google strategy
    passport.use('google', new GoogleStrategy({
        "clientID"        : googleAuth.clientID,
        "clientSecret"    : googleAuth.clientSecret,
        "callbackURL"     : googleAuth.callbackURL
    }, (accessToken, refreshToken, profile, done) => {
        done(null, { googleProfileId: profile.id });
    }));
} 