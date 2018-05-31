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
                "placeholder": isPlaceholder
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
                action.template = " ";

                if (!action.template) {
                    this.showAlertError(Translator.trans('please choose a template'));
                    return;
                }

                actionObj = {
                    "type" : 'lettering',
                    "text" : action.title,
                    "template" : action.template, //action template
                    "in" : action.markIn,
                    "out" : action.markOut,
                    "fadeIn" : action.markIn,
                    "fadeOut" : action.markOut
                }
            } else {
                action.position = "top";

                actionObj = {
                    "type" : 'subtitle',
                    "text" : action.title,
                    "in" : action.markIn,
                    "out" : action.markOut,
                    "position" : action.position,
                    "hard" : true,
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
        var path = 'admin/clip-editor/clips';

        SaveServerActions.videoSaveStarted();

        request({method: 'POST', url: path, body: data}, function(er, res) {
            if(!er) {
                if (res.response) {
                    var response = JSON.parse(res.response);
                    SaveServerActions.videoSaveEnded(response);
                    return;
                }
            }

            SaveServerActions.videoSaveError();
        });
    },

    updateVideo: function(id, data) {
        var that = this;
        var path = 'admin/clip-editor/clips/' + id;

        SaveServerActions.videoSaveStarted();

        request.put({uri: path, body: data}, function(er, res) {
            if(!er) {
                if (res.response) {
                    var response = JSON.parse(res.response);
                    SaveServerActions.videoSaveEnded(response);
                    return;
                }
            }

            SaveServerActions.videoSaveError();
        });
    },

    getVideo: function(id) {
        var that = this;
        var path = 'admin/clip-editor/videos/' + id;

        // var response = {
        //     "id" : 61,
        //     "videoLanguage" : {
        //         "id" : 1,
        //         "title" : "Deutsch",
        //         "isoCode" : "de"
        //     },
        //     "hardSubtitleLanguage" : null,
        //     "title" : "Content-Lieferant | Freigegeben",
        //     "sourceImageThumbUrl" : "https://app.xoz.one/storage/default/0001/01/thumb_143_default_thumbnail.jpeg",
        //     "sourceVideoUrl" : "https://app.xoz.one/storage/default/0001/01/a6204fe54eed50038ed43c7836b0d8f2e8ff7f4e.mp4",
        //     "previewVideoUrl" : "https://app.xoz.one/storage/default/0001/01/2ba17f8fff510dac1d883820556ae61ad5af55ba.mp4",
        //     "videoDuration" : "0:45",
        //     "videoFrames" : 25
        // };
        //
        // setTimeout(function(){
        //     LoadServerActions.loadVideoEnded(response);
        // }, 3000);


        
        LoadServerActions.loadVideoStarted();

        request(path, function(er, res) {
            if(!er) {
                if (res.response) {
                    var response = JSON.parse(res.response);
                    LoadServerActions.loadVideoEnded(response);
                    return;
                }
            }

            LoadServerActions.loadVideoError();
        });
    }
};
