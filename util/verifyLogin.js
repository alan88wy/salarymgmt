import useSWR from 'swr';

const VerifyLogin = () => {

  // return true

    const fetcher = (...args) => fetch(...args).then(res => res.json())
    
    const { data, error } = useSWR('/api/authorizeUser', fetcher)

    if (error) return <h1>Failed to load</h1>
  
    // token = data.token
    // const d = JSON.stringify(data)
    
    if (!data) 
      return <h1>Loading...</h1>;
  
    let loggedIn = false;
  
    if (data.userId) {
      loggedIn = true;
    }
   
    return {loggedIn, data}
};

export default VerifyLogin;
