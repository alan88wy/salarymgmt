import { useRouter } from "next/router";
import Layout from '../components/Layout'

export default function Home() {

    const router = useRouter()

    const {
      query: {message, processed, discarded}
    } = router

    const props = {
      message,
      processed,
      discarded
    }

    return (
      <Layout>
        <br />
        <br />
        <h1>{ props.message }</h1>
        <br />
        { props.processed > 0 ? <h3>{ props.processed } records processed.</h3> : " " } 
        { props.discarded > 0 ? <h3>{ props.discarded } records discarded.</h3> : " " }
      </Layout>
    )
  }