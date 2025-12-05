function convertingResponse(controller) {//to convert from an array (the output of my controlers) to .json)
    return async (req, res, next) => {
        const return_value = await controller(req, res);
        if (!Array.isArray(return_value)) {
            return res.status(500).json({ message: "Invalid controller return format" });
        }
        const [status, data] = return_value;
        return res.status(status).json(data);
    };
}

module.exports = convertingResponse;



