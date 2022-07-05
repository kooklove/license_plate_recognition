// lgdemo.cpp : This file contains the 'main' function. Program execution begins and ends there.
//
#include "NetworkTCP.h"
#include <windows.h>
#include <map>
#include <iostream>
#include <stdlib.h>
#include <tchar.h> 


#include "SimpleHttpServer.h"
#include "Directory.h"
#include "Log.h"
#include "MemoryDebug.h"

#include "base64.h"

using namespace std;


CHttpStack gclsStack;
/***********************************************************************************/
/* Main                                                                            */
/***********************************************************************************/
int main()
{
    TCHAR Buffer[512];
    DWORD dwRet;


    dwRet = GetCurrentDirectory(512, Buffer);
    wprintf(L"cwd: %lS\n", Buffer);

    CSimpleHttpServer clsServer;
    CTcpStackSetup clsSetup;
    // websocker을 위한 HTTP 수신 포트 번호를 설정한다.
    clsSetup.m_iListenPort = 8080;
    clsSetup.m_iMaxSocketPerThread = 1;
    clsSetup.m_iThreadMaxCount = 0;
    clsSetup.m_bUseThreadPipe = false;

    // HTTP 서버에서 사용할 Document root 폴더를 설정한다.
    clsServer.m_strDocumentRoot = "C:\\";

    // HTTP 서버를 시작한다. HTTP 요청이 수신되면 이에 대한 이벤트를 CSimpleHttpServer 객체로 전달한다.
    if (gclsStack.Start(&clsSetup, &clsServer) == false)
    {
        printf("clsStack.Start error\n");
        return 0;
    }
    else
        std::cout << "Websocket listening[8080]" << std::endl;

    while (clsServer.m_bStop == false)
    {
        sleep(1);
    }

    //Release http server for websocket
    gclsStack.Stop();

    // 모든 쓰레드가 종료될 때까지 대기한다.
    sleep(2);

#ifdef WIN32
    CHttpStack::Release();
    CLog::Release();
    SSLServerStop();
    SSLFinal();
#endif

    return 0;
}
/***********************************************************************************/
/* End Main                                                                        */
/***********************************************************************************/


