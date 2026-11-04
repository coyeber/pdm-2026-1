@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo === CORRIGINDO REACT-DOM, BABEL E METRO ===
echo Pare o Expo com CTRL+C antes de continuar.
call npm pkg set dependencies.react=19.3.0 dependencies.react-dom=19.3.0
if errorlevel 1 goto erro
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /f /q package-lock.json
call npm install --no-audit --no-fund
if errorlevel 1 goto erro
call npx expo install --fix
if errorlevel 1 goto erro
call npx expo start --clear --tunnel
goto fim
:erro
echo Erro na instalacao. Copie as PRIMEIRAS linhas do erro.
pause
:fim
