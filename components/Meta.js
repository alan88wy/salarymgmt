import Head from 'next/head'

const Meta = ( { title, keywords, description }) => {
  return (

    <Head>
        <title>{ title }</title>
        <meta name='keywords' content={ keywords } />
        <meta name='description' content={ description } />
        <meta charSet='utf-8' />
        <link rel='icdn' href='/favicon.ico' />
    </Head>

  )
}

Meta.defaultProps = {
    title: 'Salary Management',
    keywords: 'HR, Salary, Management',
    description: 'Salary Management Solution'
}

export default Meta