@echo off
chcp 65001 >nul
echo Instalando dependencias do portfolio...
call npm install || goto :fail
call npx expo install --fix || goto :fail
echo Iniciando Expo Go para celular...
call npx expo start --tunnel
goto :eof
:fail
echo Erro na instalacao. Confira Node.js e sua conexao.
pause
