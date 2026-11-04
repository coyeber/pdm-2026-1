import React from 'react';
import {Tabs} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {C} from '../../constants/theme';
const definitions=[
 {name:'index',title:'Início',icon:'home-outline'},
 {name:'sobre',title:'Sobre',icon:'person-outline'},
 {name:'academica',title:'Estudos',icon:'school-outline'},
 {name:'profissional',title:'Carreira',icon:'briefcase-outline'},
 {name:'projetos',title:'Projetos',icon:'grid-outline'},
] as const;
export default function TabsLayout(){return <Tabs screenOptions={{headerShown:false,tabBarActiveTintColor:C.lime,tabBarInactiveTintColor:'#80899D',tabBarStyle:{backgroundColor:C.surface,borderTopColor:C.line,height:80,paddingTop:8,paddingBottom:17},tabBarLabelStyle:{fontSize:10,fontWeight:'700'}}}>{definitions.map(it=><Tabs.Screen key={it.name} name={it.name} options={{title:it.title,tabBarIcon:({color,focused})=><Ionicons name={focused?(it.icon.replace('-outline','') as any):(it.icon as any)} color={color} size={21}/>}}/>)}</Tabs>}
