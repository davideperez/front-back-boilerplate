
export const Login: React.FC = () => {
  return (
    <div>
    <h1>Login</h1>
    <form>
      {/* email */}
      <label>Email</label>
      <input type="email" name="email"/>

      {/* password */}
      <label>Password</label>
      <input type="password" name="password"/>

    </form>
    </div>
  )
}