import React, {createContext, useContext, useEffect, useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadPortfolio, Portfolio} from '../services/back4app';
import fallback from '../data/portfolio.json';

type Source='back4app'|'local';
type Store={ portfolio:Portfolio; source:Source; loading:boolean;notice:string;favorites:string[];toggleFavorite:(id:string)=>void;refresh:()=>Promise<void> };
const CTX = createContext<Store|null>(null);
const KEY='coyeber:favorites:v1';
export function PortfolioProvider({children}:{children:React.ReactNode}){
 const [portfolio,setPortfolio]=useState<Portfolio>(fallback);
 const [source,setSource]=useState<Source>('local');
 const [loading,setLoading]=useState(true);
 const [notice,setNotice]=useState('Carregando portfólio...');
 const [favorites,setFavorites]=useState<string[]>([]);
 const refresh=useCallback(async()=>{
  setLoading(true);
  try { const out=await loadPortfolio(); setPortfolio(out.content); setSource(out.source); setNotice(out.notice); }
  finally {setLoading(false)}
 },[]);
 useEffect(()=>{refresh(); AsyncStorage.getItem(KEY).then(v=>{if(v){const saved=JSON.parse(v); if(Array.isArray(saved))setFavorites(saved)}}).catch(()=>{});},[refresh]);
 const toggleFavorite=(id:string)=>setFavorites(prev=>{
  const next=prev.includes(id)?prev.filter(x=>x!==id):[...prev,id];
  AsyncStorage.setItem(KEY,JSON.stringify(next)).catch(()=>{});
  return next;
 });
 return <CTX.Provider value={{portfolio,source,loading,notice,favorites,toggleFavorite,refresh}}>{children}</CTX.Provider>
}
export function usePortfolio(){const context=useContext(CTX);if(!context)throw Error('Missing provider');return context;}
