@echo off
echo ========================================================
echo   CreatorPilot - Launching Development Server & Evals
echo ========================================================
echo.
echo 1. Running Appendix A Evals...
call npm test
echo.
echo 2. Starting Next.js Local Dev Server...
call npm run dev
