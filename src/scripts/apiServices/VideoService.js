import VideoPackagerStore from '../stores/videoPackagerStore';
import request from 'browser-request';
import SaveServerActions from '../actions/serverActions/saveActions';
import ActionsStore from '../stores/actionsStore';


function getStateFromActionsStore() {
    return ActionsStore.getAll()
}

function getStateFromVideoPackagerStore() {
    return VideoPackagerStore.getStatus()
}

export default {

    save: function() {
        var videoPackagerData = getStateFromVideoPackagerStore();
        var actionsData = getStateFromActionsStore();

        var videos = this.buildVideoData(actionsData);

        var clipData = {
            'title': (videoPackagerData.title !== '') ? videoPackagerData.title : 'no title',
            'properties': {
                'filterList': {
                    'languages': [
                      {
                        'id': 1,
                        'title': 'Deutsch',
                        'isoCode': 'de'
                      }
                    ]
                },
                'videos': videos,
                'placeholder': true
            }
        };

        SaveServerActions.videoSaveStarted();

        if (videoPackagerData.clipId !== -1) {
            this.updateVideo(videoPackagerData.clipId, clipData);
        } else {
            this.saveVideo(clipData);
        }
    },

    buildVideoData: function (dataActions) {
        var videos = [];
        var actions = [];

        for (var actionIndex in dataActions) {
            var action = dataActions[actionIndex];
            var actionObj;
            if (action.type === 'lettering' || action.type === 'watermark' ) {

                actionObj = {
                    'type' : 'lettering',
                    'text' : action.title,
                    'template' : action.template,
                    'in' : action.markIn,
                    'out' : action.markOut,
                    'fadeIn' : action.markIn,
                    'fadeOut' : action.markOut,
                    'placeholder' : action.placeholder
                }
            } else {
                actionObj = {
                    'type' : 'subtitle',
                    'text' : action.title,
                    'in' : action.markIn,
                    'out' : action.markOut,
                    'position' : action.position,
                    'placeholder' : action.placeholder,
                    'language' : 1
                }
            }
            actions.push(actionObj);

        }

        videos.push({
            'title': 'title',
            'id': 'id',
            'in': 0,
            'out': 0,
            'actions': actions,
            'activeLanguage': 1
        });


        return videos;
    },

    saveVideo: function(data) {
        var path = getStateFromVideoPackagerStore().config.saveVideoUrl;

        SaveServerActions.videoSaveStarted();

        request({method: 'POST', url: path, json: data}, function(er, res) {
            if(!er) {
                if (res.statusCode !== 404 && res.response) {
                    var response = JSON.parse(res.response);
                    SaveServerActions.videoSaveEnded(response);
                    return;
                }
            }

            SaveServerActions.videoSaveError();
        });
    },

    updateVideo: function(id, data) {
        var path = getStateFromVideoPackagerStore().config.saveVideoUrl + id;

        SaveServerActions.videoSaveStarted();

        request.put({uri: path, json: data}, function(er, res) {
            if(!er) {
                if (res.statusCode !== 404 && res.response) {
                    var response = JSON.parse(res.response);
                    SaveServerActions.videoSaveEnded(response);
                    return;
                }
            }

            SaveServerActions.videoSaveError();
        });
    }
}
