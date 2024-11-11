import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import HomeScreen from '@/src/pages/home/home';
import TabTwoScreen from '@/src/pages/report/report';
import ConfigScreen from '@/src/pages/configurations/configurations';
import LoginScreen from '@/src/pages/login/login';
import Register from '@/src/pages/register/register';
import RecoverPassword from '@/src/pages/recoverPassword/recoverPassword';
import EventEdit from '@/src/pages/eventEdit/eventEdit';
import { AuthProvider, AuthContext } from '@/src/context/AuthContext';

const Tabs = createBottomTabNavigator();

function TabLayout() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          backgroundColor: '#5271ff',
          borderTopWidth: 0, 
          elevation: 5, 
          shadowColor: '#000', 
          shadowOffset: { width: 0, height: 1 }, 
          shadowOpacity: 0.2, 
          shadowRadius: 2, 
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)",
        tabBarLabelStyle: {
          marginBottom: 5,
          marginTop: -5,
          fontSize: 12, // Tamanho da fonte
        },
        headerShown: false,
      }}>

      <Tabs.Screen 
        name="login" 
        component={LoginScreen}
        options={{tabBarButton: () => null}} />
      <Tabs.Screen 
        name="register" 
        component={Register}
        options={{tabBarButton: () => null}} />
      <Tabs.Screen 
        name="recover" 
        component={RecoverPassword}
        options={{tabBarButton: () => null}} />
      <Tabs.Screen 
        name="eventEdit" 
        component={EventEdit}
        options={{tabBarButton: () => null}} />

      {isLoggedIn && (
        <>
      <Tabs.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={"home-sharp"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        component={TabTwoScreen}
        options={{
          title: 'Relatório',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={"bar-chart-sharp"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="configurations"
        component={ConfigScreen}
        options={{
          title: 'Configuração',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={"cog"} color={color} />
          ),
        }}
      />
      </>)}
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TabLayout />
    </AuthProvider>
  );
}