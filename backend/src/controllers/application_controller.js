import Application from "../models/application_model.js";

export const createApplication = async (req, res) => {
    try {
        const { company_name, position, status, applied_at, application_link } = req.body;
        
        const application = await Application.create({
            userId: req.user.id,
            company_name,
            position,
            status,
            applied_at,
            application_link,
            
        });
        
        res.status(201).json({ success: true, data: application });


    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getApplications = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        if (page < 1) page = 1;

        if (limit < 1) limit = 10;
        if (limit > 50) limit = 50;

        const skip = (page - 1) * limit;

        const filter = { userId: req.user.id };

        const totalItems = await Application.countDocuments(filter);

        const data = await Application.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(totalItems / limit);

        res.status(200).json({
            success: true,
            data,
            total: totalItems,
            page,
            limit,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        });
    } catch (error) {
        console.error("Error in getApplications:", error);
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};



export const updateApplication = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ success: false, message: "Application ID is required" });
        }

        const allowedFields = [
            "company_name",
            "position",
            "status",
            "applied_at",
            "application_link"
        ];

        const updateData = Object.fromEntries(
            allowedFields
                .filter(key => req.body[key] !== undefined)
                .map(key => [key, req.body[key]])
        );
        
        const application = await Application.findOneAndUpdate( 
            { _id: req.params.id, userId: req.user.id }, 
            { $set: updateData }, 
            { new: true, runValidators: true }
        );
        
        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }
        
        res.status(200).json({ success: true, data: application });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const deleteApplication = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ success: false, message: "Application ID is required" });
        }

        const application = await Application.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }

        res.status(200).json({ success: true, message: "Application deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

