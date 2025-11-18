
export function getCookie(name){
    let cookievalue = null;
    if (document.cookie && document.cookie !==""){
        const cookies = document.cookie.split(';')
        for (let i=0;i < cookies.length;i++){
            const cookie = cookies[i].trim()
            if (cookie.startsWith(`${name}=`)){
                cookievalue = decodeURIComponent(cookie.substring(name.length +1));
                break ;
            }
        }
    }
    return cookievalue ;
}