import {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
    importRequest,
    uploadFileRequest,
    postRequestJson,
    postBodyRequest,
    downloadPost
} from '@/libs/axios';

export const addTGroupPerson = params => {
    return postBodyRequest('/tGroupPerson/addTGroupPerson', params);
};
export const deleteTGroupPerson = params => {
    return postRequest('/tGroupPerson/deleteTGroupPerson', params);
};
export const updateTGroupPerson = params => {
    return postBodyRequest('/tGroupPerson/updateTGroupPerson', params);
};
export const updateTGroupPersonAndGroup = params => {
    return postBodyRequest('/tGroupPerson/updateTGroupPersonAndGroup', params);
};
export const updateTGroupPersonByInquiry = params => {
    return postBodyRequest('/tGroupPerson/updateTGroupPersonByInquiry', params);
};
export const updateTGroupPersonAvatar = params => {
    return postBodyRequest('/tGroupPerson/updateTGroupPersonAvatar', params);
};
export const queryTGroupPersonList = params => {
    return getRequest('/tGroupPerson/queryTGroupPersonList', params);
};
export const getTGroupPersonReviewerList = params => {
    return getRequest('/tGroupPerson/getTGroupPersonReviewerList', params);
};
export const getTGroupPerson = params => {
    return getRequest('/tGroupPerson/getTGroupPerson', params);
};
export const getTypeCodeByTProType = params => {
    return getRequest('/tGroupPerson/getTypeCodeByTProType', params);
};

export const getPersonByOfficeId = params => {
    return getRequest('/tGroupPerson/getPersonByOfficeId', params);
};
export const getPersonReviewerByOfficeId = params => {
    return getRequest('/tGroupPerson/getPersonReviewerByOfficeId', params);
};
export const getTGroupPersonInfo = params => {
    return getRequest('/tGroupPerson/getTGroupPersonInfo', params);
};
export const getTGroupPersonWZInfo = params => {
    return getRequest('/tGroupPerson/getTGroupPersonWZInfo', params);
};

export const getGroupPersonByIdWithLink = params => {
    return getRequest('/tGroupPerson/getGroupPersonByIdWithLink', params);
};
export const getTGroupPersonWithLink = params => {
    return getRequest('/tGroupPerson/getTGroupPersonWithLink', params);
};

//??????????????????+????????????
export const updateTGroupPersonAll = params => {
    return postBodyRequest('/tGroupPerson/updateTGroupPersonAll', params);
};

//????????????id?????????????????????
export const getTGroupPersonByOrderId = params => {
    return getRequest('/tGroupPerson/getTGroupPersonByOrderId', params);
};

//?????????????????????????????????????????????????????????????????????????????????
export const getTGroupPersonAndUnit = params => {
    return getRequest('/tGroupPerson/getTGroupPersonAndUnit', params);
};
export const getTGroupPersonInspection = params => {
    return getRequest('/tGroupPerson/getTGroupPersonInspection', params);
};
export const getInspectionTGroupPersonList = params => {
    return getRequest('/tGroupPerson/getInspectionTGroupPersonList', params);
};
export const getInspectionTGroupPersonReviewList = params => {
    return getRequest('/tGroupPerson/getInspectionTGroupPersonReviewList', params);
};

//???????????????????????????????????????
export const generatorBarcode = params => {
    return getRequest('/tGroupPerson/generatorBarcode', params);
};
//???????????????????????????
export const queryNoCheckProjectPersonList = params => {
    return postRequest('/tGroupPerson/queryNoCheckProjectPersonList', params);
};
export const getPersonListNum = params => {
    return postRequest('/tGroupPerson/getPersonListNum', params);
};
export const queryStatisticPersonList = params => {
    return postRequest('/tGroupPerson/queryStatisticPersonList', params);
};
export const queryExamineFinishPersonList = params => {
    return postRequest('/tGroupPerson/queryExamineFinishPersonList', params);
};


//?????????????????????????????????
export const queryTPastMedicalHistoryList = params => {
    return getRequest('/tPastMedicalHistory/queryTPastMedicalHistoryList', params);
};
//????????????????????????????????? ??????
export const queryTPastMedicalHistoryAll = params => {
    return getRequest('/tPastMedicalHistory/queryTPastMedicalHistoryAll', params);
};
//??????????????????????????????
export const queryTCareerHistoryList = params => {
    return getRequest('/tCareerHistory/queryTCareerHistoryList', params);
};
//?????????????????????????????? ??????
export const queryTCareerHistoryAll = params => {
    return getRequest('/tCareerHistory/queryTCareerHistoryAll', params);
};
//?????????????????????
export const queryTSymptomList = params => {
    return getRequest('/tSymptom/queryTSymptomList', params);
};
//????????????????????? ??????
export const queryTSymptomAll = params => {
    return getRequest('/tSymptom/queryTSymptomAll', params);
};
export const updateTGroupPersonByIsPass = params => {
    return postBodyRequest('/tGroupPerson/updateTGroupPersonByIsPass', params);
};
export const updateTGroupPersonReviewerByIsPass = params => {
    return postBodyRequest('/tGroupPerson/updateTGroupPersonReviewerByIsPass', params);
};
export const updateTGroupPersonById = params => {
    return postBodyRequest('/tGroupPerson/updateTGroupPersonById', params);
};
export const updateTGroupPersonByIdRetreat = params => {
    return postBodyRequest('/tGroupPerson/updateTGroupPersonByIdRetreat', params);
};
export const updateTPrintStateById = params => {
    return postBodyRequest('/tGroupPerson/updateTPrintStateById', params);
};
export const testNumGeneratorBarcode = params => {
    return getRequest('/tGroupPerson/testNumGeneratorBarcode', params);
};
export const getTGroupPersonById = params => {
    return getRequest('/tGroupPerson/getTGroupPersonById', params);
};
export const getTGroupPersonInfoById = params => {
    return getRequest('/tGroupPerson/getTGroupPersonInfoById', params);
};
export const getTestNumGeneratorBarcode = params => {
    return getRequest('/tGroupPerson/getTestNumGeneratorBarcode', params);
};
export const getTGroupPersonReviewerById = params => {
    return getRequest('/tGroupPerson/getTGroupPersonReviewerById', params);
};
//????????????id????????????????????????
export const getPersonNumByGroupId = params => {
    return getRequest('/tGroupPerson/getPersonNumByGroupId', params);
};
export const isContinuImport = params => {
    return getRequest('/tGroupPerson/isContinuImport', params);
};
export const queryProjectDataByGroupIdAndPersonId = params => {
    return getRequest('/tGroupPerson/queryProjectDataByGroupIdAndPersonId', params);
};
export const updateTGroupPersonReviewerById = params => {
    return postBodyRequest('/tGroupPerson/updateTGroupPersonReviewerById', params);
};
export const updatePracticePersonByInquiry = params => {
    return postBodyRequest('/tGroupPerson/updatePracticePersonByInquiry', params);
};
//?????????????????????????????????
export const saveOrUpdatePersonInfo = params => {
    return postBodyRequest('/tGroupPerson/saveOrUpdatePersonInfo', params);
};

//????????????
export const exportPersonData = (params) => {
    return downloadPost('/tGroupPerson/exportPersonDataByUnitId', params);
};

//??????sql
export const exportOrderData = (params) => {
    return downloadPost('/dataBase/downloadSql', params);
};
//???????????????????????????????????????
export const getAllGeneratorBarcode = params => {
    return getRequest('/tGroupPerson/getAllGeneratorBarcode', params);
};

export const importExcelBatch = params => {
    return postBodyRequest('/tGroupPerson/importExcelBatch', params);
};
