import { useEffect, useState } from 'react';
import './scss/App.scss';
import CurrentDate from './components/CurrentDate';
import List from './components/List';
import Alert from './components/Alert';
import EmptyTodo from './components/EmptyTodo';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  else {
    return []
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      // display alert
      showAlert(true, 'danger', 'Please enter some values!');
    }
    else if(name && isEditing) {
      // edit
      setList(list.map((item)=>{
        if(item.id === editId ) {
          return {...item, title: name }
        }
        return item
      }));
      setName('');
      setEditID(null);
      setIsEditing(false)
      showAlert(true, 'success', 'value changed');
    }
    else {
      // show alert
      showAlert(true, 'success', 'Item added to the list!');
      const newItem = {id: new Date().getTime().toString(),
      title: name, important: false, status: false};
      setList([...list, newItem]);
      setName('');
    }
  }

  const showAlert = (show=false, type="", msg="") => {
    setAlert({show,type,msg});
  }
  const clearList = () => {
    showAlert(true, 'danger', 'Empty List');
    setList('');
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'Item removed');
    setList(list.filter((item)=> item.id !== id));
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  const isImportant = (id) => {
    setList(list.map((item)=>{
      if(item.id === id ) {
        let impStatus = item.important;
        return {...item, important:!impStatus }
      }
      return item
    }));
  }
  
  const isCompleted = (id) => {
    setList(list.map((item)=>{
      if(item.id === id ) {
        let status = item.status;
        return {...item, status:!status }
      }
      return item
    }));
  }


  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list])
  

  return (
    <div className="App">
      <main className='container'>
        <div className="title">
          <form className='todo-form' onSubmit={handleSubmit}>
            {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
            <h1 className='page-title'>My day</h1>
            <CurrentDate />
            <div className="form-control">
              <input type="text" className="todo" placeholder='Morning workout' value={name} onChange={(e) => setName(e.target.value)} />
              <button type='submit' className='submit-btn'>Submit</button>
            </div>
          </form>
        </div>
        {list.length > 0 ? (
          <>
          <List items={list} removeItem={removeItem} editItem={editItem} isImportant={isImportant} isCompleted={isCompleted} />
          <button className='clear-btn' onClick={clearList}>Clear items</button>
          </>
        ) : (
          <EmptyTodo />
        )}                
      </main>
    </div>
  );
}

export default App;
