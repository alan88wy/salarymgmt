// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import SalaryList from '../components/SalaryList'

export default function Home({ salaries }) {
  return (
    <div>
      <SalaryList salaries={ salaries } />
    </div>
  )
}

export const getStaticProps = async () => {


  const salaries = {}

  return {
    props: {
      salaries
    }
  }
}
