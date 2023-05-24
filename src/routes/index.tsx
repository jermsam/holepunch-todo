import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import {Link} from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class={'p-10'}>
      <h1 class={'text-5xl'}>Hi 👋</h1>
      <p>
        Today, you will build a simple to-do-list app with qwik and automerge.
        <br />
        The resulting code from the tutorial will cover:
      </p>
     <div class={'px-10 py-2 text-gray-950'}>
       <ol class="list-decimal">
         <li>Modeling application state using an Automerge document</li>
         <li>Making changes to documents</li>
         <li>Persisting state in IndexedDB to preserve the document after restarting the browser tab (using localForage)</li>
         <li>Now this is a story all about how, my life got flipped-turned upside down</li>
         <li>Supporting real-time collaboration in the same browser (using BroadcastChannel)</li>
       </ol>
     </div>
      <div>
        <Link href={'/todo'}>
          <button
            class="h-5 px-5 py-4  font-semibold rounded-md bg-black text-white flex items-center cursor-pointer shadow-2xl hover:shadow"
          >
            Let's Go
          </button>
        </Link>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
