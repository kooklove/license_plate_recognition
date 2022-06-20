XCOPY /Q/y %~dp0\opencv\build\x64\vc15\bin\opencv_world455.dll %~dp0\x64\Release\opencv_world455.dll*
XCOPY /Q/y %~dp0\opencv\build\x64\vc15\bin\opencv_world455d.dll %~dp0\x64\Debug\opencv_world455d.dll*
XCOPY /Q/y %~dp0\opencv\build\x64\vc15\bin\opencv_videoio_ffmpeg455_64.dll %~dp0\x64\Release\opencv_videoio_ffmpeg455_64.dll*
XCOPY /Q/y %~dp0\opencv\build\x64\vc15\bin\opencv_videoio_ffmpeg455_64.dll %~dp0\x64\Debug\opencv_videoio_ffmpeg455_64.dll*
XCOPY /Q/y %~dp0\opencv\build\x64\vc15\bin\opencv_videoio_msmf455_64d.dll %~dp0\x64\Debug\opencv_videoio_msmf455_64d.dll*
XCOPY /Q/y %~dp0\opencv\build\x64\vc15\bin\opencv_videoio_msmf455_64.dll %~dp0\x64\Release\opencv_videoio_msmf455_64.dll*
XCOPY /Q/y %~dp0\db-18.1.40\libdb181.dll %~dp0\x64\Release\libdb181.dll*
XCOPY /Q/y %~dp0\db-18.1.40\libdb181.dll %~dp0\x64\Debug\libdb181.dll*
XCOPY /Q/y %~dp0\faker\datafile.txt %~dp0\x64\Release\datafile.txt*
XCOPY /Q/y %~dp0\faker\datafile.txt %~dp0\x64\Debug\datafile.txt*
xcopy /Q/S /E /H /Y /I %~dp0\"rundata" %~dp0\"x64\Release"
xcopy /Q/S /E /H /Y /I %~dp0\"rundata" %~dp0\"x64\Debug"