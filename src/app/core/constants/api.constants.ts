export const API_ENDPOINTS = {
  baseUrl : 'https://localhost:5001/api/',

    COMPLEMENT_TABLE:'Complement/',
    GET_ALL_COMPLEMENT : 'Complement/GetAllComplements',
    CREATE_COMPLEMENT : 'Complement/createComplement',
    GET_COMPLEMENT_BY_ID : 'Complement/GetComplementById',
    DELETE_COMPLEMENT : 'Complement/DeleteComplement',
    UPDATE_COMPLEMENT : 'Complement/UpdateComplement',
    GET_COMPLEMENT_BY_EXAM_RESERVATION_ID : 'Complement/GetComplementByExamReservationId',
    GET_COMPLEMENT_BY_PROCOTR_ID : 'Complement/GetComplementsByProctorId',








    //todo:contact us
    GET_ALL_CONTACT : 'ContactUs/GetAllContactUs',
    CREATE_CONTACT : 'ContactUs/CreateContactUs',
    GET_CONTACT_BY_ID : 'ContactUs/GetContactUsById',
    DELETE_CONTACT : 'ContactUs/DeleteContactUs',
    // todo: plans
    GET_ALL_PLANS_WITH_FEATURES : 'Plan/GetAllPlansWithFeatures',
    GET_PLAN_WITH_FEATURES : 'Plan/GetPlanWithFeatures',
    // todo: about us

    GET_ALL_ABOUT_US : 'About/GetAllAbout',
    GET_ABOUT_US_BY_ID : 'About/GetAboutById',
    DELETE_ABOUT_US_BY_ID : 'About/DeleteAbout',
    UPDATE_ABOUT_US_BY_ID : 'About/UpdateAbout',
    CREATE_ABOUT_US_BY_ID : 'About/CreateAbout',

    // todo:Testimonal
    GET_ALL_TESTIMONAL : "Testimonal/GetAllTestimonial",
    GET_ALL_PENDING_TESTIMONAL : "Testimonal/GetAllPendingTestimonals",
    GET_ALL_REJECTED_TESTIMONAL : "Testimonal/GetAllRejectedTestimonial",
    GET_ALL_APPROVED_TESTIMONAL : "Testimonal/GetAllApprovedTestimonial",
    GET_TESTIMONAL_BY_ID : "Testimonal/GetTestimonialById",
    DELETE_TESTIMONAL : "Testimonal/DeleteTestimonial",
    CREATE_TESTIMONAL : "Testimonal/CreateTestimonial",
    // todo: identity
    CREATE_ACCOUNT : 'Auth/CreateUser',
    GET_USER_BY_CREDENTIAL : 'Auth/GetUserByCredential',
    UPDATE_NAME : 'Auth/UpdateName',
    UPDATE_Email : 'Auth/UpdateEmail',
    UPDATE_PHONE : 'Auth/UpdatePhone',
    UPDATE_PASSWORD : 'Auth/UpdateUserPassword',

    EXCHANGE_SDP : 'WebRTC/ExchangeSDP',
    EXCHANGE_ICE : 'WebRTC/ExchangeICE',

    EXAM_PROVIDER_TABLE:'ExamProvider/',
    GET_ALL_EXAM_PROVIDER: "ExamProvider/GetAllExamProviders",
    CREATE_EXAM_PROVIDER: "ExamProvider/CreateExamProvider",

    EXAM_TABLE:'ExamInfo',
  GET_ALL_EXAMS : 'ExamInfo/GetAllExams',
  CREATE_EXAM : 'ExamInfo/CreateExam',
  GET_EXAM_BY_ID : 'ExamInfo/GetExamById',
  DELETE_EXAM : 'ExamInfo/DeleteExam',
  UPDATE_EXAM : 'ExamInfo/UpdateExam',
  GET_ALL_EXAMS_BY_EXAM_PROVIDER: "ExamInfo/GetExamsByProvider",
  PLAN_TABLE:'Plan',
  GET_ALL_PLANS : 'Plan/GetAllPlans',
  CREATE_PLAN : 'Plan/CreatePlan',
  GET_PLAN_BY_ID : 'Plan/GetPlanById',
  DELETE_PLAN : 'Plan/DeletePlan',
  UPDATE_PLAN : 'Plan/UpdatePlan',
  GET_PLAN_BY_EXAM_PROVIDER: "Plan/GetPlanByExamProviderId",
  PLAN_FEATURE_TABLE:'PlanFeature',
  GET_ALL_PLAN_FEATURES : 'PlanFeature/GetAllPlanFeatures',
  CREATE_PLAN_FEATURE : 'PlanFeature/CreatePlanFeature',
  GET_PLAN_FEATURE_BY_ID : 'PlanFeature/GetPlanFeatureById',
  DELETE_PLAN_FEATURE : 'PlanFeature/DeletePlanFeature',
  UPDATE_PLAN_FEATURE : 'PlanFeature/UpdatePlanFeature',
  GET_PLAN_FEATURES_BY_PLAN_ID: "PlanFeature/GetPlanFeaturesByPlanId",


  TESTIMONIAL_TABLE:'Testimonial',
  GET_ALL_TESTIMONIALS : 'Testimonial/GetAllTestimonials',
  CREATE_TESTIMONIAL : 'Testimonial/CreateTestimonial',
  GET_TESTIMONIAL_BY_ID : 'Testimonial/GetTestimonialById',
  DELETE_TESTIMONIAL : 'Testimonial/DeleteTestimonial',
  UPDATE_TESTIMONIAL_STATE : 'Testimonial/UpdateTestimonialState',
  GET_TESTIMONIALS_BY_EXAM_PROVIDER: "Testimonial/GetTestimonialsByExamProviderId",
  GET_TESTIMONIALS_BY_STATE_ID: "Testimonial/GetTestimonialsByStateId",

  EXAM_RESERVATION_TABLE:'ExamReservation',
  GET_ALL_EXAM_RESERVATIONS : 'ExamReservation/GetAllExamReservations',
  CREATE_EXAM_RESERVATION : 'ExamReservation/CreateExamReservation',
  GET_EXAM_RESERVATION_BY_ID : 'ExamReservation/GetExamReservationById',
  DELETE_EXAM_RESERVATION : 'ExamReservation/DeleteExamReservation',
  UPDATE_EXAM_RESERVATION : 'ExamReservation/UpdateExamReservation',
  GET_EXAM_RESERVATIONS_BY_EXAM_ID: "ExamReservation/GetAllExamReservationsByExamId",


  GET_PROCTOR_BY_EXAM_RESERVATION_ID : 'Proctor/GetProctorByExamReservationId',


};
