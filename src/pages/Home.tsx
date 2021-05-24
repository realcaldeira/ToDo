import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

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
    if(newTaskTitle.length > 0){
      const data = {
          id: new Date().getTime(),
          title: newTaskTitle,
          done: done
        }
        setTasks(oldState => [...oldState, data]);
        setNewTaskTitle('');//PROBLEMA
    } else {
      Alert.alert("", "Digite um valor válido.");
    } 
    
  }

  function handleMarkTaskAsDone(id: number) {
    const data = tasks.map(task =>{ 
      if(task.id === id){
        return {
          ...task,
          done: !task.done
        }
        }else{
          return task
      }
    })
    setTasks(data);
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => oldState.filter(
      task => task.id !== id 
    ));
  }

  return (
    <View style={styles.container}>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFF'
  }
})