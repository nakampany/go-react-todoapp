import { Box, List, ThemeIcon } from '@mantine/core';
import useSWR from "swr";
import './App.css';
import AddTodo from './components/AddTodo';
import { CheckCircleFillIcon } from '@primer/octicons-react';

export const ENDPOINT = "http://localhost:4000";

export interface Todo {
    id: number
    title: string
    body: string
    done: false
}

const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((res) => res.json());

function App() {
  const {data, mutate} = useSWR<Todo[]>('api/todos', fetcher);

  async function markTodoAddDone(id: number) {
    const update = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
      method: 'PATCH',
    }).then((res) => res.json());

    mutate(update);
  }

  return (
    <Box sx={(theme) => ({
      padding: "2rem",
      width: "100%",
      maxWidth: "40rem",
      margin: "0 auto",
    })}>

      <List spacing="xs" size="sm" mb={12} center>
        {data?.map((todo)=>{
          return <List.Item onClick={() => markTodoAddDone(todo.id)} key={`todo_list__${todo.id}`} icon={
            todo.done ? (
              <ThemeIcon color='teal' size={24} radius="xl">
                <CheckCircleFillIcon size={20}/>
              </ThemeIcon>
              ) : (
                <ThemeIcon color='gray' size={24} radius="xl">
                  <CheckCircleFillIcon size={20}/>
                </ThemeIcon>
              )
          }>
            {todo.title}
          </List.Item>
        })}
      </List>
      {/* {JSON.stringify(data)} */}
      <AddTodo mutate={mutate}/>
    </Box>
  )
}

export default App
