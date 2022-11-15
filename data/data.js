const fetcher = (...args) => fetch(...args).then(res => res.json())

function useUser (id) {
    const { data, error } = useSWR(`/api/users/${id}`, fetcher)
  
    return {
      user: data,
      isLoading: !error && !data,
      isError: error
    }
  }
