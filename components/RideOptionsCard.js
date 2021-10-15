import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data = [
  {
    id: 'Uber-X-123',
    title: 'Uber X',
    multiplier: 1,
    image:
      'https://res.cloudinary.com/dmvktbxff/image/upload/v1634213243/uber_react_native/uber_ride_rjcekz.jpg',
  },
  {
    id: 'Uber-XL-456',
    title: 'Uber XL',
    multiplier: 1.2,
    image:
      'https://res.cloudinary.com/dmvktbxff/image/upload/v1634260125/uber_react_native/UberXL_rusaxf.png',
  },
  {
    id: 'Uber-LUX-789',
    title: 'Uber LUX',
    multiplier: 1.75,
    image:
      'https://res.cloudinary.com/dmvktbxff/image/upload/v1634260202/uber_react_native/221A8ECB-301B-432B-A29C-DFDCB8AE02D9_nomlui.jpg',
  },
]

const SURGE_CHARGE_RATE = 1.5

const RideOptionsCard = () => {
  const [selected, setSelected] = useState(null)
  const travelTimeInformation = useSelector(selectTravelTimeInformation)
  const navigation = useNavigation()
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-3 left-5 p-3 rounded-full z-50`}
          onPress={() => navigation.navigate('NavigateCard')}
        >
          <Icon name='chevron-left' type='fontawesome'></Icon>
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row items-center justify-between px-10 ${
              id === selected?.id && 'bg-gray-200'
            }`}
          >
            <Image
              style={{
                width: 80,
                height: 80,
                resizeMode: 'contain',
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text}</Text>
            </View>
            <Text style={tw`text-xl`}>
              £
              {(
                (travelTimeInformation?.duration?.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                100
              ).toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          style={tw`bg-black py-1 ${!selected && 'bg-gray-300'}`}
          disabled={!selected}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})
