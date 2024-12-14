import User from './userschema.js'

export const insertUser = (userobj)=>{
    return User(userobj).save()
}

export const getUserbyEmail = (email)=>{
    return User.findOne({email})
}

