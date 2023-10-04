import { supabase } from "../utils/constants"
import { RealtimeChannel } from '@supabase/supabase-js'
import {
  createResource,
  For,
  ErrorBoundary,
  onMount,
  createEffect,
  createSignal,
  onCleanup,
} from 'solid-js'
import { createStore, produce } from 'solid-js/store'

// based on https://github.com/dshukertjr/solidjs_supabase_todo

type Country = {
  id: number
  name: string
}

const loadTodos = async () => {
  const { data, error } = await supabase.from('countries').select()
  console.log('async function body', data)
  if (error) {
    console.log(error)
    throw error
  }

  return data
}

function App() {
  const [data, { mutate, refetch }] = createResource(loadTodos)

  const [todos, setTodos] = createStore<Country[]>([])

  const [inputTodo, setInputTodo] = createSignal<string>('')

  let subscription: RealtimeChannel

  createEffect(() => {
    const returnedValue = data()
    if (returnedValue) {
      setTodos(returnedValue)
    }
  })

  onMount(() => {
    subscription = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', {
        table: 'countries',
        schema: 'public',
        event: '*'
      },(payload) => {
        switch (payload.eventType) {
          case 'INSERT':
            setTodos((prev) => [...prev, payload.new as Country])
            break
          case 'UPDATE':
            setTodos((item) => item.id === payload.new.id, payload.new)
            break
          case 'DELETE':
            setTodos((prev) => prev.filter((item) => item.id != payload.old.id))
            break
        }
      })
      .subscribe()
  })

  onCleanup(() => {
    subscription?.unsubscribe()
  })

  async function submitted() {
    console.log(inputTodo())
    const { data, error } = await supabase.from('countries').insert({
      name: inputTodo(),
    })
    if (error) {
      console.error(error)
    }
    setInputTodo('')
  }

  return (
    <div class="m-1">
      <input
        class="border-4"
        type="text"
        name="todo"
        value={inputTodo()}
        onInput={(e) => setInputTodo(e.target.value)}
      />
      <button onClick={submitted}>Submit</button>
      <ErrorBoundary
        fallback={
          <div class="text-white bg-red-500">
            Something went terribly wrong <br></br> {data.error.message}{' '}
          </div>
        }
      >
        <For each={todos}>
          {(item) => <div class="text-black p-4 my-2">{item.name}</div>}
        </For>
      </ErrorBoundary>
    </div>
  )
}

export default App;