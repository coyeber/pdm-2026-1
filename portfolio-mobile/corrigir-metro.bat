@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo === CORRECAO DO METRO / EXPO SDK 58 ===
call npm install
if errorlevel 1 goto erro
call npx expo install --fix
if errorlevel 1 goto erro
call npx expo start --clear --tunnel
goto fim
:erro
echo ERRO na instalacao. Copie o erro no terminal.
pause
:fim
