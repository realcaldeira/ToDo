import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [done, SetDone] = useState(false);
  
  function handleAddTask(newTaskTitle: string) {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
      setTasks(oldState => [...oldState, data]);
  }

  function handleMarkTaskAsDone(id: number) {
    const data = {
      id: id,
      title: newTaskTitle,
      done: !done
    }
    
    setTasks(oldState => [...oldState, data]);
  }

  function handleRemoveTask(id: number) {
    
    setTasks(oldState => oldState.filter(
      task => task.id !== id
    ))
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </>
  )
}
