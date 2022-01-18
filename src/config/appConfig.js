const env = 'prod';

const CONFIG = {
    dev:{
        BASE_URL:"",
        
    },
    qa:{
        BASE_URL:"",
        
    },
    uat:{
        BASE_URL:"",
          
    },
    prod:{
        BASE_URL:"",
        
    }
}


export const APP_CONFIG =  CONFIG[env]?CONFIG[env]:CONFIG['dev'];

