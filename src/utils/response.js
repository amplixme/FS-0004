export function success(res,data,message){
    return res.status(200).json({data})
}

export function error(res,message,status = 500){
    return res.status(status).json({error:{message,status} })
}
