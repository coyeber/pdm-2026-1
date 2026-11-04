import React from 'react';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {PortfolioProvider} from '../context/PortfolioContext';
export default function RootLayout(){return <PortfolioProvider><StatusBar style="light"/><Stack screenOptions={{headerShown:false}}/></PortfolioProvider>}
