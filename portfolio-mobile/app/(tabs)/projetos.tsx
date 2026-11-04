import React,{useMemo,useState} from 'react';
import {Text,View,TextInput,Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Screen,Heading,Panel,Chip,openLink} from '../../components/UI';
import {C} from '../../constants/theme';
import {usePortfolio} from '../../context/PortfolioContext';
const cats=['Todos','Web','Mobile','Full Stack','Dados','Favoritos'];
export default function Projects(){
 const {portfolio,favorites,toggleFavorite}=usePortfolio();
 const [search,setSearch]=useState('');const [category,setCategory]=useState('Todos');
 const projects=useMemo(()=>portfolio.projects.filter(p=>{
 const cat=category==='Todos'||(category==='Favoritos'?favorites.includes(p.id):p.category===category);
 const q=search.trim().toLocaleLowerCase('pt-BR');
 return cat&&(!q||[p.title,p.description,...p.tags].join(' ').toLocaleLowerCase('pt-BR').includes(q));
 }),[portfolio.projects,favorites,category,search]);
 return <Screen><Heading over="O QUE EU CONSTRUÍ" title="Projetos." desc="Ideias transformadas em produtos. Pesquise, filtre e salve os seus favoritos."/>
 <View style={{backgroundColor:C.surface,borderColor:C.line,borderWidth:1,borderRadius:16,flexDirection:'row',alignItems:'center',paddingHorizontal:14,marginBottom:16}}><Ionicons name="search-outline" color={C.muted} size={21}/><TextInput placeholder="Buscar por nome ou tecnologia..." placeholderTextColor="#7D8799" value={search} onChangeText={setSearch} style={{flex:1,padding:14,color:C.text,fontSize:13}} autoCorrect={false}/>{search.length>0?<Pressable onPress={()=>setSearch('')}><Ionicons name="close-circle" size={19} color={C.muted}/></Pressable>:null}</View>
 <View style={{flexDirection:'row',flexWrap:'wrap',marginBottom:11}}>{cats.map(cat=><Pressable onPress={()=>setCategory(cat)} key={cat} style={{paddingVertical:9,paddingHorizontal:13,backgroundColor:category===cat?C.lime:C.surface2,borderRadius:18,marginRight:7,marginBottom:9}}><Text style={{fontSize:11,fontWeight:'800',color:category===cat?C.bg:C.muted}}>{cat}{cat==='Favoritos'?' ♡':''}</Text></Pressable>)}</View>
 <Text style={{color:C.muted,fontSize:11,marginBottom:14}}>{projects.length} projeto(s) encontrado(s) · {favorites.length} salvo(s)</Text>
 {projects.map((p,i)=><Panel key={p.id}><View style={{height:93,borderRadius:15,backgroundColor:'#1B2331',marginBottom:17,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:C.line}}><Text style={{fontSize:43,color:p.accent,fontWeight:'900',letterSpacing:-3}}>{('0'+(i+1)).slice(-2)}<Text style={{color:C.text}}>.</Text></Text><Text style={{position:'absolute',top:12,left:13,color:C.muted,fontSize:10,letterSpacing:2}}>{p.category.toUpperCase()}</Text><Text style={{position:'absolute',bottom:11,right:13,color:C.muted,fontSize:10}}>{p.year}</Text></View><View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}><Text style={{fontSize:19,color:C.text,fontWeight:'900',flex:1,letterSpacing:-.3}}>{p.title}</Text><Pressable accessibilityLabel={favorites.includes(p.id)?'Remover favorito':'Adicionar favorito'} onPress={()=>toggleFavorite(p.id)} style={{padding:8,backgroundColor:C.surface2,borderRadius:12}}><Ionicons name={favorites.includes(p.id)?'heart':'heart-outline'} size={21} color={favorites.includes(p.id)?C.danger:C.muted}/></Pressable></View><Text style={{fontSize:12,lineHeight:21,color:C.muted,marginTop:11,marginBottom:15}}>{p.description}</Text><View style={{flexDirection:'row',flexWrap:'wrap'}}>{p.tags.map(tag=><Chip key={tag} text={tag}/>)}</View>{p.link?<Pressable onPress={()=>openLink(p.link)} style={{flexDirection:'row',gap:6,alignItems:'center',marginTop:10}}><Text style={{fontWeight:'800',color:C.lime,fontSize:12}}>Ver código</Text><Ionicons name="arrow-up-forward" color={C.lime} size={16}/></Pressable>:null}</Panel>)}
 {projects.length===0?<Panel><Ionicons name="search-outline" size={27} color={C.muted}/><Text style={{color:C.text,fontSize:16,fontWeight:'800',marginTop:10}}>Nenhum resultado</Text><Text style={{color:C.muted,fontSize:12,marginTop:8}}>Altere a busca ou escolha outra categoria.</Text></Panel>:null}
 </Screen>
}
