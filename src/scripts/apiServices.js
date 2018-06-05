import SaveServerActions from './actions/serverActions/saveActions';
import LoadServerActions from './actions/serverActions/loadActions';
import ActionsStore from './stores/actionsStore';
import VideoPackagerStore from './stores/videoPackagerStore';
import request from 'browser-request';

function getStateFromActionsStore() {
    return ActionsStore.getAll()
}

function getStateFromVideoPackagerStore() {
    return VideoPackagerStore.getStatus()
}

export default {

    save: function(data) {
        var that = this;
        var videoPackagerData = getStateFromVideoPackagerStore();
        var actionsData = getStateFromActionsStore();

        var videos = this.buildVideoData(actionsData);

        var clipData = {
            "title": (videoPackagerData.title !== "") ? videoPackagerData.title : "no title",
            "properties": {
                "filterList": {
                    "languages": [
                      {
                        "id": 1,
                        "title": "Deutsch",
                        "isoCode": "de"
                      }
                    ]
                },
                "videos": videos,
                "placeholder": true
            }
        };

        SaveServerActions.videoSaveStarted();

        if (that.clipId) {
            this.updateVideo(that.clipId, clipData);
        } else {
            this.saveVideo(clipData);
        }
    },

    buildVideoData: function (dataActions) {
        var videos = [];
        var fadeTimeInSeconds = 1;
        var actions = [];

        for (var actionIndex in dataActions) {
            var action = dataActions[actionIndex];
            var actionObj;
            if (action.type === 'lettering' || action.type === 'watermark' ) {

                if (!action.template) {
                    this.showAlertError(Translator.trans('please choose a template'));
                    return;
                }

                actionObj = {
                    "type" : 'lettering',
                    "text" : action.title,
                    "template" : action.template,
                    "in" : action.markIn,
                    "out" : action.markOut,
                    "fadeIn" : action.markIn,
                    "fadeOut" : action.markOut,
                    "placeholder" : action.placeholder
                }
            } else {
                action.position = "top";

                actionObj = {
                    "type" : 'subtitle',
                    "text" : action.title,
                    "in" : action.markIn,
                    "out" : action.markOut,
                    "position" : action.position,
                    "placeholder" : action.placeholder,
                    "language" : 1
                }
            }
            actions.push(actionObj);

        }

        videos.push({
            "title": 'title',
            "id": 'id',
            "in": 0,
            "out": 0,
            "actions": actions,
            "activeLanguage": 1
        });


        return videos;
    },

    saveVideo: function(data) {
        var that = this;
        var path = getStateFromVideoPackagerStore().config.saveVideoUrl;

        SaveServerActions.videoSaveStarted();

        request({method: 'POST', url: path, json: data}, function(er, res) {
            if(!er) {
                if (res.statusCode !== 404 && res.response) {
                    var response = JSON.parse(res.response);
                    SaveServerActions.videoSaveEnded(response);
                    return;
                } else {

                }

            }

            SaveServerActions.videoSaveError();
        });
    },

    updateVideo: function(id, data) {
        var that = this;
        var path = getStateFromVideoPackagerStore().config.saveVideoUrl + id;

        SaveServerActions.videoSaveStarted();

        request.put({uri: path, json: data}, function(er, res) {
            if(!er) {
                if (res.statusCode !== 404 && res.response) {
                    var response = JSON.parse(res.response);
                    SaveServerActions.videoSaveEnded(response);
                    return;
                } else {

                }
            }

            SaveServerActions.videoSaveError();
        });
    },

    getTemplates: function(actionType) {
        var that = this;
        var path = getStateFromVideoPackagerStore().config.getTemplatesUrl;

        var mockResponse = [
            {"id":2,"type":"lettering","title":"AMTV Corner Logo"},
            {"id":4,"type":"lettering","title":"AMTV Lettering"},
            {"id":1,"type":"lettering","title":"AMTV Nowzeile"},
            {"id":3,"type":"lettering","title":"AMTV Subtitle"},
            {"id":6,"type":"lettering","title":"Digital Retail Bauchbinde"},
            {"id":5,"type":"lettering","title":"Digital Retail Nowzeile"},
            {"id":2,"type":"lettering","title":"AMTV Corner Logo"},
            {"id":7,"type":"watermark","title":"Watermark 1"},
            {"id":8,"type":"watermark","title":"Watermark 2"},
            {"id":9,"type":"watermark","title":"Watermark 3"}
        ];


        LoadServerActions.loadTemplatesStarted();

        request(path, function(er, res) {
            if(!er) {
                if (res.statusCode !== 404 && res.response) {
                    var response = JSON.parse(res.response);
                    LoadServerActions.loadTemplatesEnded(response);
                    return;
                } else {
                    LoadServerActions.loadTemplatesEnded(mockResponse);
                    return;
                }
            } else {
                LoadServerActions.loadTemplatesError();
            }

        });
    },

    getVideo: function(id) {
        var that = this;
        var path = getStateFromVideoPackagerStore().config.getVideoUrl;

        var mockResponse = {
            "id" : 61,
            "videoLanguage" : {
                "id" : 1,
                "title" : "Deutsch",
                "isoCode" : "de"
            },
            "hardSubtitleLanguage" : null,
            "title" : "Content-Lieferant | Freigegeben",
            "sourceImageThumbUrl" : "https://app.xoz.one/storage/default/0001/01/thumb_143_default_thumbnail.jpeg",
            "sourceVideoUrl" : "https://app.xoz.one/storage/default/0001/01/a6204fe54eed50038ed43c7836b0d8f2e8ff7f4e.mp4",
            "previewVideoUrl" : "https://app.xoz.one/storage/default/0001/01/2ba17f8fff510dac1d883820556ae61ad5af55ba.mp4",
            "videoDuration" : "0:45",
            "videoFrames" : 25
        };

        LoadServerActions.loadVideoStarted();

        request(path, function(er, res) {
            if(!er) {
                if (res.statusCode !== 404 && res.response) {
                    var response = JSON.parse(res.response);
                    LoadServerActions.loadVideoEnded(response);
                    return;
                } else {
                    LoadServerActions.loadVideoEnded(mockResponse);
                    return;
                }
            } else {
                LoadServerActions.loadVideoError();
            }
        });
    }
};
