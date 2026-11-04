import React from 'react';
import {Text,View,Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Screen,Heading,Panel,Chip,SectionTitle,Action,openLink} from '../../components/UI';
import {C} from '../../constants/theme';
import {usePortfolio} from '../../context/PortfolioContext';
export default function About(){const {portfolio,source,notice,refresh,loading}=usePortfolio();return <Screen>
 <Heading over="QUEM ESTÁ POR TRÁS" title="Sobre mim." desc="Código, criatividade, aprendizado e experiências que conectam pessoas a soluções."/>
 <Panel><View style={{flexDirection:'row',gap:14,alignItems:'center'}}><View style={{height:64,width:64,borderRadius:20,backgroundColor:'#2A3D39',alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:25,fontWeight:'900',color:C.lime}}>SC</Text></View><View style={{flex:1}}><Text style={{fontSize:20,fontWeight:'900',color:C.text}}>{portfolio.name}</Text><Text style={{color:C.muted,fontSize:12,marginTop:5}}>{portfolio.city}</Text></View></View><Text style={{fontSize:13,color:C.muted,lineHeight:23,marginTop:19}}>{portfolio.bio}</Text><View style={{marginTop:20}}><Action title="Meu GitHub" icon="logo-github" onPress={()=>openLink(portfolio.github)} light/></View></Panel>
 <SectionTitle title="Stack & tecnologias" aside="FERRAMENTAS"/>
 {portfolio.skills.map((s,i)=><Panel key={s.label}><View style={{flexDirection:'row',alignItems:'center',gap:10,marginBottom:12}}><Ionicons name={(['phone-portrait-outline','layers-outline','server-outline','construct-outline'] as const)[i%4]} size={20} color={C.lime}/><Text style={{color:C.text,fontSize:16,fontWeight:'800'}}>{s.label}</Text></View><View style={{flexDirection:'row',flexWrap:'wrap'}}>{s.items.map(x=><Chip key={x} text={x}/>)}</View></Panel>)}
 <SectionTitle title="Como este app foi feito"/>
 <Panel><Text style={{color:C.text,fontWeight:'800',marginBottom:9}}>Tecnologias utilizadas</Text><Text style={{color:C.muted,lineHeight:22,fontSize:13}}>React Native, Expo SDK 58, Expo Router (navegação), TypeScript, Expo Linear Gradient, Ionicons, AsyncStorage, Parse REST API e Back4App.</Text><Text style={{color:C.text,fontWeight:'800',marginTop:17,marginBottom:9}}>Funcionalidade extra</Text><Text style={{color:C.muted,lineHeight:22,fontSize:13}}>Pesquisa e filtros por categoria de projetos, lista de favoritos persistida no celular e compartilhamento nativo do portfólio.</Text></Panel>
 <SectionTitle title="Conexão com o back-end"/>
 <Panel><View style={{flexDirection:'row',alignItems:'center',gap:9}}><Ionicons name={source==='back4app'?'cloud-done-outline':'cloud-offline-outline'} size={22} color={source==='back4app'?C.lime:'#FFC774'}/><Text style={{fontWeight:'800',fontSize:14,color:C.text}}>{source==='back4app'?'Back4App conectado':'Modo local / sem conexão'}</Text></View><Text style={{fontSize:12,lineHeight:19,marginTop:10,marginBottom:15,color:C.muted}}>{notice}</Text><Action title={loading?'Sincronizando...':'Atualizar dados'} icon="refresh" onPress={()=>{void refresh()}}/></Panel>
 </Screen>}
