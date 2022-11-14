import { useRouter } from "next/router";

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
      <>
        <br />
        <br />
        <h1>{ props.message }</h1>
        <br />
        { props.processed > 0 ? <h3>{ props.processed } records processed.</h3> : " " } 
        { props.discarded > 0 ? <h3>{ props.discarded } records discarded.</h3> : " " }
      </>
    )
  }