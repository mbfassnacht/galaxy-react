import VideoPackagerStore from '../stores/videoPackagerStore';
import OriginalVideoStore from '../stores/originalVideoStore';
import request from 'browser-request';
import SaveServerActions from '../actions/serverActions/saveActions';

function getStateFromOriginalVideoStore() {
    return OriginalVideoStore.getStatus()
}

function getStateFromVideoPackagerStore() {
    return VideoPackagerStore.getStatus()
}


export default {

    save: function() {
        var videoPackagerData = getStateFromVideoPackagerStore();
        var originalVideoData = getStateFromOriginalVideoStore();

        var derivativeData = {
            'title': (videoPackagerData.title !== '') ? videoPackagerData.title : 'no title',
            'id': originalVideoData.originalVideo.id
        };

        SaveServerActions.videoSaveStarted();

        this.saveDerivative(derivativeData);
    },

    saveDerivative: function(data) {
        var path = getStateFromVideoPackagerStore().config.saveDerivativeUrl;

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
    }
}
