/*
 * Copyright (C) 2012 Yee Young Han <websearch@naver.com> (http://blog.naver.com/websearch)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */

#include <iostream>
#include "SimpleHttpServer.h"
#include "HttpStatusCode.h"
#include "HttpParameterList.h"
#include "HttpMultipart.h"
#include "StringUtility.h"
#include "FileUtility.h"
#include "Directory.h"
#include "Log.h"
#include "MemoryDebug.h"
#include "ALPRFacade.h"
#include "JsonObject.h"

extern CHttpStack gclsStack;


string CSimpleHttpServer::clientIp = "";
int CSimpleHttpServer::clientPort = 0;
string CSimpleHttpServer::filename = "";


CSimpleHttpServer::CSimpleHttpServer() : m_bStop(false), cmd_queue("dispatch queue for websocker to React F/E", 1)
{
	filename = "";
	clientPort = 0;
	clientIp = "";
}

CSimpleHttpServer::~CSimpleHttpServer()
{
}

/**
 * @ingroup TestHttpStack
 * @brief HTTP ��û ���� �̺�Ʈ callback
 * @param pclsRequest		HTTP ��û �޽���
 * @param pclsResponse	HTTP ���� �޽��� - ���뿡�� �����Ѵ�.
 * @returns ���뿡�� HTTP ���� �޽����� ���������� �����ϸ� true �� �����ϰ� �׷��� ������ false �� �����Ѵ�.
 */
bool CSimpleHttpServer::RecvHttpRequest(CHttpMessage* pclsRequest, CHttpMessage* pclsResponse)
{
	pclsResponse->m_iStatusCode = HTTP_OK;

	return true;
}

/**
 * @ingroup TestHttpStack
 * @brief WebSocket Ŭ���̾�Ʈ TCP ���� ���� �̺�Ʈ callback
 * @param pszClientIp WebSocket Ŭ���̾�Ʈ IP �ּ�
 * @param iClientPort WebSocket Ŭ���̾�Ʈ ��Ʈ ��ȣ
 */
void CSimpleHttpServer::WebSocketConnected(const char* pszClientIp, int iClientPort)
{
	printf("WebSocket[%s:%d] connected\n", pszClientIp, iClientPort);
	clientIp = pszClientIp;
	clientPort = iClientPort;
}

/**
 * @ingroup TestHttpStack
 * @brief WebSocket Ŭ���̾�Ʈ TCP ���� ���� �̺�Ʈ callback
 * @param pszClientIp WebSocket Ŭ���̾�Ʈ IP �ּ�
 * @param iClientPort WebSocket Ŭ���̾�Ʈ ��Ʈ ��ȣ
 */
void CSimpleHttpServer::WebSocketClosed(const char* pszClientIp, int iClientPort)
{
	printf("WebSocket[%s:%d] closed\n", pszClientIp, iClientPort);
}
#define CMD_JPEGIMG 1
#define CMD_PLATE 2

void CSimpleHttpServer::SendImageToFrontEnd(int cmd, const std::string& s)
{
	std::string strOutput;
	CJsonObject clsObject;
	if (cmd == CMD_JPEGIMG) {


		clsObject.InsertData("JPEG", s);
		clsObject.ToString(strOutput);

	}
	else if (cmd == CMD_PLATE) {

		clsObject.InsertData("PLATE", s);
		clsObject.ToString(strOutput);
	}
	else
		return;

	gclsStack.SendWebSocketPacket(clientIp.c_str(), clientPort, strOutput.c_str(), strOutput.length());
}


/**
 * @ingroup TestHttpStack
 * @brief WebSocket Ŭ���̾�Ʈ ������ ���� �̺�Ʈ callback
 * @param pszClientIp WebSocket Ŭ���̾�Ʈ IP �ּ�
 * @param iClientPort WebSocket Ŭ���̾�Ʈ ��Ʈ ��ȣ
 * @param strData			WebSocket Ŭ���̾�Ʈ�� ������ ������
 * @returns WebSocket Ŭ���̾�Ʈ ������ �����Ϸ��� true �� �����ϰ� �׷��� ������ false �� �����Ѵ�.
 */
bool CSimpleHttpServer::WebSocketData(const char* pszClientIp, int iClientPort, std::string& strData)
{
	printf("WebSocket[%s:%d] recv[%s]\n", pszClientIp, iClientPort, strData.c_str());
	clientPort = iClientPort;
	clientIp = std::string(pszClientIp);
	
	CJsonObject clsObject;
	std::string strOutput;

	if (clsObject.Parse(strData) == -1)
	{
		cout << "parse error :" << strData << endl;

		return false;
	}
	std::string strRequest;
	clsObject.SelectData("request", strRequest);
	cout << "Cmd:" << strRequest << endl;

	if (strRequest.compare("stop") == 0) {
		ALPRFacade& alprFacade = ALPRFacade::instance();
		cout << "stop detecting loop " << endl;
		alprFacade.stopDetect();
	}
	else if (strRequest.compare("start") == 0) {
		std::string strFilepath;
		clsObject.SelectData("filepath", strFilepath);
		cout << "filepath:" << strFilepath << endl;
		std::string strInterval;
		clsObject.SelectData("interval", strInterval);
		cout << "interval:" << strInterval << endl;
		int iInterval = 0;
		std::stringstream ssInt(strInterval);
		ssInt >> iInterval;

		cmd_queue.dispatch([strFilepath, iInterval] {


			ALPRFacade& alprFacade = ALPRFacade::instance();

			alprFacade.filename = strFilepath;
			cout << "filename to alpr : " << strFilepath << endl;
			alprFacade.interval = iInterval;
			cout << "set Interval : " << iInterval << endl;

			cout << "start detecting loop " << endl;
			alprFacade.detect(&CSimpleHttpServer::SendImageToFrontEnd);


			});
	}
	else {
		cout << "Invalid Cmd:" << strRequest << endl;
		return false;
	}

	//test echo
	gclsStack.SendWebSocketPacket(pszClientIp, iClientPort, strData.c_str(), (int)strData.length());

	return true;
}


