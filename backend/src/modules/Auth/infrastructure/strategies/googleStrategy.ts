/* import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PassportStatic } from 'passport';
import { UserRepository } from '../../domain/repositories/users.repository';

export const setupGoogleStrategy = (passport: PassportStatic, userRepo: UserRepository) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userRepo.findByGoogleId(profile.id);
          if (!user) {
            user = await userRepo.createWithGoogle(profile.id, profile.emails[0].value, profile.displayName);
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}; */