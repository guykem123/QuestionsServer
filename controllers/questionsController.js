const db = require("../repository/questionsRepository");


const getAllQuestions = async (req, res) => {
    try {
        const questions = await db.getAllQuestions()
        return res.status(200).json({
            questions
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to get all Questions"
        });
    }
}

const addQuestion = async (req, res) => {
    try {
        const currentQa = await db.findQuestion(req.body.name)
        if (currentQa) {
            return res.status(409).json({
                message: "Question already exist"
            });
        }
        const qa = await db.addQuestion(req.body)
        return res.status(201).json({
            message: "Question Added",
            qa
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failure to create Question"
        });
    }
}

const getQuestion = async (req, res) => {
    try {
        const qa = await db.findQuestion(req.params.id)
        if (qa) {
            return res.status(200).json({
                qa
            });
        }
        return res.status(409).json({
            message: "Question is not exist"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failure to get Question"
        });
    }
}

const updateQuestion = async (req, res) => {
    try {
        let qa = await db.findQuestion(req.params.id)
        if (qa) {
            let qaWithUpdateName = await db.findQuestion(req.params.name)
            if(qaWithUpdateName){
                return res.status(409).json({
                    message: "Question new Name already exist"
                });
            }
            qa = await db.updateQuestion(req.params.id, req.body)
            return res.status(200).json({
                newQuestion: qa
            });
        }
        return res.status(409).json({
            message: "Question is not exist"
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failure to update Question"
        });
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const qa = await db.findQuestion(req.params.id)
        if (qa) {
            await db.deleteQuestion(req.params.id)
            return res.status(200).json({
                message: "Question has been deleted"
            });
        }
        return res.status(409).json({
            message: "Question is not exist"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failure to delete Question"
        });
    }
}

const restartQuestions = async (req, res) => {
    try {
        await db.restartQuestions()
        return res.status(200).json({
            message: "Question restarted"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failure to restart Questions"
        });
    }
}

module.exports = {
    getAllQuestions,
    addQuestion,
    getQuestion,
    deleteQuestion,
    updateQuestion,
    restartQuestions
};
