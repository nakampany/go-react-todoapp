import { Box } from '@mantine/core';
import useSWR from "swr";
import './App.css';

export const ENDPOINT = "http://localhost:4000";

const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((res) => res.json());

function App() {

  const {data, mutate} = useSWR('api/todos', fetcher);

  return (
    <Box>
      {JSON.stringify(data, null, 2)}
    </Box>
  )
}

export default App
