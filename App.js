import React, { useState } from 'react';
import { View, Text, TextInput, Picker, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [fabricante, setFabricante] = useState('Vibra');
  const [totalPecas, setTotalPecas] = useState('');
  const [pecasPorCaixa, setPecasPorCaixa] = useState('');
  const [resultado, setResultado] = useState('');
  const [mostrarCalculos, setMostrarCalculos] = useState(false);
  const [calculosDetalhados, setCalculosDetalhados] = useState('');
  const [codigoPecaToupo, setCodigoPecaToupo] = useState('2095270004-1');

  const calcular = () => {
    setMostrarCalculos(false);
    let resultadoHtml = '';
    let calculosHtml = '';

    if (!totalPecas) {
      alert("Por favor, insira o total de peças.");
      return;
    }

    if (fabricante === 'Vibra' || fabricante === 'DN') {
      if (!pecasPorCaixa) {
        alert("Por favor, insira a quantidade de peças por caixa.");
        return;
      }

      const etiquetas = Math.floor(totalPecas / pecasPorCaixa);
      const totalEtiquetas = etiquetas;
      const totalCalculado = etiquetas * pecasPorCaixa;
      const sobra = totalPecas - totalCalculado;

      resultadoHtml = `
        Total de etiquetas a serem imprimidas: ${totalEtiquetas}
        Quebra: ${sobra}
      `;

      calculosHtml = `
        Divisão: ${totalPecas} / ${pecasPorCaixa} = ${totalEtiquetas}
        Multiplicação: ${totalEtiquetas} * ${pecasPorCaixa} = ${totalCalculado}
        Subtração: ${totalPecas} - ${totalCalculado} = ${sobra}
      `;

      if (fabricante === 'DN') {
        resultadoHtml += `⚠️ Atenção ⚠️ Use a etiqueta antiga no plano e imprima as novas para as caixas da DN.`;
      }

    } else if (fabricante === 'Toupo') {
      let pecasPorSaco, sacosPorPalete;

      switch (codigoPecaToupo) {
        case '2095270004-1':
          pecasPorSaco = 100;
          sacosPorPalete = 43.2;
          break;
        case '2095270003-1':
          pecasPorSaco = 25;
          sacosPorPalete = 77.76;
          break;
        case '20028524-1':
          pecasPorSaco = 25;
          sacosPorPalete = 64.8;
          break;
        case '10018462-1':
          pecasPorSaco = 200;
          sacosPorPalete = 30;
          break;
        case '2095490002-1':
          pecasPorSaco = 300;
          sacosPorPalete = 54;
          break;
        case '2095080003-1':
          pecasPorSaco = 100;
          sacosPorPalete = 50.4;
          break;
        case '2095160004-1':
          pecasPorSaco = 20;
          sacosPorPalete = 108;
          break;
        case '10018996-1':
          pecasPorSaco = 50;
          sacosPorPalete = 66;
          break;
        case '2095430002-1':
          pecasPorSaco = 50;
          sacosPorPalete = 60;
          break;
        case '2095080004-1':
          pecasPorSaco = 50;
          sacosPorPalete = 54;
          break;
        case '2095160007-1':
          pecasPorSaco = 50;
          sacosPorPalete = 43.2;
          break;
        default:
          pecasPorSaco = 0;
          sacosPorPalete = 0;
          break;
      }

      const pecasPorPalete = pecasPorSaco * sacosPorPalete;
      const paletesCompletos = Math.floor(totalPecas / pecasPorPalete);
      const pecasRestantes = totalPecas % pecasPorPalete;
      const pecasParaEnviar = paletesCompletos * pecasPorPalete;

      resultadoHtml = `
        Para o fabricante Tuopu:
        Código da Peça: ${codigoPecaToupo}
        Total de Paletes Completos a serem enviados: ${paletesCompletos}
        Total de peças para envio: ${pecasParaEnviar}
        Total de peças restantes: ${pecasRestantes}
      `;

      calculosHtml = `
        Código da Peça: ${codigoPecaToupo}
        Total de peças por palete: ${pecasPorPalete}
        ${pecasPorSaco} peças por saco, ${sacosPorPalete} sacos por palete, ${pecasPorPalete} peças por palete.
      `;
    }

    setResultado(resultadoHtml);
    setCalculosDetalhados(calculosHtml);
  };

  const handleMostrarCalculos = () => {
    setMostrarCalculos(!mostrarCalculos);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Calculadora de Etiquetas</Text>
      
      <Picker
        selectedValue={fabricante}
        onValueChange={(itemValue) => setFabricante(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Fabricante Vibracoustic" value="Vibra" />
        <Picker.Item label="Fabricante DN Automotivos" value="DN" />
        <Picker.Item label="Fabricante Tuopu" value="Toupo" />
      </Picker>

      <TextInput
        placeholder="Insira o total de peças"
        style={styles.input}
        keyboardType="numeric"
        value={totalPecas}
        onChangeText={setTotalPecas}
      />

      {fabricante === 'Toupo' && (
        <>
          <Picker
            selectedValue={codigoPecaToupo}
            onValueChange={(itemValue) => setCodigoPecaToupo(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Código 2095270004-1" value="2095270004-1" />
            <Picker.Item label="Código 2095270003-1" value="2095270003-1" />
            <Picker.Item label="Código 20028524-1" value="20028524-1" />
            <Picker.Item label="Código 10018462-1" value="10018462-1" />
            <Picker.Item label="Código 2095490002-1" value="2095490002-1" />
            <Picker.Item label="Código 2095080003-1" value="2095080003-1" />
            <Picker.Item label="Código 2095160004-1" value="2095160004-1" />
            <Picker.Item label="Código 10018996-1" value="10018996-1" />
            <Picker.Item label="Código 2095430002-1" value="2095430002-1" />
            <Picker.Item label="Código 2095080004-1" value="2095080004-1" />
            <Picker.Item label="Código 2095160007-1" value="2095160007-1" />
          </Picker>
        </>
      )}

      {(fabricante === 'Vibra' || fabricante === 'DN') && (
        <TextInput
          placeholder="Insira a quantidade na caixa"
          style={styles.input}
          keyboardType="numeric"
          value={pecasPorCaixa}
          onChangeText={setPecasPorCaixa}
        />
      )}

      <Button title="Calcular" onPress={calcular} />

      <Text style={styles.resultado}>{resultado}</Text>

      {resultado !== '' && (
        <TouchableOpacity onPress={handleMostrarCalculos}>
          <Text style={styles.mostrarCalculosBtn}>
            {mostrarCalculos ? 'Ocultar cálculos utilizados' : 'Mostrar cálculos utilizados'}
          </Text>
        </TouchableOpacity>
      )}

      {mostrarCalculos && (
        <View style={styles.calculo}>
          <Text style={styles.calculoHeader}>Cálculo Detalhado:</Text>
          <Text>{calculosDetalhados}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7dc0ff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#fff',
  },
  resultado: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  mostrarCalculosBtn: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 10,
    marginBottom: 20,
  },
  calculo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  calculoHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});