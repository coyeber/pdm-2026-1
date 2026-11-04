import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable, Linking, Share} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {C} from '../constants/theme';
export function Screen({children}:{children:React.ReactNode}){
 return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView contentContainerStyle={{paddingHorizontal:22,paddingTop:18,paddingBottom:46}} showsVerticalScrollIndicator={false}>{children}</ScrollView></SafeAreaView>
}
export function Eyebrow({children}:{children:React.ReactNode}){return <Text style={{fontSize:11,letterSpacing:3,fontWeight:'900',color:C.lime,textTransform:'uppercase',marginBottom:9}}>{children}</Text>}
export function Heading({over,title,desc}:{over:string,title:string,desc?:string}){
 return <View style={{marginBottom:26,marginTop:12}}><Eyebrow>{over}</Eyebrow><Text style={{fontSize:34,fontWeight:'900',letterSpacing:-1.5,lineHeight:39,color:C.text}}>{title}</Text>{desc?<Text style={{fontSize:14,lineHeight:23,color:C.muted,marginTop:12}}>{desc}</Text>:null}</View>
}
export function Chip({text,tone='muted'}:{text:string,tone?:'muted'|'lime'}){return <View style={{backgroundColor:tone==='lime'?'#263620':C.surface2,borderColor:tone==='lime'?'#55773E':C.line,borderWidth:1,paddingHorizontal:11,paddingVertical:7,borderRadius:30,marginRight:7,marginBottom:7}}><Text style={{fontSize:11,fontWeight:'700',color:tone==='lime'?C.lime:C.muted}}>{text}</Text></View>}
export function SectionTitle({title,aside}:{title:string,aside?:string}){return <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:16,marginTop:10}}><Text style={{fontSize:20,fontWeight:'800',color:C.text,letterSpacing:-.6}}>{title}</Text>{aside?<Text style={{color:C.muted,fontSize:11}}>{aside}</Text>:null}</View>}
export function Panel({children,style}:{children:React.ReactNode,style?:any}){return <View style={[{backgroundColor:C.surface,borderRadius:22,padding:19,borderWidth:1,borderColor:C.line,marginBottom:14},style]}>{children}</View>}
export function Action({title,icon,onPress,light=false}:{title:string,icon:React.ComponentProps<typeof Ionicons>['name'],onPress:()=>void,light?:boolean}){return <Pressable onPress={onPress} style={({pressed})=>({backgroundColor:light?C.lime:C.surface2,opacity:pressed?.7:1,paddingHorizontal:17,paddingVertical:14,borderRadius:16,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:9,borderWidth:light?0:1,borderColor:C.line})}><Ionicons name={icon} color={light?C.bg:C.text} size={17}/><Text style={{color:light?C.bg:C.text,fontWeight:'800',fontSize:13}}>{title}</Text></Pressable>}
export function HeroGradient({children}:{children:React.ReactNode}){return <LinearGradient colors={['#24263D','#171E2C','#101927']} start={{x:0,y:0}} end={{x:1,y:1}} style={{padding:24,borderRadius:28,borderWidth:1,borderColor:'#35445B',marginBottom:20,overflow:'hidden'}}>{children}</LinearGradient>}
export function openLink(url:string){if(!url)return;Linking.openURL(url).catch(()=>{});}
export async function sharePortfolio(){try{await Share.share({message:'Conheça o portfólio de Sérgio Cruz: https://github.com/coyeber'});}catch{}}
