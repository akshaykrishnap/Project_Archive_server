const projects = require('../Modal/projectSchema')

exports.addProject = async (req, res) => {
    console.log('Inside add Project Contoller');
    /* res.status(201).json('Uploaded Successfully') */
    const userId = req.payload
    console.log(userId);

    const projectImage = req.file.filename
    console.log(projectImage);

    const { title, language, github, website, overview } = req.body
    console.log(title, language, github, website, overview);

    try {
        const existingProjects = await projects.findOne({ github })
        if (existingProjects) {
            res.status(406).json("Project Already Exists")
        } else {
            const newProject = new projects({
                title,
                language,
                github,
                website,
                overview,
                projectImage,
                userId: userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }

    } catch (error) {
        res.status(406).json('Request Failed due to', error)
    }

}

// controller to get 1st 3 project for the frnt page
exports.getHomeProjects = async (req, res) => {
    try {
        const homeProject = await projects.find().limit(3)
        res.status(201).json(homeProject)

    } catch (error) {
        res.status(401).json(`Failed due to ${error}`)

    }
}



// controller to get all projects for the project page

exports.getAllProjects = async (req, res) => {
    const searchKey = req.query.search
    console.log(searchKey);
    const query = {
        language: {
            // 1st -based on which search have to be executed
            // 2nd - to remove case sensitivity we use i; regex is expression found for mongodb
            $regex: searchKey, $options: 'i'
        }
    }



    try {
        const AllProject = await projects.find(query)
        res.status(201).json(AllProject)

    } catch (error) {
        res.status(401).json(`Failed du to ${error}`)

    }
}


// usersProject
exports.getUserProject = async (req, res) => {
    try {
        const userId = req.payload
        const usersProject = await projects.find({ userId })
        res.status(200).json(usersProject)
    } catch (error) {
        res.status(401).json(`Failed due to ${error}`)
    }
}

// delete user project
exports.deleteUserProject = async (req, res) => {
    try {
        const {id} = req.params
        const removeProject = await projects.findByIdAndDelete({ _id:id})
        res.status(200).json(removeProject)
    } catch (error) {
        res.status(401).json(`Error due to ${error}`)
    }
}


// edit user project
exports.editUserproject = async (req, res) => {
    const { projectId } = req.params
    const userId = req.payload

    const { title, language, github, website, overview, projectImage } = req.body
    console.log(title, language, github, website, overview, projectImage);

    const uploadProjectImage = req.file?req.file.filename:projectImage

    try {
        // 1st to identify the document
        // 2nd to update the document
        const updateproject = await projects.findByIdAndUpdate({ _id: projectId }, { title, language, github, website, overview, projectImage:uploadProjectImage, userId }, { new:true }) // new - to add value to mongodb
        
        // new value to the existing content
        await updateproject.save()  // to save the content in mongodb
        res.status(200).json(updateproject)
    } catch (error) {
        res.status(401).json(`Error due to ${error}`)
    }
}