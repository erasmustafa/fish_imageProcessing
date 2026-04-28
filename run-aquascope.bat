@echo off
setlocal

set "ROOT=%~dp0"
cd /d "%ROOT%"

echo.
echo AquaScope hizli baslatma
echo ========================
echo.

if not exist package.json (
  echo [HATA] package.json bulunamadi.
  pause
  exit /b 1
)

if not exist node_modules (
  echo [UYARI] node_modules klasoru bulunamadi.
  echo Once su komutu calistirin: npm install
  pause
  exit /b 1
)

set "PYTHON_CMD=python"
where py >nul 2>nul
if %errorlevel%==0 set "PYTHON_CMD=py -3"

echo Frontend baslatiliyor...
start "AquaScope Frontend" cmd /k "cd /d ""%ROOT%"" && npm run dev"

echo Backend baslatiliyor...
start "AquaScope Backend" cmd /k "cd /d ""%ROOT%"" && %PYTHON_CMD% -m uvicorn backend.app:app --reload --host 127.0.0.1 --port 8000"

echo.
echo Frontend: http://localhost:3000
echo Backend : http://127.0.0.1:8000
echo.
echo Not: Backend paketleri eksikse once su komutu calistirin:
echo      pip install -r backend\requirements.txt
echo.
pause
