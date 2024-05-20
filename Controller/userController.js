

// logic for user registration

const { model } = require("mongoose");
const users = require("../Modal/userSchema");


// import jwt token
const jwtn = require('jsonwebtoken')

exports.register = async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body

    try {
        const existingUser = await users.findOne({ mailId: email })

        if (existingUser) {
            res.status(405).json('User Already Exist')
        } else {
            const newUser = new users({
                username,
                mailId: email,
                password,
                profile: "",
                github: "",
                linkedIn: ""
            })

            //  store the particular data in mongodb mongoose method
            await newUser.save()
            res.status(200).json(newUser)


        }

    }
    catch (err) {
        res.status(401).json('Registration Process is Failed due to ', err)
    }


}


// logic for login user 

exports.login = async (req, res) => {
    console.log('Inside Login Function');
    const { email, password } = req.body

    try {
        const existingUser = await users.findOne({ mailId: email, password })

        if (existingUser) {
            //token generation - sign('data','secret key')
         const token = jwtn.sign({userId:existingUser._id},"super_sercrete_key")  
            
            res.status(200).json({existingUser,token})
        } else {
            res.status(406).json('Incorrect Email-ID or Password')
        }

    }
    catch (error) {
        res.status(401).json('Login Request Failed Due to', error)
    }

}


// lofic for update profile

exports.profileUpdate = async(req,res)=>{
    const userId = req.payload
    const {username,emailid,github,password,linkedin,profile}= req.body
    const uploadImage = req.file?req.file.filename:profile

    try {
        const userProfile = await users.findByIdAndUpdate({_id:userId},{
            username,
            mailId: emailid,
            password,
            profile: uploadImage,
            github ,
            linkedIn: linkedin
        },{new:true})
        await userProfile.save()
        res.status(200).json(userProfile)
        
    } catch (error) {
       res.status(401).json('Update Request Failed due to', error) 
    }
}