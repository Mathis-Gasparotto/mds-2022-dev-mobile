import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from '@expo/vector-icons/SimpleLineIcons'
import SignIn from '../components/Login/SignIn'
import SignUp from '../components/Login/SignUp'
import { guest } from '../Middleware'

const Tab = createBottomTabNavigator()

function SignInScreen({navigation, route}) {
  return <SignIn stylesProps={styles} navigation={navigation} route={route} />
}

function SignUpScreen({navigation, route}) {
  return <SignUp stylesProps={styles} navigation={navigation} route={route} />
}

export default function Login({navigation, route}) {
  
  guest({navigation, route})

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          switch(route.name) {
            case 'SignIn':
              iconName = 'login'
              break
            case 'SignUp':
              iconName = 'arrow-up-circle'
              break
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fbb03b',
        tabBarInactiveTintColor: '#ededed',
        tabBarStyle: {
          backgroundColor: '#14171c',
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        }
      })}
    >
      <Tab.Screen 
        name="SignIn" 
        component={SignInScreen} 
        options={{ 
          tabBarLabel: 'Sign In',
          title: 'Sign In'
        }} 
        />
      <Tab.Screen 
        name="SignUp" 
        component={SignUpScreen}
        options={{
          tabBarLabel: 'Sign Up',
          title: 'Sign Up'

        }} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  h1: {
    fontSize: 40,
    fontWeight: 500,
    paddingVertical: 20,
    backgroundColor: '#14171c',
    width: '100%',
    textAlign: 'center',
    color: 'white'
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingVertical: 50,
  },
  form: {
    width: '80%',
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    with: '100%'
  },
  error: {
    color: 'red',
    fontSize: 20,
    fontWeight: 500,
    paddingVertical: 20,
  }
})
