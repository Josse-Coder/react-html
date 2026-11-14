@echo off
title Demo React HTML
echo Menyiapkan demo React HTML...
npm.cmd install
if errorlevel 1 pause & exit /b 1
npm.cmd run dev
pause
