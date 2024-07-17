export const API_ENDPOINTS = {
  baseUrl : 'https://192.168.1.17:1111/api/',
  
    GET_ALL_COMPLEMENT : 'Complement/GetAll',
    CREATE_COMPLEMENT : 'Complement/create',
    GET_COMPMLEMENT_BY_ID : 'Complement/GetById',
    DELETE_COMPLEMENT : 'Complement/Delete',
    UPDATE_COMPLEMENT : 'Complement/Update',
    GET_COMPLEMENT_BY_EXAM_RESERVATION_ID : 'Complement/GetcomplementByExamreservation',
    GET_COMPLEMENT_BY_PROCOTR_ID : 'Complement/GetComplementsByProctorId',
    


    //todo:contact us
    GET_ALL_CONTACT : 'ContactUs/GetAllContactUs',
    CREATE_CONTACT : 'ContactUs/CreateContactUs',
    GET_CONTACT_BY_ID : 'ContactUs/GetContactUsById',
    DELETE_CONTACT : 'ContactUs/DeleteContactUs',
    // todo: plans
    GET_ALL_PLANS_WITH_FEATURES : 'Plan/GetAllPlansWithFeatures',
    GET_PLAN_WITH_FEATURES : 'Plan/GetPlanWithFeatures',
    
    
    // todo: 
    CREATE_ACCOUNT : 'Auth/CreateUser',
    GET_USER_BY_CREDENTIAL : 'Auth/GetUserByCredential',
    UPDATE_NAME : 'Auth/UpdateName',
    UPDATE_Email : 'Auth/UpdateEmail',
    UPDATE_PHONE : 'Auth/UpdatePhone',
    
    EXCHANGE_SDP : 'WebRTC/ExchangeSDP',
    EXCHANGE_ICE : 'WebRTC/ExchangeICE',



  };
  