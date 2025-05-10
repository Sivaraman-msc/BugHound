exports.AuthorizeRole=(...allowedRole)=>{
    return (req,res,next)=>{
        const userRole=req.user.role

        if(!allowedRole.includes(userRole)){
            return res.status(403).json({message:"Access denied"})
        }
        next()
    }
}