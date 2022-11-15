import SalaryList from '../components/SalaryList'
import { server } from '../config/index'
import Login from '../components/Login'
import verifyLogin from 'util/verifyLogin'
import Layout from '../components/Layout'

export default function Home({ salaries }) {

  const data = verifyLogin();
  const loggedIn = true


  return (
    <>
    <Layout>
      {!loggedIn && (
        <Login />
      )}
      {loggedIn && (
        <SalaryList salaries={ salaries }/>
      )}
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/salaries`)
  const salaries = await res.json()

  return {
    props: {
      salaries
    }
  }
}