import UploadCSV from '../components/uploadCSV'
import Login from '../components/Login'
import Layout from '../components/Layout'
import verifyLogin from 'util/verifyLogin'

const uploadCSV = () => {
   
    const {loggedIn, data} = verifyLogin();
   
    return (
        <>
        
            {!loggedIn && (
              <Login />
            )}
            {loggedIn && (
              <UploadCSV />
            )}
       </>
      
    );
};

export default uploadCSV;
