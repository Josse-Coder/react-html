@echo off
title Demo React HTML
echo Membuat React HTML...
npm.cmd install
if errorlevel 1 pause & exit /b 1
npm.cmd run build
pause
