

const listOfAdmins=[
    'test@gmail.com',
    'admin@cms.com',
    'dcoder.sm@gmail.com',
    'pragatid1122@gmail.com'
]

export default async function isAdmin(session){
   if(!session) return false;
   let userEmail=session.user.email.toLowerCase().trim()
   let emailMatch=listOfAdmins.some(singleEmail=>{
    return singleEmail.toLowerCase().trim()===userEmail
   })
   if(session.user.role=='admin' || (session.user?.email && emailMatch)){
       return true;
   }
   return false;
}