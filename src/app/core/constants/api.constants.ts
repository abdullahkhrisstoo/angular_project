export const API_ENDPOINTS = {
  baseUrl: 'https://192.168.1.17:1111/api/',

  GET_ALL_COMPLEMENT: 'Complement/GetAll',
  CREATE_COMPLEMENT: 'Complement/create',
  GET_COMPMLEMENT_BY_ID: 'Complement/GetById',
  DELETE_COMPLEMENT: 'Complement/Delete',
  UPDATE_COMPLEMENT: 'Complement/Update',
  GET_COMPLEMENT_BY_EXAM_RESERVATION_ID:
    'Complement/GetcomplementByExamreservation',
  GET_COMPLEMENT_BY_PROCOTR_ID: 'Complement/GetComplementsByProctorId',

  //todo:contact us
  GET_ALL_CONTACT: 'ContactUs/GetAllContactUs',
  CREATE_CONTACT: 'ContactUs/CreateContactUs',
  GET_CONTACT_BY_ID: 'ContactUs/GetContactUsById',
  DELETE_CONTACT: 'ContactUs/DeleteContactUs',
  // todo: plans
  GET_ALL_PLANS_WITH_FEATURES: 'Plan/GetAllPlansWithFeatures',
  GET_PLAN_WITH_FEATURES: 'Plan/GetPlanWithFeatures',
  // todo: about us

  GET_ALL_ABOUT_US: 'About/GetAllAbout',
  GET_ABOUT_US_BY_ID: 'About/GetAboutById',
  DELETE_ABOUT_US_BY_ID: 'About/DeleteAbout',
  UPDATE_ABOUT_US_BY_ID: 'About/UpdateAbout',
  CREATE_ABOUT: 'About/CreateAbout',

  // todo:Testimonal
  GET_ALL_TESTIMONAL: 'Testimonal/GetAllTestimonial',
  GET_ALL_PENDING_TESTIMONAL: 'Testimonal/GetAllPendingTestimonals',
  GET_ALL_REJECTED_TESTIMONAL: 'Testimonal/GetAllRejectedTestimonial',
  GET_ALL_APPROVED_TESTIMONAL: 'Testimonal/GetAllApprovedTestimonial',
  GET_TESTIMONAL_BY_ID: 'Testimonal/GetTestimonialById',
  DELETE_TESTIMONAL: 'Testimonal/DeleteTestimonial',
  CREATE_TESTIMONAL: 'Testimonal/CreateTestimonial',
  // todo: identity
  CREATE_ACCOUNT: 'Auth/CreateUser',
  GET_USER_BY_CREDENTIAL: 'Auth/GetUserByCredential',
  UPDATE_NAME: 'Auth/UpdateName',
  UPDATE_Email: 'Auth/UpdateEmail',
  UPDATE_PHONE: 'Auth/UpdatePhone',
  UPDATE_PASSWORD: 'Auth/UpdateUserPassword',
  DELETE_USER: 'Auth/DeleteUser',



  EXCHANGE_SDP: 'WebRTC/ExchangeSDP',
  EXCHANGE_ICE: 'WebRTC/ExchangeICE',

  // todo: proctor
  GET_ALL_PROCTOR: 'Proctor/GetAllProctor',
  GET_PROCTOR_by_id: 'Proctor/GetProctorById',
  UPDATE_PROCTOR: 'Proctor/UpdateProctor',
};
