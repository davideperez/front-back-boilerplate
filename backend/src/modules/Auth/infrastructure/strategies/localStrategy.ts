/* import passportLocal from 'passport-local';
import passport, { PassportStatic } from 'passport';

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(
    User.authenticate()
  )
)
// passport.use(new LocalStrategy(
//   { usernameField: 'email' },
//   async (email, password, done) => {
//     try {
//       const user = await
passport.serializeUser((user, done) => { // TODO: o function?
  console.log('------ LOGIN-01 LocalStrategy.js > passport.serializaUser() > primer linea. ')
  // console.log('user:', user)
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    console.log('------ LocalStrategy.js> passport.deserializeUser() > primer linea. ')
    // console.log('user:', user) //TBD should we delete this console log???
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
 */