import React from 'react';
import {Text,View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Screen,Heading,Panel,Chip} from '../../components/UI';
import {C} from '../../constants/theme';
import {usePortfolio} from '../../context/PortfolioContext';
export default function Professional(){const {portfolio}=usePortfolio();return <Screen>
 <Heading over="ONDE ACONTECE" title="Minha carreira." desc="Da manutenção de computadores ao desenvolvimento de soluções para o dia a dia."/>
 {portfolio.experience.map((e,i)=><Panel key={e.id}><View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:16}}><View style={{backgroundColor:i%2?'#29273A':'#28352B',width:47,height:47,borderRadius:15,alignItems:'center',justifyContent:'center'}}><Ionicons name={i===0?'business-outline':i===1?'desktop-outline':'code-slash-outline'} color={i%2?C.violet:C.lime} size={22}/></View><Text style={{color:C.lime,fontSize:11,fontWeight:'800'}}>{e.period}</Text></View><Text style={{color:C.text,fontSize:19,fontWeight:'900',lineHeight:25}}>{e.title}</Text><Text style={{color:C.violet,fontSize:13,fontWeight:'800',marginTop:8}}>{e.company}</Text><Text style={{color:C.muted,fontSize:13,lineHeight:22,marginTop:13,marginBottom:15}}>{e.description}</Text><View style={{flexDirection:'row',flexWrap:'wrap'}}>{e.tags.map(t=><Chip key={t} text={t}/>)}</View></Panel>)}
 </Screen>}
