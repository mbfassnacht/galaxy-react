import PopulateService from './apiServices/PopulateService';
import VideoService from './apiServices/VideoService';
import DerivativeService from './apiServices/DerivativeService';

export default {
    saveVideo: VideoService.save,
    saveDerivative: DerivativeService.save,
    getTemplates: PopulateService.getTemplates ,
    getVideo: PopulateService.getVideo
};
