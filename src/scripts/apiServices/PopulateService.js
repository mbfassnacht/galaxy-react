import VideoPackagerStore from '../stores/videoPackagerStore';
import LoadServerActions from '../actions/serverActions/loadActions';
import request from 'browser-request';

function getStateFromVideoPackagerStore() {
    return VideoPackagerStore.getStatus()
}

export default {

    getTemplates: function() {
        var path = getStateFromVideoPackagerStore().config.getTemplatesUrl;

        var mockResponse = [
            {'id':2,'type':'lettering','title':'AMTV Corner Logo'},
            {'id':4,'type':'lettering','title':'AMTV Lettering'},
            {'id':1,'type':'lettering','title':'AMTV Nowzeile'},
            {'id':3,'type':'lettering','title':'AMTV Subtitle'},
            {'id':6,'type':'lettering','title':'Digital Retail Bauchbinde'},
            {'id':5,'type':'lettering','title':'Digital Retail Nowzeile'},
            {'id':2,'type':'lettering','title':'AMTV Corner Logo'},
            {'id':7,'type':'watermark','title':'Watermark 1'},
            {'id':8,'type':'watermark','title':'Watermark 2'},
            {'id':9,'type':'watermark','title':'Watermark 3'}
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

    getVideo: function() {
        var path = getStateFromVideoPackagerStore().config.getVideoUrl;

        var mockResponse = {
            'id' : 61,
            'videoLanguage' : {
                'id' : 1,
                'title' : 'Deutsch',
                'isoCode' : 'de'
            },
            'hardSubtitleLanguage' : null,
            'title' : 'Content-Lieferant | Freigegeben',
            'sourceImageThumbUrl' : 'https://app.xoz.one/storage/default/0001/01/thumb_143_default_thumbnail.jpeg',
            'sourceVideoUrl' : 'https://app.xoz.one/storage/default/0001/01/a6204fe54eed50038ed43c7836b0d8f2e8ff7f4e.mp4',
            'previewVideoUrl' : 'https://app.xoz.one/storage/default/0001/01/2ba17f8fff510dac1d883820556ae61ad5af55ba.mp4',
            'videoDuration' : '0:45',
            'videoFrames' : 25
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
}
