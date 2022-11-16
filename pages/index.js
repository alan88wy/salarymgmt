import SalaryList from '../components/SalaryList'
import { server } from '../config/index'
import Login from '../components/Login'
import verifyLogin from 'util/verifyLogin'
import Layout from '../components/Layout'
import React, {useState} from 'react';
// import useSalaries from '../data/Salaries'

export default function Home() {

  const {loggedIn, data} = verifyLogin();
  const [salaries, setSalaries] = useState([])

  const token = data ? data.token ? data.token : " " : " "
  // const { salaries, isLoading } = useSalaries()
  // if (isLoading) return <h1>Loading Salaries ...</h1>

  return (
    <>
    <Layout >
      {!loggedIn && (
        <Login />
      )}
      {loggedIn && (
        <SalaryList salaries={ salaries } setSalaries={setSalaries} token={token}/>
      )}
      </Layout>
    </>
  )
}

// export const getStaticProps = async () => {

//   const res = await fetch(`${server}/api/salaries`)
//   const initialSalaries = await res.json()

//   return {
//     props: {
//       initialSalaries
//     },
//     revalidate: 10
//   }
// }