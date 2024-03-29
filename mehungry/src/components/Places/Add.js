import { useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { gql, useMutation } from '@apollo/client'
import { Form, FormItem } from 'react-native-form-component'
import { GET_PLACES } from './List'


const POST_PLACE = gql`
  mutation PostPlace($input: PlaceInput!) {
    createPlace(data: $input) {
      data {
        id
        attributes {
          title
          address
          latitude
          longitude
        }
      }
    }
  }
`

export default function Add({stylesProps, navigation, route}) {
  const [PostPlace, { data, loading, error }] = useMutation(POST_PLACE, {
    refetchQueries: [
      {query: GET_PLACES},
    ],
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [form, setForm] = useState({
    title: '',
    address: '',
    latitude: '',
    longitude: '',
    comment: '',
  })

  const handleSubmit = async () => {
    if(form.title === '' || form.address === '' || form.latitude === '' || form.longitude === '') return alert('Please fill in all fields')
    PostPlace({
      variables: {
        input: {
          title: form.title,
          address: form.address,
          latitude: parseFloat(form.latitude),
          longitude: parseFloat(form.longitude),
          comment: form.comment ? form.comment : null,
          publishedAt: new Date()
        }
      }
    }).then(async (res) => {
      setForm({
        title: '',
        address: '',
        latitude: '',
        longitude: '',
        comment: '',
      })
      if (res.data) {
        alert('Place added!')
        navigation.navigate('List')
      }
    }).catch((error) => {
      setErrorMessage(error.message)
    })
  }

  return (
    <View style={stylesProps.container}>
      <Text style={stylesProps.h1}>Add place</Text>
      <ScrollView 
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center'
        }} 
        centerContent={true} 
        style={{
          width: '100%'
        }}
      >
        <View style={stylesProps.content}>
          <Form 
            onButtonPress={async () => await handleSubmit()}
            buttonStyle={stylesProps.submitButton} 
            style={stylesProps.form}
            buttonText={loading ? 'Loading...' : 'Add'}
            >
            <FormItem
              label="Title"
              isRequired
              value={form.title}
              onChangeText={(title) => setForm({
                ...form,
                title
              })}
              asterik
              textInputStyle={stylesProps.textInput}
              />
            <FormItem
              label="Address"
              isRequired
              value={form.address}
              onChangeText={(address) => setForm({
                ...form,
                address
              })}
              asterik
              textInputStyle={stylesProps.textInput}
            />
            <FormItem
              label="Latitude"
              isRequired
              value={form.latitude}
              onChangeText={(latitude) => setForm({
                ...form,
                latitude
              })}
              asterik
              textInputStyle={stylesProps.textInput}
              inputMode='numeric'
            />
            <FormItem
              label="Longitude"
              isRequired
              value={form.longitude}
              onChangeText={(longitude) => setForm({
                ...form,
                longitude
              })}
              asterik
              textInputStyle={stylesProps.textInput}
              inputMode='numeric'
            />
            <FormItem
              label="Comment"
              value={form.comment}
              onChangeText={(comment) => setPlace({
                ...place,
                comment
              })}
              textInputStyle={stylesProps.textInput}
            />
          </Form>
          {errorMessage && 
            <Text style={stylesProps.error}>{errorMessage}</Text>
          }
        </View>
      </ScrollView>
    </View>
  )
}