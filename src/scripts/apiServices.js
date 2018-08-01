import PopulateService from './apiServices/PopulateService';
import VideoService from './apiServices/VideoService';
import DerivativeService from './apiServices/DerivativeService';

export default {
    saveVideo: VideoService.save.bind(VideoService),
    saveDerivative: DerivativeService.save.bind(DerivativeService),
    getTemplates: PopulateService.getTemplates.bind(PopulateService) ,
    getVideo: PopulateService.getVideo.bind(PopulateService)
};
