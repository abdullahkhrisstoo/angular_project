export const API_ENDPOINTS = {
    USERS: '/api/users',
    PRODUCTS: '/api/products',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',

    baseUrl : 'http://192.168.1.17:2222/api/',
    GET_ALL_COMPLEMENT : 'Complement/GetAll',
    CREATE_COMPLEMENT : 'Complement/create',
    GET_COMPMLEMENT_BY_ID : 'Complement/GetById',
    DELETE_COMPLEMENT : 'Complement/Delete',
    UPDATE_COMPLEMENT : 'Complement/Update',
    GET_COMPLEMENT_BY_EXAM_RESERVATION_ID : 'Complement/GetcomplementByExamreservation',
    GET_COMPLEMENT_BY_PROCOTR_ID : 'Complement/GetComplementsByProctorId',
  
  
    // todo: 
    CREATE_ACCOUNT : 'Auth/CreateUser',
    GET_USER_BY_CREDENTIAL : 'Auth/GetUserByCredential',
    UPDATE_NAME : 'Auth/UpdateName',
    UPDATE_Email : 'Auth/UpdateEmail',
    UPDATE_PHONE : 'Auth/UpdatePhone',
  
    EXCHANGE_SDP : 'WebRTC/ExchangeSDP',
    EXCHANGE_ICE : 'WebRTC/ExchangeICE',
  };
  