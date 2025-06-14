export default function dateFormat(date){
    if(date instanceof Date){
        return new Date(date).toLocaleDateString("en-IN", {
               day: "numeric",
               month: "short",
               year: "numeric",
             })
    }else{
       return ""
    }
}