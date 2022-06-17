// This file is part of OpenCV project.
// It is subject to the license terms in the LICENSE file found in the top-level directory
// of this distribution and at http://opencv.org/license.html.
//
// Copyright (C) 2021 Intel Corporation

#ifndef OPENCV_GAPI_STREAMING_GSTREAMER_GSTREAMERPIPELINE_HPP
#define OPENCV_GAPI_STREAMING_GSTREAMER_GSTREAMERPIPELINE_HPP

#include <opencv2/gapi/streaming/gstreamer/gstreamersource.hpp>
#include <opencv2/gapi/own/exports.hpp>

#include <string>
#include <unordered_map>
#include <memory>

namespace cv {
namespace gapi {
namespace wip {
namespace gst {

class GAPI_EXPORTS GStreamerPipeline
{
public:
    class Priv;

    explicit GStreamerPipeline(const std::string& pipeline);
    IStreamSource::Ptr getStreamingSource(const std::string& appsinkName,
                                          const GStreamerSource::OutputType outputType =
                                              GStreamerSource::OutputType::MAT);
    virtual ~GStreamerPipeline();

protected:
    explicit GStreamerPipeline(std::unique_ptr<Priv> priv);

    std::unique_ptr<Priv> m_priv;
};

} // namespace gst

using GStreamerPipeline = gst::GStreamerPipeline;

} // namespace wip
} // namespace gapi
} // namespace cv

#endif // OPENCV_GAPI_STREAMING_GSTREAMER_GSTREAMERPIPELINE_HPP
