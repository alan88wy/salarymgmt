import Link from 'next/link'
// using our api/articles
import { server } from '../../../config/index'
import Meta from '../../../components/Meta'
// import { useRouter } from "next/router"

const salary = ( { salary } ) => {

    // const router = useRouter()
    // const {id} = router.query

    return (
        <>
            <Meta title={ salary.name }  />
            <h1>{salary.name}</h1>
            <p>{salary.salary}</p>
            <br />
            <Link href='/'>Go Back</Link>
        </>
    )
}


// Let's use our api


export const getStaticProps = async (context) => {
    const res = await fetch(`${server}/api/salaries/${context.params.id}`)

    const salary = await res.json()

    return {
        props: {
            salary,
        },
    }
}

export const getStaticPaths = async (context) => {

    const res = await fetch(`${server}/api/salaries`)

    const salaries = await res.json()

    const ids = salaries.map(( salary ) => salary.id)

    const paths = ids.map(( id ) => ({ params: { id: id.toString()}}))

    // return 404 page if data is not found
    return {
            paths,
            fallback: false,
    }
}




export default salary