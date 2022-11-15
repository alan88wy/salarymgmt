import SalaryList from '../components/SalaryList'
import { server } from '../config/index'
import Login from '../components/Login'
import verifyLogin from 'util/verifyLogin'
import Layout from '../components/Layout'
import useSalaries from '../data/Salaries'

export default function Home({  }) {

  const {loggedIn, data} = verifyLogin();

  const { salaries, isLoading } = useSalaries()
  if (isLoading) return <h1>Loading Salaries ...</h1>


  // const [user, setUser] = useState(null)

  // fetch data
  // useEffect(() => {
  //   fetch('/api/user')
  //     .then(res => res.json())
  //     .then(data => setUser(data))
  // }, [])

  return (
    <>
    <Layout>
      {!loggedIn && (
        <Login />
      )}
      {loggedIn && (
        <SalaryList salaries={ salaries } token={data.token}/>
      )}
      </Layout>
    </>
  )
}

// export const getStaticProps = async () => {
//   const res = await fetch(`${server}/api/salaries`)
//   const salaries = await res.json()

//   return {
//     props: {
//       salaries
//     },
//     revalidate: 10
//   }
// }