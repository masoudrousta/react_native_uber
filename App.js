import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { store } from './store'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './screens/HomeScreen'
import MapScreen from './screens/MapScreen'
import EatsScreen from './screens/EatsScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
          >
            <Stack.Navigator>
              <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name='MapScreen'
                component={MapScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name='EatsScreen'
                component={EatsScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  )
}
