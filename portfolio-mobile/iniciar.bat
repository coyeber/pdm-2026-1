@echo off
chcp 65001 >nul
cd /d "%~dp0"
call npm install || goto :fail
call npx expo install --fix || goto :fail
call npx expo start --clear --tunnel
goto :eof
:fail
echo Erro na instalacao.
pause
