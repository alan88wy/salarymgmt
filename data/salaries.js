import useSWR from 'swr';

function useSalaries (id) {

    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error } = useSWR(`/api/salaries`, fetcher)
  
    return {
      salaries: data,
      isLoading: !error && !data,
      isError: error
    }
  }

  export default useSalaries