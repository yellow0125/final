import React, { useState } from 'react';
import { Button, Text, TextInput, View, Alert } from 'react-native';
import { container, form } from '../../constants/Style';
import { auth } from "../../firebase/firebase-setup"
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      // console.log(userCred);
    } catch (err) {
      Alert.alert(err.message);
      console.log(err.message);
    }
  };

  return (
    <View style={container.center}>
      <View style={container.formCenter}>
        <TextInput
          style={form.textInput}
          placeholder="email"
          onChangeText={(newEmail) => setEmail(newEmail)}
          value={email}
        keyboardType="email-address"
        />
        <TextInput
          style={form.textInput}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(newPassword) => setPassword(newPassword)}
          value={password}
        />

        <Button
          style={form.button}
          onPress={handleLogin}
          title="Sign In"
        />
        <View style={form.bottomButton} >
        <Text
          title="Register"
          onPress={() => navigation.replace("Register")} >
          Don't have an account? SignUp.
        </Text>
        {/* <Button
          title="Don't have an account? SignUp."
          onPress={() => navigation.replace("Register")}
        /> */}
      </View>
      </View>
    </View>
  )
}

