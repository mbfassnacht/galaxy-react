import SaveServerActions from './actions/serverActions/saveActions';
import LoadServerActions from './actions/serverActions/loadActions';

export default {

    endpoint: 'http://app.xoz.one/',

    save: function() {
        var that = this;
        var videos = this.buildVideoData();
        var isPlaceholder = this.$placeholder.is(':checked') ? 1 : 0;

        if (this.$clipsTitle.val() === "") {
            return;
        }

        var clipData = {
            "title": this.$clipsTitle.val() != "" ? this.$clipsTitle.val() : "no title",
            "properties": {
                "filterList": {
                    "languages": this.languagePicker.selectedLanguages
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

    buildVideoData: function () {
        var videos = [];
        var isHardSubtitles = this.$hardSubtitles.is(':checked') ? 1 : 0;
        var fadeTimeInSeconds = 1;

        for(var i=0; i<this.clips.length; i++){
            var clip = this.clips[i];
            var actions = [];

            for(var j=0;j<clip.actions.length;j++){
                var action = clip.actions[j];
                if(action.type !== 'schnitt'){
                    var obj;
                    if(action.type === 'bauchbinde'){

                        if(!action.template){
                            this.showAlertError(Translator.trans('please choose a template'));
                            return;
                        }

                        obj = {
                            "type" : 'lettering',
                            "text" : action.$title.val(),
                            "template" : action.template,
                            "in" : action.st,
                            "out" : action.et,
                            "fadeIn" : action.st,
                            "fadeOut" : action.et
                        }
                    }
                    if(action.type === 'wasserzeichen'){

                        if(!action.template){
                            this.showAlertError(Translator.trans('please choose a template'));
                            return;
                        }

                        obj = {
                            "type" : 'lettering',
                            "text" : action.$title.val(),
                            "template" : action.template,
                            "in" : action.st,
                            "out" : action.et,
                            "fadeIn" : action.st,
                            "fadeOut" : action.et
                        }
                    }
                    if(action.type === 'untertitel'){
                        obj = {
                            "type" : 'subtitle',
                            "text" : action.$title.val(),
                            "in" : action.st,
                            "out" : action.et,
                            "position" : action.position,
                            "hard" : isHardSubtitles,
                            "language" : action.language
                        }
                    }

                    actions.push(obj);
                }
            }

            videos.push({
                "title": clip.$title.val(),
                "id": clip.id,
                "in": clip.st,
                "out": clip.et,
                "actions": actions,
                "activeLanguage": this.languagePicker.activeLanguage
            });
        }

        return videos;
    },

    saveVideo: function(data) {
        var that = this;
        var path = this.endpoint + 'admin/clip-editor/clips';

        $.ajax({
            url  : path ,
            type : 'POST' + exozet_clip_editor_get_video,
            data : data
        }).done(function(d) {
            SaveServerActions.videoSaveEnded(d.id);
        }).fail(function (jqXHR) {
            SaveServerActions.videoSaveError();
        });
    },

    updateVideo: function(id, data) {
        var that = this;
        var path = this.endpoint + 'admin/clip-editor/clips/' + id;

        $.ajax({
            url  : path ,
            type : 'PUT',
            data : data
        }).done(function(d) {
            SaveServerActions.videoSaveEnded();
        }).fail(function (jqXHR) {
            SaveServerActions.videoSaveError();
        });
    },

    getVideo: function(id) {
        var that = this;
        var path = this.endpoint + 'admin/clip-editor/videos/' + id;

        LoadServerActions.loadVideoStarted();
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", path, true);
        xhttp.send();

        // request.get(path, function (error, response, body)  {
        //     debugger;
        //     LoadServerActions.loadVideoEnded(body);
        // });
    }
};
