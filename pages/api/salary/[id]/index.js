import Link from 'next/link'
import { server } from '../../../../config/index'
import Meta from '../../../../components/Meta'

const salary = ({ salary }) => {
    <>
        <Meta title={ salary.name } />
        
            <p>{salary.id}</p>
            <p>{salary.name}</p>
            <p>{salary.login}</p>
            <p>{salary.salary}</p>
            <br />
            <Link href='/'>Go Back</Link>
    </>
}

export const getStaticProps = async (context) => {
    const res = await fetch(`${server}/api/salaries/${context.params.id}`)

    const article = await res.json()

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