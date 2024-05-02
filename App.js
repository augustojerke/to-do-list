import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {

  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState("");

  function incluirTarefa(){
    setTarefas(prev => [...prev, input])
    setInput("")
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
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View className="flex-row mt-3 items-center">
            <Text className=" bg-slate-900 h-10 rounded-xl flex-1 mr-3 text-white pl-3 pt-2.5">{item}</Text>
            <TouchableOpacity className="bg-red-500 rounded-xl items-center justify-center h-10 w-10">
              <Text className="font-bold text-xl">
                -
              </Text>
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text className="text-white text-center mt-6">Nenhuma Tarefa na Lista</Text>
        )}
      />
      <StatusBar style="inverted"/>
    </View>
  );
}

