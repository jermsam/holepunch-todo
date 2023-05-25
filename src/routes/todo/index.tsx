import {$, component$, useSignal, /*useStore,*/ useTask$} from '@builder.io/qwik';
import {HiXCircleMini} from '@qwikest/icons/heroicons';
import {routeLoader$, z} from '@builder.io/qwik-city';
import {formAction$, InitialValues, reset, SubmitHandler, useForm, zodForm$} from '@modular-forms/qwik';


// import {SDK} from 'hyper-sdk';


import {isServer} from '@builder.io/qwik/build';
import {swarm, socket} from '~/p2pclient/index.mjs';
// import {createHash} from 'crypto';
// @ts-ignore
// import crypto from 'hypercore-crypto'
// import {addTodo, doc} from '~/local-server/automerge';

const todoSchema = z.object({
  text: z
    .string()
    .min(1, 'Please enter item text.'),
});

type TodoForm = z.infer<typeof todoSchema>;

export const useFormLoader = routeLoader$<InitialValues<TodoForm>>(() => ({
  text: '',
}));

export const useFormAction = formAction$<TodoForm>((values) => {
  // Runs on server
  console.log({values});
}, zodForm$(todoSchema));




export default component$(() => {
  const itemDialog = useSignal<HTMLDialogElement>();
  const [todoForm, {Form, Field/*, FieldArray*/}] = useForm<TodoForm>({
    loader: useFormLoader(),
    validate: zodForm$(todoSchema),
    action: useFormAction(),
  });
  

  
  const todos = useSignal<TodoForm[]>([]);
  
  useTask$(() => {
    if (isServer) {
      return;
    }
    
    swarm.on('connection', (conn: any, peerInfo: any) => {
      conn.on('data', (data: any) => {
        // console.log(data);
        console.log({data, peerInfo});
        todos.value = data;
      });
      
      conn.on('close', () => {
        console.log('closed connection');
      });
      
      conn.on('error', (e: any) => {
        console.log(e);
      });
      
    });
    
    
  });
  
  const handleSubmit: SubmitHandler<TodoForm> = $((values /*event*/) => {
    
    socket.onopen = (/*event*/) => {
      socket.send(JSON.stringify(values));
    };
    
    reset(todoForm);
    itemDialog.value?.close();
  });
  
  return (
    <section class="p-10">
      <button
        class="h-5 px-5 py-4  font-semibold rounded-md bg-black text-white flex items-center cursor-pointer shadow-2xl hover:shadow"
        onclick$={() => itemDialog.value?.showModal()}
      >
        Add Item
      </button>
     
      <dialog ref={itemDialog} class={'rounded-2xl'}>
        <div class={'bg-white p-10 min-w-[300px] relative'}>
          <HiXCircleMini onClick$={() => itemDialog.value?.close()} class={'absolute right-1 top-1 cursor-pointer'}/>
          <div class={'flex flex-col gap-2'}>
            <h3>Add Item</h3>
            <Form
              onSubmit$={$((values, event) => handleSubmit(values, event))}
            >
              <Field name="text">
                {(field, props) => (
                  <div>
                  <textarea
                    {...props}
                    value={field.value}
                    class="focus:ring-2 focus:ring-gray-950 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
                  
                  />
                    {field.error && <div class={'text-red-800'}>{field.error}</div>}
                  </div>
                )}
              </Field>
              <div class={'flex justify-end mt-5'}>
                <button type="submit"
                        class="h-5 px-5 py-4  font-semibold rounded-md bg-black text-white flex items-center cursor-pointer shadow-2xl hover:shadow">
                  Add
                </button>
              </div>
            </Form>
          </div>
        </div>
      </dialog>
      <div>
        {
          todos.value.map((item, index) => (
            <div key={index} class="w-96 bg-white shadow rounded">
              {item.text}
            </div>
          ))
        }
      </div>
    </section>
  );
});
