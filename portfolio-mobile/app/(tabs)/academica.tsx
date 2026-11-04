import React from 'react';
import {Text,View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Screen,Heading,Panel,Chip} from '../../components/UI';
import {C} from '../../constants/theme';
import {usePortfolio} from '../../context/PortfolioContext';
export default function Academic(){const {portfolio}=usePortfolio();return <Screen>
 <Heading over="MINHA JORNADA" title="Formação acadêmica." desc="Uma trajetória feita de fundamentos sólidos, curiosidade e aprendizado constante."/>
 <View style={{paddingLeft:13,borderLeftWidth:2,borderColor:'#344333',marginLeft:9}}>{portfolio.education.map((e,i)=><View key={e.id} style={{position:'relative',marginBottom:7}}><View style={{position:'absolute',left:-23,top:21,width:18,height:18,borderRadius:9,borderWidth:4,borderColor:C.bg,backgroundColor:i===0?C.lime:C.violet,zIndex:3}}/><Panel><View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:15}}><Ionicons name="school-outline" color={C.lime} size={23}/><Text style={{color:C.lime,fontSize:11,fontWeight:'800'}}>{e.period}</Text></View><Text style={{fontSize:20,fontWeight:'900',color:C.text,letterSpacing:-.7}}>{e.degree}</Text><Text style={{fontSize:12,fontWeight:'700',color:C.violet,marginTop:6}}>{e.institution}</Text><Text style={{fontSize:13,lineHeight:22,color:C.muted,marginVertical:13}}>{e.description}</Text><View style={{flexDirection:'row',flexWrap:'wrap'}}>{e.tags.map(tag=><Chip key={tag} text={tag}/>)}</View></Panel></View>)}</View>
 <Panel style={{backgroundColor:'#1B2524'}}><Ionicons name="bulb-outline" color={C.lime} size={23}/><Text style={{fontSize:17,fontWeight:'800',color:C.text,marginTop:10}}>Aprendizado na prática</Text><Text style={{fontSize:12,color:C.muted,lineHeight:21,marginTop:8}}>Desenvolver projetos reais transforma teoria em resultados — e cada projeto se torna parte do meu portfólio.</Text></Panel>
 </Screen>}
