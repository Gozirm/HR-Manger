const restrict = (admin, superAdmin)=>{
    return(req,res,next)=>{
        if(req.user.role !== admin && req.user.role !== superAdmin  ){

            res.status(403).json({success:false,message:"You do not have permission to perform this action"})
            return
        }
        next()
    }
}
export default restrict