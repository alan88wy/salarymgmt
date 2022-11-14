// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import SalaryList from '../components/SalaryList'
import { server } from '../config/index'

export default function Home({ salaries }) {
  return (
    <div>
      <SalaryList salaries={ salaries } />
    </div>
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