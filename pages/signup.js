import SignUp from '../components/SignUp'
import Login from '../components/Login'
import verifyLogin from 'util/verifyLogin'

const Signup = () => {

  const loggedIn = verifyLogin();
 
  return (
    <>
      {!loggedIn && (
        <Login />
      )}
      {loggedIn && (
        <SignUp />
      )}

    </>
  );
};

export default Signup;
