import { Modal, View, TextInput, Button, Alert } from 'react-native'

function RegistrationModal({ modalVisible, setModalVisible }) {
  console.log('modalVisible -->', modalVisible)
  return (
    <View style={modalVisible ? { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)'} : {}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'gray', height: '90%', width: '80%' }}>
            <TextInput placeholder='Write username here!' />
            <Button title="Sign up" />
          </View>
          <Button title="Band ker!" onPress={() => setModalVisible(false)}/>
        </View>
      </Modal >
    </View>
  )
}

export default RegistrationModal