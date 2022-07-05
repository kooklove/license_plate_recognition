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
    // websocker�� ���� HTTP ���� ��Ʈ ��ȣ�� �����Ѵ�.
    clsSetup.m_iListenPort = 8080;
    clsSetup.m_iMaxSocketPerThread = 1;
    clsSetup.m_iThreadMaxCount = 0;
    clsSetup.m_bUseThreadPipe = false;

    // HTTP �������� ����� Document root ������ �����Ѵ�.
    clsServer.m_strDocumentRoot = "C:\\";

    // HTTP ������ �����Ѵ�. HTTP ��û�� ���ŵǸ� �̿� ���� �̺�Ʈ�� CSimpleHttpServer ��ü�� �����Ѵ�.
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

    // ��� �����尡 ����� ������ ����Ѵ�.
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


