import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function App() {

  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState("");
  const [concluidas, setConcluidas] = useState(0);
  const [tarefasConcluidas, setTarefasConcluidas] = useState([]);

  useEffect(() => {
    const calculo = (tarefasConcluidas.length / tarefas.length) * 100;
    setConcluidas(isNaN(calculo) ? 0 : calculo.toFixed(0));
  }, [tarefasConcluidas, tarefas]);

  function incluirTarefa(){
    setTarefas(prev => [...prev, {nome: input, concluida: false}])
    setInput("");
  }

  function excluirTarefa(nome, concluida){
    setTarefas(prev => prev.filter(item => item.nome !== nome));
    if (concluida) {
      setTarefasConcluidas(prev => prev.filter(item => item !== nome));
    }
  }

  function atualizarTarefa(nome, isChecked){
    const index = tarefas.findIndex(item => item.nome === nome);
    const updatedTasks = [...tarefas];
    updatedTasks[index].concluida = isChecked;
    setTarefas(updatedTasks);

    if (isChecked) {
      setTarefasConcluidas(prev => [...prev, nome]);
    } else {
      setTarefasConcluidas(prev => prev.filter(item => item !== nome));
    }
  }

  return (
    <View className="flex-1 py-20 px-10 bg-slate-800">
      <Text className="text-white text-3xl font-bold">Lista de Tarefas</Text>
      <Text className=" text-slate-200 mt-1 text-sm">Adicione uma tarefa na lista</Text>
      <View className="flex-row mt-3">
        <TextInput className=" bg-slate-900 h-10 rounded-xl flex-1 mr-3 text-white pl-3" onChangeText={e => setInput(e)} value={input}/>
        <TouchableOpacity className="bg-emerald-300 rounded-xl items-center justify-center h-10 w-10" onPress={incluirTarefa}>
          <Text className="font-bold text-xl">
            +
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        className="mt-6"
        data={tarefas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View className="flex-row mt-3 items-center">
            <Text className=" bg-slate-900 h-10 rounded-xl flex-1 mr-3 text-white pl-3 pt-2.5">{item.nome}</Text>
            <BouncyCheckbox
              size={25}
              fillColor="green"
              unFillColor="white"
              isChecked={item.concluida}
              onPress={(isChecked) => atualizarTarefa(item.nome, isChecked)}
            />            
            <TouchableOpacity className="bg-red-500 rounded-xl items-center justify-center h-10 w-10" onPress={() => excluirTarefa(item.nome, item.concluida)}>
              <Text className="font-bold text-xl">
                -
              </Text>
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text className="text-white text-center mt-6">Nenhuma Tarefa na Lista...</Text>
        )}
      />
      <Text className="text-white text-xl font-bold">Tarefas Concluídas {concluidas}%</Text>
      <StatusBar style="inverted"/>
    </View>
  );
}
