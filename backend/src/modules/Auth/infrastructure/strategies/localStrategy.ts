import passportLocal from 'passport-local';
import passport, { PassportStatic } from 'passport';
import { UserRepository } from '../../users/domain/repositories/users.repository';
import { comparePassword } from '../../utils/password.util';
import { UsersCreateDto } from '../../users/domain/dtos/users/users.createDto';

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

/* export const setupLocalStrategy = (passport: PassportStatic, userRepo: UserRepository) => {
  // 1 Monta la estrategia Local.
  passport.use(
    // TODO: No hace falta pasar como parametro, ademas del email, el campo password tambien? 
    // 2 Se instancia la estrategia Local.
    new LocalStrategy(
      // Input: El mail del usuario.
      { usernameField: 'email' },
      // Input: Callback de la estrategia Local, que:
      //        1 valida el password del usuario,
      //        2 devuelve el usuario
      //        3 y valida que no hubieron errores en el proceso.
      async (email, password, done) => { 
        try {
          // Fetch: Se trae el usuario.
          const user = await userRepo.findUserByEmail(email);
          // Validacion: Si no hay usuario, o, las contraseñas no son equivalentes..
          // .. las credenciales son invalidas.
          // TODO: Fijarse que aqui quizas esta mal la logica de la siguiente linea.
          if (!user || !(await comparePassword(password, user.password))) { 
            return done(null, false, { message: 'Invalid credentials' });
          }
          // Output: Se ejecuta el done de passport..
          // ..que devuelve el usuario y un null que indica que no hubieron errores.
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}; */
