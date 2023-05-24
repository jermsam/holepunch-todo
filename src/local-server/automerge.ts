import * as Automerge from '@automerge/automerge';

interface Todo {
  text: string;
  done?: boolean;
}

interface TodosDoc {
  items: Automerge.List<Todo>
}

export let doc: Automerge.unstable.Doc<TodosDoc> = Automerge.init()

function updateDoc(newDoc: Automerge.unstable.Doc<TodosDoc>) {
  doc = newDoc
}

export  function addTodo(user: Todo) {
  const newDoc = Automerge.change(doc, doc => {
    if (!doc.items) doc.items = [] as unknown as Automerge.List<Todo>
    doc.items.push(user)
  })
  updateDoc(newDoc)
}

export function toggle(index: number) {
  const newDoc = Automerge.change(doc, (doc) => {
    // your code here
    const toggledItem = doc.items[index]
    doc.items.insertAt(index, toggledItem)
  })
  updateDoc(newDoc)
}
