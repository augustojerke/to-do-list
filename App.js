import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 py-16 px-10 bg-slate-800">
      <Text className="text-white text-2xl font-bold">Lista de Tarefas</Text>
      <Text className=" text-slate-200 mt-2 text-sm">Adicione uma tarefa na lista</Text>
      <StatusBar style="inverted"/>
    </View>
  );
}

