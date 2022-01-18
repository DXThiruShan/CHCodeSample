export const USER_DATA = {
    EmpID: '',
    UserId: '',
    EmployeeName: '',
    BusinessUnit:'',
    DepartmentName:'',
    DesignationName:'',
    PracticeName:'',
    RoleId:'',
    RoleName:'',
    DashboardVisibility:'',
    Location:'',
    Gender: '',
    Questions: {},
    previousAnswer: [],
}

export const setUserData = (data) => {
    
    USER_DATA.EmpID = data.EmpID,
    USER_DATA.UserId = data.UserId,
    USER_DATA.EmployeeName = data.EmployeeName,
    USER_DATA.BusinessUnit = data.BusinessUnit,
    USER_DATA.DepartmentName = data.DepartmentName,
    USER_DATA.DesignationName = data.DesignationName,
    USER_DATA.PracticeName = data.PracticeName,
    USER_DATA.RoleId = data.RoleId,
    USER_DATA.RoleName = data.RoleName,
    USER_DATA.DashboardVisibility = data.DashboardVisibility,
    USER_DATA.Location = data.Location,
    USER_DATA.Gender = data.Gender
    
}

export const setQuestionData = (data) => {
    USER_DATA.Questions ={...data}

}

export const setpreviousAnswerData = (data) => {
    USER_DATA.previousAnswer =[...data]

}


export const resetUserData = ()=>{

    USER_DATA.EmpID = '',
    USER_DATA.UserId = '',
    USER_DATA.EmployeeName = '',
    USER_DATA.BusinessUnit ='',
    USER_DATA.DepartmentName ='',
    USER_DATA.DesignationName ='',
    USER_DATA.PracticeName ='',
    USER_DATA.RoleId ='',
    USER_DATA.RoleName ='',
    USER_DATA.DashboardVisibility ='',
    USER_DATA.Location ='',
    USER_DATA.Gender = ''
}