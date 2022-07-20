#pragma once

#include <windows.h>
#include <map>
#include <iostream>
#include <stdlib.h>
#include <tchar.h> 
#include "opencv2/opencv.hpp"
#include "support/timing.h"
#include "motiondetector.h"
#include "alpr.h"
#include "DeviceEnumerator.h"
#include "dispatch_queue.h"

using namespace alpr;
using namespace std;
using namespace cv;

class CSimpleHttpServer;

#define CMD_JPEGIMG 1
#define CMD_PLATE 2

class ALPRFacade
{

private:
	ALPRFacade(int type) : _type(type) {};

public:
	static ALPRFacade& instance1() {
		static ALPRFacade* instance = new ALPRFacade(1);
		return *instance;
	}
	static ALPRFacade& instance2() {
		static ALPRFacade* instance = new ALPRFacade(2);
		return *instance;
	}
	static ALPRFacade& instance3() {
		static ALPRFacade* instance = new ALPRFacade(3);
		return *instance;
	}

	~ALPRFacade() {};
	// detect
	void detect(void (*)(int cmd, const std::string&));
	void stopDetect();
	bool detectandshow(Alpr* alpr, cv::Mat frame, std::string region, bool writeJson, void (*)(int cmd, const std::string&));
	double CLOCK();
	double avgdur(double newdur);
	double avgfps();
	void InitCounter();
	//void GetResponses(void);

	CSimpleHttpServer* pWebsocketServer;

	// Deleted operations
	ALPRFacade(const ALPRFacade& rhs) = delete;
	ALPRFacade& operator=(const ALPRFacade& rhs) = delete;
	ALPRFacade(ALPRFacade&& rhs) = delete;
	ALPRFacade& operator=(ALPRFacade&& rhs) = delete;

	enum class Mode { mNone, mLive_Video, mPlayback_Video, mImage_File };
	enum class VideoResolution { rNone, r640X480, r1280X720 };
	enum class VideoSaveMode { vNone, vNoSave, vSave, vSaveWithNoALPR };
	enum class ResponseMode { ReadingHeader, ReadingMsg };

	Mode mode = Mode::mPlayback_Video;
	VideoSaveMode videosavemode = VideoSaveMode::vNoSave;
	VideoResolution vres = VideoResolution::r1280X720;

	string filename = "F:\\22_SWARCH_PROJECT\\beaver1.avi";
	string county = "us";
	int interval = 27;

	char text[1024] = "";
	int frameno = 0;
	VideoCapture cap;
	VideoWriter outputVideo;
	int deviceID = -1;

	int apiID = cv::CAP_ANY;      // 0 = autodetect default API

	ResponseMode GetResponseMode = ResponseMode::ReadingHeader;
	short RespHdrNumBytes;
	char ResponseBuffer[2048];
	unsigned int BytesInResponseBuffer = 0;
	int BytesNeeded = sizeof(RespHdrNumBytes);


	//bool measureProcessingTime = false;
	bool measureProcessingTime = true;
	std::string templatePattern;
	MotionDetector motiondetector;
	bool do_motiondetection = false;

	bool _qpcInited = false;
	double PCFreq = 0.0;
	__int64 CounterStart = 0;
	double _avgdur = 0;
	double _fpsstart = 0;
	double _avgfps = 0;
	double _fps1sec = 0;

	unsigned int CurrentPlate = 0;

	static std::atomic_flag keepRunning1;
	static std::atomic_flag keepRunning2;
	static std::atomic_flag keepRunning3;

#define NUMBEROFPREVIOUSPLATES 10
	char LastPlates[NUMBEROFPREVIOUSPLATES][64] = { "","","","","" };



	
	//static bool getconchar(KEY_EVENT_RECORD& krec);
	//static double avgdur(double newdur);
	//static double avgfps();
	
};


