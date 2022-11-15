import useSWR from 'swr';

const VerifyLogin = () => {

  // return true

    const fetcher = (...args) => fetch(...args).then(res => res.json())
    
    const { data, error } = useSWR('/api/authorizeUser', fetcher)

    if (error) return <h1>Failed to load</h1>
     
    // const token = data.token

    console.log('dd ', error)

    if (!data) 
      return <h1>Loading...</h1>;
  
    let loggedIn = false;
  
    if (data.userId) {
      loggedIn = true;
    }
   
    return loggedIn
};

export default VerifyLogin;
